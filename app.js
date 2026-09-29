const SEARCH_ENGINES = [
  { id: "baidu", name: "百度", mark: "B", color: "#7ba9ff", url: "https://www.baidu.com/s?wd={query}" },
  { id: "bing", name: "必应", mark: "b", color: "#73c7bd", url: "https://www.bing.com/search?q={query}" },
  { id: "google", name: "Google", mark: "G", color: "#f0ac74", url: "https://www.google.com/search?q={query}" },
  { id: "scholar", name: "Google 学术", mark: "学", color: "#9ba9ed", url: "https://scholar.google.com/scholar?q={query}" },
];

const DEFAULT_COLUMNS = [
  {
    id: "study",
    title: "学业学习",
    groupIds: ["teaching", "resources", "research"],
  },
  {
    id: "campus",
    title: "校园服务",
    groupIds: ["portal", "affairs", "life"],
  },
  {
    id: "daily",
    title: "工具与生活",
    groupIds: ["tools", "media", "community"],
  },
];

const DEFAULT_GROUPS = {
  teaching: { id: "teaching", title: "教学事务", links: [] },
  resources: { id: "resources", title: "学习资源", links: [] },
  research: { id: "research", title: "学术搜索", links: [] },
  portal: { id: "portal", title: "信息门户", links: [] },
  affairs: { id: "affairs", title: "校园办事", links: [] },
  life: { id: "life", title: "生活服务", links: [] },
  tools: { id: "tools", title: "实用工具", links: [] },
  media: { id: "media", title: "影音娱乐", links: [] },
  community: { id: "community", title: "社区资讯", links: [] },
};

const SYNC_PREFIX = "hzcu_group:";
const PREVIEW_KEY = "hzcu-newtab-preview";
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const engineToggle = document.querySelector("#engine-toggle");
const engineMenu = document.querySelector("#engine-menu");
const columnsGrid = document.querySelector("#columns-grid");
const settingsDialog = document.querySelector("#settings-dialog");
const settingsContent = document.querySelector("#settings-content");
const editorCount = document.querySelector("#editor-count");
const itemDialog = document.querySelector("#item-dialog");
const itemForm = document.querySelector("#item-form");
const toast = document.querySelector("#toast");

let state = {
  columns: structuredClone(DEFAULT_COLUMNS),
  groups: structuredClone(DEFAULT_GROUPS),
  theme: "moon",
  engine: "baidu",
};
let toastTimer;
let saveQueue = Promise.resolve();

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function actionButton(label, action, id, extraClass = "") {
  const button = element("button", `mini-action ${extraClass}`.trim(), label);
  button.type = "button";
  button.dataset.action = action;
  if (id) button.dataset.id = id;
  button.setAttribute("aria-label", actionLabel(action));
  button.title = actionLabel(action);
  return button;
}

function actionLabel(action) {
  return ({
    "move-group-up": "分类上移",
    "move-group-down": "分类下移",
    "move-link-up": "链接上移",
    "move-link-down": "链接下移",
    "edit-column": "重命名栏目",
    "edit-group": "编辑分类",
    "delete-group": "删除分类",
    "edit-link": "编辑链接",
    "delete-link": "删除链接",
  })[action] ?? action;
}

function safeId(prefix) {
  const value = globalThis.crypto?.randomUUID?.() ?? `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
  return `${prefix}-${value}`;
}

function sanitizeLink(link) {
  if (!link || typeof link.id !== "string" || typeof link.title !== "string" || typeof link.url !== "string") return null;
  try {
    const url = new URL(link.url);
    if ((url.protocol !== "https:" && url.protocol !== "http:") || !url.hostname) return null;
    return { id: link.id, title: link.title.slice(0, 48), url: url.href };
  } catch {
    return null;
  }
}

function getSyncApi() {
  return globalThis.chrome?.storage?.sync ?? null;
}

async function readSavedValues() {
  const sync = getSyncApi();
  if (sync) return sync.get(null);

  try {
    return JSON.parse(localStorage.getItem(PREVIEW_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function applySavedValues(saved) {
  if (Array.isArray(saved.columns) && saved.columns.length === 3) {
    const validColumns = saved.columns.filter((column) => column && typeof column.id === "string");
    if (validColumns.length === 3) {
      state.columns = validColumns.map((column) => ({
        id: column.id,
        title: typeof column.title === "string" ? column.title : "常用入口",
        groupIds: Array.isArray(column.groupIds) ? column.groupIds.filter((id) => typeof id === "string") : [],
      }));

      const loadedGroups = {};
      for (const column of state.columns) {
        for (const groupId of column.groupIds) {
          const savedGroup = saved[`${SYNC_PREFIX}${groupId}`] ?? saved.groups?.[groupId] ?? DEFAULT_GROUPS[groupId];
          if (!savedGroup || typeof savedGroup !== "object") continue;
          loadedGroups[groupId] = {
            id: groupId,
            title: typeof savedGroup.title === "string" ? savedGroup.title : "常用链接",
            links: Array.isArray(savedGroup.links) ? savedGroup.links.map(sanitizeLink).filter(Boolean) : [],
          };
        }
      }
      state.groups = loadedGroups;
    }
  } else if (saved.columns && saved.groups) {
    // Accept the compact preview format used when opening newtab.html directly.
    state.columns = saved.columns.filter((column) => column && typeof column.id === "string").map((column) => ({
      id: column.id,
      title: typeof column.title === "string" ? column.title : "常用入口",
      groupIds: Array.isArray(column.groupIds) ? column.groupIds.filter((id) => typeof id === "string") : [],
    }));
    state.groups = Object.fromEntries(Object.entries(saved.groups).flatMap(([id, group]) => {
      if (!group || typeof group !== "object") return [];
      return [[id, {
        id,
        title: typeof group.title === "string" ? group.title : "常用链接",
        links: Array.isArray(group.links) ? group.links.map(sanitizeLink).filter(Boolean) : [],
      }]];
    }));
  }

  if (saved.theme === "sun" || saved.theme === "moon") state.theme = saved.theme;
  if (SEARCH_ENGINES.some((engine) => engine.id === saved.engine)) state.engine = saved.engine;
}

function serializeState() {
  const values = {
    theme: state.theme,
    engine: state.engine,
    columns: state.columns.map(({ id, title, groupIds }) => ({ id, title, groupIds: [...groupIds] })),
  };
  for (const [id, group] of Object.entries(state.groups)) values[`${SYNC_PREFIX}${id}`] = group;
  return values;
}

function persistState() {
  saveQueue = saveQueue.catch(() => undefined).then(async () => {
    const sync = getSyncApi();
    const values = serializeState();

    if (!sync) {
      localStorage.setItem(PREVIEW_KEY, JSON.stringify({
        ...values,
        groups: state.groups,
      }));
      return;
    }

    const current = await sync.get(null);
    const staleKeys = Object.keys(current).filter((key) => key.startsWith(SYNC_PREFIX) && !(key in values));
    await sync.set(values);
    if (staleKeys.length) await sync.remove(staleKeys);
  });
  return saveQueue;
}

function showToast(message, isError = false) {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.toggle("is-error", isError);
  toast.classList.add("is-visible");
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2900);
}

function saveAndRender(message = "已保存") {
  renderHome();
  if (settingsDialog.open) renderEditor();
  persistState().then(
    () => showToast(message),
    () => showToast("同步存储空间不足或暂不可用；本次更改未能保存。", true),
  );
}

function applyTheme() {
  document.documentElement.dataset.theme = state.theme;
  const themeColor = document.querySelector('meta[name="theme-color"]');
  themeColor.content = state.theme === "sun" ? "#f3f5f2" : "#15191b";
  const nextTheme = state.theme === "moon" ? "SUN" : "MOON";
  const toggle = document.querySelector("#theme-toggle");
  toggle.setAttribute("aria-label", `切换到 ${nextTheme} 模式`);
  toggle.title = `切换到 ${nextTheme} 模式`;
}

function currentEngine() {
  return SEARCH_ENGINES.find((engine) => engine.id === state.engine) ?? SEARCH_ENGINES[0];
}

function applyEngine() {
  const engine = currentEngine();
  document.querySelector("#engine-name").textContent = engine.name;
  const mark = document.querySelector("#engine-mark");
  mark.textContent = engine.mark;
  mark.style.setProperty("--provider-color", engine.color);
  for (const option of engineMenu.querySelectorAll("[role='option']")) {
    option.setAttribute("aria-selected", String(option.dataset.engine === engine.id));
  }
}

function renderEngineMenu() {
  engineMenu.replaceChildren();
  engineMenu.append(element("p", "engine-menu-title", "选择搜索引擎"));
  const options = element("div", "engine-options");
  options.setAttribute("role", "presentation");

  for (const engine of SEARCH_ENGINES) {
    const button = element("button", "engine-option");
    button.type = "button";
    button.setAttribute("role", "option");
    button.dataset.engine = engine.id;
    button.setAttribute("aria-selected", String(engine.id === state.engine));
    const mark = element("span", "engine-option-mark", engine.mark);
    mark.setAttribute("aria-hidden", "true");
    mark.style.setProperty("--provider-color", engine.color);
    button.append(mark, element("span", "engine-option-name", engine.name));
    options.append(button);
  }
  engineMenu.append(options);
  applyEngine();
}

function tileMonogram(title) {
  const first = [...title.trim()][0] ?? "链";
  return /[\u3400-\u9fff]/.test(first) ? first : first.toUpperCase();
}

function makeTile(link) {
  const anchor = element("a", "shortcut-tile");
  anchor.href = link.url;
  anchor.target = "_blank";
  anchor.rel = "noopener noreferrer";
  anchor.title = `${link.title} · ${link.url}`;
  const mark = element("span", "tile-mark", tileMonogram(link.title));
  mark.setAttribute("aria-hidden", "true");
  anchor.append(mark, element("span", "tile-label", link.title));
  return anchor;
}

function makeAddTile(groupId) {
  const button = element("button", "placeholder-tile");
  button.type = "button";
  button.dataset.addLinkGroup = groupId;
  button.setAttribute("aria-label", "添加常用入口");
  button.append(element("span", "placeholder-plus", "+"), element("span", "tile-label", "添加入口"));
  return button;
}

function renderHome() {
  columnsGrid.replaceChildren();
  for (const [columnIndex, column] of state.columns.entries()) {
    const columnNode = element("section", "home-column");
    columnNode.setAttribute("aria-label", column.title);
    const heading = element("div", "column-heading");
    heading.append(
      element("span", "column-number", String(columnIndex + 1).padStart(2, "0")),
      element("h2", "column-title", column.title),
      element("span", "column-rule"),
    );
    columnNode.append(heading);

    const groupList = element("div", "group-list");
    for (const groupId of column.groupIds) {
      const group = state.groups[groupId];
      if (!group) continue;
      const groupNode = element("section", "link-group");
      groupNode.setAttribute("aria-label", group.title);
      const groupHeading = element("div", "group-heading");
      groupHeading.append(
        element("h3", "", group.title),
        element("span", "group-count", String(group.links.length)),
      );
      const tileGrid = element("div", "tile-grid");
      for (const link of group.links) tileGrid.append(makeTile(link));
      tileGrid.append(makeAddTile(group.id));
      groupNode.append(groupHeading, tileGrid);
      groupList.append(groupNode);
    }
    columnNode.append(groupList);
    columnsGrid.append(columnNode);
  }
}

function renderEditor() {
  settingsContent.replaceChildren();
  let groupCount = 0;
  let linkCount = 0;

  for (const [columnIndex, column] of state.columns.entries()) {
    const columnCard = element("section", "editor-column");
    const heading = element("div", "editor-column-heading");
    heading.append(element("h3", "", `${String(columnIndex + 1).padStart(2, "0")} · ${column.title}`));
    const renameColumn = element("button", "small-button", "改名");
    renameColumn.type = "button";
    renameColumn.dataset.action = "edit-column";
    renameColumn.dataset.id = column.id;
    heading.append(renameColumn);
    columnCard.append(heading);

    const groups = element("div", "editor-groups");
    if (!column.groupIds.length) groups.append(element("p", "editor-empty", "还没有分类"));
    for (const [groupIndex, groupId] of column.groupIds.entries()) {
      const group = state.groups[groupId];
      if (!group) continue;
      groupCount += 1;
      linkCount += group.links.length;
      const groupCard = element("section", "editor-group");
      const groupHeading = element("div", "editor-group-heading");
      groupHeading.append(element("h4", "editor-group-title", group.title));
      const groupActions = element("div", "editor-actions");
      const moveUp = actionButton("↑", "move-group-up", group.id);
      moveUp.disabled = groupIndex === 0;
      const moveDown = actionButton("↓", "move-group-down", group.id);
      moveDown.disabled = groupIndex === column.groupIds.length - 1;
      groupActions.append(moveUp, moveDown, actionButton("✎", "edit-group", group.id), actionButton("×", "delete-group", group.id, "is-danger"));
      groupHeading.append(groupActions);

      const links = element("div", "editor-links");
      if (!group.links.length) links.append(element("p", "editor-empty", "暂无链接"));
      for (const [linkIndex, link] of group.links.entries()) {
        const row = element("div", "editor-link");
        const copy = element("div", "editor-link-copy");
        copy.append(element("span", "editor-link-title", link.title), element("span", "editor-link-url", link.url));
        const linkActions = element("div", "editor-actions");
        const linkUp = actionButton("↑", "move-link-up", link.id);
        linkUp.disabled = linkIndex === 0;
        const linkDown = actionButton("↓", "move-link-down", link.id);
        linkDown.disabled = linkIndex === group.links.length - 1;
        linkActions.append(linkUp, linkDown, actionButton("✎", "edit-link", link.id), actionButton("×", "delete-link", link.id, "is-danger"));
        row.append(copy, linkActions);
        links.append(row);
      }

      const groupTools = element("div", "editor-group-tools");
      const addLink = element("button", "editor-add-link", "+ 添加链接");
      addLink.type = "button";
      addLink.dataset.action = "add-link";
      addLink.dataset.id = group.id;
      groupTools.append(addLink);
      groupCard.append(groupHeading, links, groupTools);
      groups.append(groupCard);
    }
    columnCard.append(groups);
    settingsContent.append(columnCard);
  }
  editorCount.textContent = `${groupCount} 个分类 · ${linkCount} 个链接`;
}

function openSettings() {
  renderEditor();
  settingsDialog.showModal();
}

function populateColumnSelect(selectedId) {
  const select = document.querySelector("#item-column");
  select.replaceChildren();
  for (const column of state.columns) {
    const option = element("option", "", column.title);
    option.value = column.id;
    select.append(option);
  }
  if (selectedId && state.columns.some((column) => column.id === selectedId)) select.value = selectedId;
}

function populateGroupSelect(columnId, selectedId) {
  const select = document.querySelector("#item-group");
  select.replaceChildren();
  const column = state.columns.find((item) => item.id === columnId) ?? state.columns[0];
  for (const groupId of column?.groupIds ?? []) {
    const group = state.groups[groupId];
    if (!group) continue;
    const option = element("option", "", group.title);
    option.value = group.id;
    select.append(option);
  }
  if (selectedId && [...select.options].some((option) => option.value === selectedId)) select.value = selectedId;
}

function openItemEditor({ type, id = null, groupId = null } = {}) {
  const formError = document.querySelector("#form-error");
  formError.textContent = "";
  const titleInput = itemForm.elements.namedItem("title");
  const urlInput = itemForm.elements.namedItem("url");
  const titleField = document.querySelector("#item-title-field");
  const urlField = document.querySelector("#item-url-field");
  const columnField = document.querySelector("#item-column-field");
  const groupField = document.querySelector("#item-group-field");
  const dialogTitle = document.querySelector("#item-dialog-title");
  const columnSelect = document.querySelector("#item-column");
  const groupSelect = document.querySelector("#item-group");
  const linkEntry = type === "link" ? findLink(id) : null;
  const groupEntry = type === "group" ? findGroup(id) : null;
  const columnEntry = type === "column" ? state.columns.find((column) => column.id === id) : null;

  itemForm.dataset.type = type;
  itemForm.dataset.id = id ?? "";
  itemForm.dataset.sourceGroupId = linkEntry?.group.id ?? "";
  itemForm.reset();
  titleField.hidden = false;
  urlField.hidden = type !== "link";
  columnField.hidden = type === "column";
  groupField.hidden = type !== "link";
  dialogTitle.textContent = ({ link: id ? "编辑链接" : "添加链接", group: id ? "编辑分类" : "新建分类", column: "重命名栏目" })[type];
  titleInput.value = linkEntry?.link.title ?? groupEntry?.group.title ?? columnEntry?.title ?? "";
  urlInput.value = linkEntry?.link.url ?? "";

  const groupColumnId = groupId ? findGroup(groupId)?.column.id : null;
  const selectedColumnId = linkEntry?.column.id ?? groupEntry?.column.id ?? groupColumnId ?? state.columns[0].id;
  populateColumnSelect(selectedColumnId);
  populateGroupSelect(selectedColumnId, linkEntry?.group.id ?? groupId);
  if (type === "link" && !groupSelect.options.length) {
    formError.textContent = "请先新建一个分类，再添加链接。";
    const addGroupFallback = document.createElement("button");
    addGroupFallback.type = "button";
    addGroupFallback.className = "secondary-button";
    addGroupFallback.textContent = "去创建分类";
    addGroupFallback.addEventListener("click", () => {
      itemDialog.close();
      openItemEditor({ type: "group" });
    }, { once: true });
    formError.append(" ", addGroupFallback);
  }
  itemDialog.showModal();
  titleInput.focus();
}

function findGroup(groupId) {
  for (const column of state.columns) {
    if (column.groupIds.includes(groupId)) return { column, group: state.groups[groupId] };
  }
  return null;
}

function findLink(linkId) {
  for (const column of state.columns) {
    for (const groupId of column.groupIds) {
      const group = state.groups[groupId];
      const link = group?.links.find((item) => item.id === linkId);
      if (link) return { column, group, link };
    }
  }
  return null;
}

function normalizeWebUrl(value) {
  const trimmed = value.trim();
  const candidate = /^[a-z][a-z\d+.-]*:/i.test(trimmed) ? trimmed : `https://${trimmed}`;
  const url = new URL(candidate);
  if (url.protocol !== "https:" && url.protocol !== "http:") throw new Error("链接网址必须以 http:// 或 https:// 开头。");
  if (!url.hostname) throw new Error("请输入有效的网址。");
  return url.href;
}

async function handleItemSubmit(event) {
  event.preventDefault();
  const type = itemForm.dataset.type;
  const id = itemForm.dataset.id || null;
  const title = String(itemForm.elements.namedItem("title").value).trim();
  const error = document.querySelector("#form-error");
  error.textContent = "";
  if (!title) {
    error.textContent = "请填写名称。";
    itemForm.elements.namedItem("title").focus();
    return;
  }

  if (type === "column") {
    const column = state.columns.find((item) => item.id === id);
    if (!column) return;
    column.title = title;
    itemDialog.close();
    saveAndRender("栏目名称已保存");
    return;
  }

  const selectedColumn = state.columns.find((column) => column.id === document.querySelector("#item-column").value);
  if (!selectedColumn) {
    error.textContent = "请选择所属栏目。";
    return;
  }

  if (type === "group") {
    const group = id ? state.groups[id] : null;
    if (group) {
      const oldColumn = findGroup(id)?.column;
      if (oldColumn && oldColumn.id !== selectedColumn.id) {
        oldColumn.groupIds = oldColumn.groupIds.filter((groupId) => groupId !== id);
        selectedColumn.groupIds.push(id);
      }
      group.title = title;
    } else {
      const newId = safeId("group");
      state.groups[newId] = { id: newId, title, links: [] };
      selectedColumn.groupIds.push(newId);
    }
    itemDialog.close();
    saveAndRender("分类已保存");
    return;
  }

  let url;
  try {
    url = normalizeWebUrl(String(itemForm.elements.namedItem("url").value));
  } catch (urlError) {
    error.textContent = urlError.message || "请输入有效的网址。";
    itemForm.elements.namedItem("url").focus();
    return;
  }

  const targetGroupId = document.querySelector("#item-group").value;
  const targetGroup = state.groups[targetGroupId];
  if (!targetGroup || !selectedColumn.groupIds.includes(targetGroupId)) {
    error.textContent = "请选择有效的链接分类。";
    return;
  }
  const existing = findLink(id);
  const link = { id: existing?.link.id ?? safeId("link"), title, url };
  if (existing && existing.group.id !== targetGroupId) {
    existing.group.links = existing.group.links.filter((item) => item.id !== existing.link.id);
    targetGroup.links.push(link);
  } else if (existing) {
    targetGroup.links = targetGroup.links.map((item) => item.id === existing.link.id ? link : item);
  } else {
    targetGroup.links.push(link);
  }
  itemDialog.close();
  saveAndRender(existing ? "链接已更新" : "链接已添加");
}

function moveItem(items, id, direction) {
  const index = items.findIndex((item) => item.id === id);
  const target = index + direction;
  if (index < 0 || target < 0 || target >= items.length) return false;
  [items[index], items[target]] = [items[target], items[index]];
  return true;
}

function handleEditorAction(action, id) {
  switch (action) {
    case "edit-column": openItemEditor({ type: "column", id }); return;
    case "add-link": openItemEditor({ type: "link", groupId: id }); return;
    case "add-group": openItemEditor({ type: "group" }); return;
    case "edit-group": openItemEditor({ type: "group", id }); return;
    case "edit-link": openItemEditor({ type: "link", id }); return;
    case "delete-group": {
      const entry = findGroup(id);
      if (!entry) return;
      const message = entry.group.links.length
        ? `删除“${entry.group.title}”及其中 ${entry.group.links.length} 个链接？`
        : `删除分类“${entry.group.title}”？`;
      if (!window.confirm(message)) return;
      entry.column.groupIds = entry.column.groupIds.filter((groupId) => groupId !== id);
      delete state.groups[id];
      saveAndRender("分类已删除");
      return;
    }
    case "delete-link": {
      const entry = findLink(id);
      if (!entry || !window.confirm(`删除链接“${entry.link.title}”？`)) return;
      entry.group.links = entry.group.links.filter((link) => link.id !== id);
      saveAndRender("链接已删除");
      return;
    }
    case "move-group-up":
    case "move-group-down": {
      const entry = findGroup(id);
      if (!entry) return;
      const delta = action.endsWith("up") ? -1 : 1;
      if (moveItem(entry.column.groupIds, id, delta)) saveAndRender("分类顺序已更新");
      return;
    }
    case "move-link-up":
    case "move-link-down": {
      const entry = findLink(id);
      if (!entry) return;
      const delta = action.endsWith("up") ? -1 : 1;
      if (moveItem(entry.group.links, id, delta)) saveAndRender("链接顺序已更新");
      return;
    }
  }
}

function setEngineMenu(open) {
  engineMenu.hidden = !open;
  engineToggle.setAttribute("aria-expanded", String(open));
}

document.querySelector("#theme-toggle").addEventListener("click", () => {
  state.theme = state.theme === "moon" ? "sun" : "moon";
  applyTheme();
  persistState().then(
    () => showToast(`${state.theme === "sun" ? "SUN" : "MOON"} 模式已保存`),
    () => showToast("模式已切换，但同步保存失败。", true),
  );
});

document.querySelector("#settings-toggle").addEventListener("click", openSettings);
document.querySelector("#add-first-link").addEventListener("click", () => openItemEditor({ type: "link", groupId: state.columns[0]?.groupIds[0] }));
document.querySelector("#add-group").addEventListener("click", () => openItemEditor({ type: "group" }));
columnsGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-add-link-group]");
  if (button) openItemEditor({ type: "link", groupId: button.dataset.addLinkGroup });
});

engineToggle.addEventListener("click", () => setEngineMenu(engineMenu.hidden));
engineMenu.addEventListener("click", (event) => {
  const option = event.target.closest("[data-engine]");
  if (!option) return;
  state.engine = option.dataset.engine;
  applyEngine();
  setEngineMenu(false);
  persistState().then(
    () => showToast(`已切换到${currentEngine().name}`),
    () => showToast("搜索引擎已切换，但同步保存失败。", true),
  );
  searchInput.focus();
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".engine-picker")) setEngineMenu(false);
  const closeButton = event.target.closest("[data-close-dialog]");
  if (closeButton) document.getElementById(closeButton.dataset.closeDialog)?.close();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setEngineMenu(false);
});

document.querySelector("#item-column").addEventListener("change", (event) => populateGroupSelect(event.target.value));
itemForm.addEventListener("submit", handleItemSubmit);
settingsContent.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");
  if (button) handleEditorAction(button.dataset.action, button.dataset.id);
});

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = searchInput.value.trim();
  if (!query) {
    searchInput.focus();
    return;
  }
  if (/^https?:\/\//i.test(query)) {
    try {
      const url = new URL(query);
      if (url.protocol === "http:" || url.protocol === "https:") window.location.assign(url.href);
      return;
    } catch {
      // A malformed URL is treated as a regular search query.
    }
  }
  window.location.assign(currentEngine().url.replace("{query}", encodeURIComponent(query)));
});

if (globalThis.chrome?.storage?.onChanged) {
  globalThis.chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName !== "sync") return;
    readSavedValues().then((saved) => {
      applySavedValues(saved);
      applyTheme();
      renderEngineMenu();
      renderHome();
      if (settingsDialog.open) renderEditor();
    }).catch(() => undefined);
  });
}

async function initialize() {
  try {
    const saved = await readSavedValues();
    applySavedValues(saved);
  } catch {
    showToast("无法读取同步设置，已使用默认布局。", true);
  }
  applyTheme();
  renderEngineMenu();
  renderHome();
}

initialize();
