const SEARCH_ENGINES = [
  { id: "baidu", name: "百度", icon: "icons/search/baidu.svg", url: "https://www.baidu.com/s?wd={query}" },
  { id: "google", name: "Google", icon: "icons/search/google.png", url: "https://www.google.com/search?q={query}" },
  { id: "bing", name: "必应", icon: "icons/search/bing.ico", url: "https://www.bing.com/search?q={query}" },
  { id: "hzcu-office", name: "城院检索", icon: "assets/hzcu-seal.png", url: "http://ccpo-hzcu-edu-cn.webvpn1.hzcu.edu.cn:8118/module/sitesearch/index.jsp?columnid=75,68,3582,3583,4661,3542,3581,4684,101,67,87,88,89,69,93,94,4689,74,77,681,682,683,684,685,686,687,688,689,690,691,692,693,694,1741&webid=1&modalunitid=14981&keyword=vc_title&keyvalue={query}" },
  { id: "youdao", name: "有道", icon: "icons/search/youdao.ico", url: "https://dict.youdao.com/w/eng/{query}" },
  { id: "bilibili", name: "B站", icon: "icons/search/bilibili.svg", url: "https://search.bilibili.com/all?keyword={query}" },
  { id: "csdn", name: "CSDN", icon: "icons/search/csdn.svg", url: "https://so.csdn.net/so/search/s.do?q={query}" },
  { id: "github", name: "Github", icon: "icons/search/github.svg", url: "https://github.com/search?q={query}" },
  { id: "scholar", name: "Google 学术", icon: "icons/search/scholar.svg", url: "https://scholar.google.com/scholar?q={query}" },
  { id: "scholar-two", name: "学术检索", icon: "icons/search/scholar.svg", url: "https://sc.panda985.com/scholar?hl=zh-cn&q={query}" },
];
const COLLEGES = [
  { id: "computer-science", name: "计算机与计算科学学院", url: "http://jsxy-hzcu-edu-cn.webvpn1.hzcu.edu.cn:8118/" },
  { id: "electrical-engineering", name: "信息与电气工程学院", url: "http://iee-hzcu-edu-cn.webvpn1.hzcu.edu.cn:8118/" },
  { id: "engineering", name: "工程学院", url: "http://gc-hzcu-edu-cn.webvpn1.hzcu.edu.cn:8118/" },
  { id: "urban-planning", name: "国土空间规划学院", url: "http://gtkj-hzcu-edu-cn.webvpn1.hzcu.edu.cn:8118/" },
  { id: "medicine", name: "医学院", url: "http://yxy-hzcu-edu-cn.webvpn1.hzcu.edu.cn:8118/" },
  { id: "foreign-languages", name: "外国语学院", url: "http://sfl-hzcu-edu-cn.webvpn1.hzcu.edu.cn:8118/" },
  { id: "business", name: "商学院", url: "http://sxy-hzcu-edu-cn.webvpn1.hzcu.edu.cn:8118/" },
  { id: "culture-tourism", name: "国际文化旅游学院", url: "http://isct-hzcu-edu-cn.webvpn1.hzcu.edu.cn:8118/" },
  { id: "media", name: "新闻与传播学院", url: "http://media-hzcu-edu-cn.webvpn1.hzcu.edu.cn:8118/" },
  { id: "humanities", name: "人文学院", url: "http://rw-hzcu-edu-cn.webvpn1.hzcu.edu.cn:8118/" },
  { id: "law", name: "法学院", url: "http://law-hzcu-edu-cn.webvpn1.hzcu.edu.cn:8118/" },
  { id: "art-archaeology", name: "艺术与考古学院", url: "http://adc-hzcu-edu-cn.webvpn1.hzcu.edu.cn:8118/" },
  { id: "joint-institute", name: "浙大城市学院怀卡托大学联合学院", url: "http://nzuwi-hzcu-edu-cn.webvpn1.hzcu.edu.cn:8118/" },
];

const DEFAULTS_VERSION = 14;
const DEFAULT_TEACHING_LINKS = [
  { id: "study-at-hzcu", title: "学在城院", url: "https://course.hzcu.edu.cn/hzcu", useWebVPN: false },
  { id: "teaching-platform", title: "教学平台", url: "https://courses.hzcu.edu.cn/user/index#/", useWebVPN: false, bypassWebVPN: false },
  { id: "zhiyun-classroom", title: "智云课堂", url: "https://classroom.hzcu.edu.cn/", useWebVPN: false },
  { id: "undergraduate-jw", title: "教务（本科）", url: "http://ijw.hzcu.edu.cn/sso/ddlogin", useWebVPN: false },
  { id: "graduate-jw", title: "教务（研究生）", url: "http://yjsxt.hzcu.edu.cn/yjsxt/dklogin", useWebVPN: false },
  { id: "teacher-info", title: "教师信息查询", url: "http://person.zucc.edu.cn/", useWebVPN: true },
  { id: "innovation-management", title: "国创通知", url: "http://hzcujwb-hzcu-edu-cn.webvpn1.hzcu.edu.cn:8118/index.php?c=main&a=tlist&id=57", useWebVPN: false },
  { id: "competition-notices", title: "竞赛通知", url: "http://hzcujwb-hzcu-edu-cn.webvpn1.hzcu.edu.cn:8118/index.php?c=main&a=tlist&id=70", useWebVPN: false },
  { id: "graduation-design", title: "毕业论文/设计", url: "https://sjjx.hzcu.edu.cn/bylw/", useWebVPN: false },
];
const DEFAULT_INFORMATION_LINKS = [
  { id: "management-workbench", title: "管理工作台", url: "http://cjgl-hzcu-edu-cn-s.webvpn1.hzcu.edu.cn:8118/dashboard", useWebVPN: false },
  { id: "hzcu-mail", title: "城院邮箱", url: "http://mail-hzcu-edu-cn-s.webvpn1.hzcu.edu.cn:8118/", useWebVPN: false },
  { id: "hzcu-directory", title: "城院黄页", url: "http://ccpo-hzcu-edu-cn-s.webvpn1.hzcu.edu.cn:8118/col/col5969/index.html", useWebVPN: false },
  { id: "hzcu-calendar", title: "城院校历", url: "http://ccpo-hzcu-edu-cn.webvpn1.hzcu.edu.cn:8118/col/col10382/index.html", useWebVPN: false },
  // Omit the one-time ticket query parameter so an authentication token is not stored in the default data.
  { id: "finance-system", title: "财务系统", url: "http://cwcx-hzcu-edu-cn.webvpn1.hzcu.edu.cn:8118/WFManager/home2.jsp", useWebVPN: false },
  { id: "student-affairs", title: "学工部", url: "http://xgb-hzcu-edu-cn.webvpn1.hzcu.edu.cn:8118/", useWebVPN: false },
  { id: "graduate-office", title: "研究生处", url: "http://xkc-hzcu-edu-cn.webvpn1.hzcu.edu.cn:8118/", useWebVPN: false },
  { id: "licensed-software", title: "正版软件", url: "http://software-hzcu-edu-cn.webvpn1.hzcu.edu.cn:8118/", useWebVPN: false },
  { id: "zju-mirrors", title: "浙大开源镜像", url: "https://mirrors.zju.edu.cn/", useWebVPN: true },
];
const DEFAULT_ACADEMIC_LINKS = [
  { id: "hzcu-library", title: "图书馆", url: "http://lib.hzcu.edu.cn/", useWebVPN: false },
  { id: "cnki", title: "中国知网", url: "https://www.cnki.net/", useWebVPN: true },
  { id: "google-scholar-site", title: "谷歌学术", url: "https://scholar.google.com/", useWebVPN: false },
  { id: "vip-academic", title: "维普网", url: "https://www.cqvip.com/", useWebVPN: false },
  { id: "ixueshu", title: "爱学术", url: "https://www.ixueshu.com/", useWebVPN: false },
  { id: "wanfang", title: "万方数据", url: "https://www.wanfangdata.com.cn/", useWebVPN: false },
  { id: "github", title: "Github", url: "https://github.com/", useWebVPN: false },
  { id: "web-of-science", title: "WOS", url: "https://www.webofscience.com/wos/alldb/basic-search", useWebVPN: true },
  { id: "sci-hub", title: "Sci-Hub", url: "https://sci-hub.sg/", useWebVPN: false },
];

const DEFAULT_COLUMNS = [
  { id: "study", title: "城院·教学", links: DEFAULT_TEACHING_LINKS },
  { id: "campus", title: "城院·信息化", links: DEFAULT_INFORMATION_LINKS },
  { id: "daily", title: "科研学术", links: DEFAULT_ACADEMIC_LINKS },
];
const MIN_COLUMNS = 1;
const MAX_COLUMNS = 3;
const UI_SCALE_OPTIONS = [80, 90, 100, 110, 120, 130, 140, 150];
const DEFAULT_UI_SCALE = 100;

const PREVIEW_KEY = "hzcu-newtab-preview";
const PREVIEW_SCALE_KEY = "hzcu-newtab-ui-scale";
const UI_SCALE_STORAGE_KEY = "uiScale";
const LEGACY_GROUP_PREFIX = "hzcu_group:";
const WEBVPN_HOST = "webvpn1.hzcu.edu.cn";
const WEBVPN_PORT = "8118";
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const searchSubmit = document.querySelector(".search-submit");
const engineToggle = document.querySelector("#engine-toggle");
const engineMenu = document.querySelector("#engine-menu");
const columnsGrid = document.querySelector("#columns-grid");
const collegeEntry = document.querySelector("#college-entry");
const collegeMenu = document.querySelector("#college-menu");
const settingsDialog = document.querySelector("#settings-dialog");
const settingsContent = document.querySelector("#settings-content");
const itemDialog = document.querySelector("#item-dialog");
const itemForm = document.querySelector("#item-form");
const toast = document.querySelector("#toast");
const systemThemeMedia = window.matchMedia?.("(prefers-color-scheme: dark)") ?? null;

let state = {
  columns: structuredClone(DEFAULT_COLUMNS),
  theme: "moon",
  engine: "baidu",
  collegeId: "",
  uiScale: DEFAULT_UI_SCALE,
};
let toastTimer;
let saveQueue = Promise.resolve();

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function setCustomSelectOptions(root, options, value) {
  const input = root.querySelector("input[type='hidden']");
  const trigger = root.querySelector(".custom-select-trigger");
  const valueLabel = root.querySelector(".custom-select-value");
  const menu = root.querySelector(".custom-select-menu");
  menu.replaceChildren();

  for (const entry of options) {
    const option = element("button", "custom-select-option", entry.label);
    option.type = "button";
    option.dataset.customSelectOption = "";
    option.dataset.value = entry.value;
    option.setAttribute("role", "option");
    option.tabIndex = -1;
    menu.append(option);
  }

  const selected = options.find((entry) => entry.value === value) ?? options[0];
  if (!selected) return;
  input.value = selected.value;
  input.defaultValue = selected.value;
  valueLabel.textContent = selected.label;
  for (const option of menu.querySelectorAll("[data-custom-select-option]")) {
    option.setAttribute("aria-selected", String(option.dataset.value === selected.value));
  }
  trigger.setAttribute("aria-label", `${root.dataset.customSelectLabel ?? "选择"}：${selected.label}`);
}

function createCustomSelect({ id, className = "", label, options, value }) {
  const root = element("div", `custom-select ${className}`.trim());
  root.dataset.customSelect = id;
  root.dataset.customSelectLabel = label;

  const input = element("input");
  input.type = "hidden";
  input.id = id;
  const trigger = element("button", "custom-select-trigger");
  trigger.id = `${id}-trigger`;
  trigger.type = "button";
  trigger.dataset.customSelectTrigger = "";
  trigger.setAttribute("aria-haspopup", "listbox");
  trigger.setAttribute("aria-controls", `${id}-menu`);
  trigger.setAttribute("aria-expanded", "false");
  const valueLabel = element("span", "custom-select-value");
  const chevron = element("span", "custom-select-chevron");
  chevron.setAttribute("aria-hidden", "true");
  trigger.append(valueLabel, chevron);

  const menu = element("div", "custom-select-menu");
  menu.id = `${id}-menu`;
  menu.setAttribute("role", "listbox");
  menu.setAttribute("aria-label", label);
  menu.setAttribute("aria-hidden", "true");
  menu.setAttribute("popover", "manual");
  root.append(input, trigger, menu);
  setCustomSelectOptions(root, options, value);
  return root;
}

function positionCustomSelect(root) {
  const trigger = root.querySelector(".custom-select-trigger");
  const menu = root.querySelector(".custom-select-menu");
  const rect = trigger.getBoundingClientRect();
  const zoom = state.uiScale / 100;
  const width = Math.min(Math.max(rect.width / zoom, Math.min(260, (window.innerWidth - 24) / zoom)), (window.innerWidth - 24) / zoom);
  menu.style.width = `${width}px`;
  const menuHeight = menu.getBoundingClientRect().height;
  const left = Math.min(Math.max(rect.left, 12), window.innerWidth - width * zoom - 12);
  const below = rect.bottom + 8 + menuHeight <= window.innerHeight - 12;
  const top = below
    ? rect.bottom + 8
    : Math.max(12, Math.min(rect.top - menuHeight - 8, window.innerHeight - menuHeight - 12));
  menu.style.left = `${left / zoom}px`;
  menu.style.top = `${top / zoom}px`;
}

function setCustomSelectOpen(root, open) {
  const trigger = root.querySelector(".custom-select-trigger");
  const menu = root.querySelector(".custom-select-menu");
  if (open && !menu.matches(":popover-open")) menu.showPopover();
  if (!open && menu.matches(":popover-open")) menu.hidePopover();
  trigger.setAttribute("aria-expanded", String(open));
  menu.setAttribute("aria-hidden", String(!open));
  if (open) positionCustomSelect(root);
}

function closeCustomSelects(except = null) {
  for (const root of document.querySelectorAll(".custom-select")) {
    if (root !== except) setCustomSelectOpen(root, false);
  }
}

function chooseCustomSelectOption(root, option) {
  const id = root.dataset.customSelect;
  const value = option.dataset.value;
  const options = [...root.querySelectorAll("[data-custom-select-option]")].map((item) => ({
    value: item.dataset.value,
    label: item.textContent,
  }));
  setCustomSelectOptions(root, options, value);
  setCustomSelectOpen(root, false);

  if (id === "featured-college") {
    state.collegeId = COLLEGES.some((college) => college.id === value) ? value : "";
    saveAndRender("关注学院已保存");
  } else if (id === "page-scale") {
    const scale = Number(value);
    if (UI_SCALE_OPTIONS.includes(scale)) {
      state.uiScale = scale;
      applyUiScale();
      window.scrollTo(0, 0);
      persistUiScale().then(
        () => showToast("页面显示比例已保存"),
        () => showToast("页面比例已更改，但本地保存失败。", true),
      );
    }
    root.querySelector(".custom-select-trigger").focus();
  } else {
    root.querySelector(".custom-select-trigger").focus();
  }
}

function focusCustomSelectOption(root, destination) {
  const options = [...root.querySelectorAll("[data-custom-select-option]")];
  if (!options.length) return;
  const selectedIndex = Math.max(0, options.findIndex((option) => option.getAttribute("aria-selected") === "true"));
  const activeIndex = options.indexOf(document.activeElement);
  let nextIndex = selectedIndex;
  if (destination === "first") nextIndex = 0;
  else if (destination === "last") nextIndex = options.length - 1;
  else if (destination === "next") nextIndex = (activeIndex < 0 ? selectedIndex : activeIndex + 1) % options.length;
  else if (destination === "previous") nextIndex = (activeIndex < 0 ? selectedIndex : activeIndex - 1 + options.length) % options.length;
  options[nextIndex].focus();
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
    "move-link-up": "链接上移",
    "move-link-down": "链接下移",
    "edit-column": "重命名分类",
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
    if ((url.protocol !== "https:" && url.protocol !== "http:") || !url.hostname || url.username || url.password) return null;
    return {
      id: link.id,
      title: link.title.slice(0, 48),
      url: url.href,
      useWebVPN: link.useWebVPN === true,
      bypassWebVPN: link.bypassWebVPN === true,
    };
  } catch {
    return null;
  }
}

function isWebVpnHostname(hostname) {
  const host = hostname.toLowerCase().replace(/\.$/, "");
  return host === WEBVPN_HOST || host.endsWith(`.${WEBVPN_HOST}`);
}

function isHzcuHostname(hostname) {
  const host = hostname.toLowerCase().replace(/\.$/, "");
  return host === "hzcu.edu.cn" || host.endsWith(".hzcu.edu.cn");
}

function rewriteWithWebVpn(target) {
  const source = target instanceof URL ? target : new URL(target);
  if ((source.protocol !== "https:" && source.protocol !== "http:") || !source.hostname) {
    throw new Error("WebVPN 仅支持 HTTP 或 HTTPS 链接。");
  }

  const encodedHost = source.hostname
    .toLowerCase()
    .replace(/-/g, "--")
    .replace(/\./g, "-");
  const hostWithPort = source.port ? `${encodedHost}-${source.port}-p` : encodedHost;
  const proxyHost = `${hostWithPort}${source.protocol === "https:" ? "-s" : ""}.${WEBVPN_HOST}`;
  // The HZCU WebVPN gateway on port 8118 speaks HTTP. The -s host suffix
  // tells WebVPN that the original destination uses HTTPS; it does not mean
  // the gateway URL itself should use HTTPS.
  const proxy = new URL(`http://${proxyHost}:${WEBVPN_PORT}/`);
  proxy.pathname = source.pathname;
  proxy.search = source.search;
  proxy.hash = source.hash;
  return proxy.href;
}

function linkTargetUrl(link) {
  const target = new URL(link.url);
  if (isWebVpnHostname(target.hostname)) return target.href;
  if (link.bypassWebVPN === true) return target.href;
  if (isHzcuHostname(target.hostname) || link.useWebVPN === true) {
    return rewriteWithWebVpn(target);
  }
  return target.href;
}

function getSyncApi() {
  return globalThis.chrome?.storage?.sync ?? null;
}

function getLocalStorageApi() {
  return globalThis.chrome?.storage?.local ?? null;
}

async function readSavedValues() {
  const sync = getSyncApi();
  if (sync) {
    const local = getLocalStorageApi();
    const [syncedValues, localValues] = await Promise.all([
      sync.get(null),
      local?.get({ [UI_SCALE_STORAGE_KEY]: DEFAULT_UI_SCALE }) ?? Promise.resolve({}),
    ]);
    return { ...syncedValues, uiScale: localValues?.[UI_SCALE_STORAGE_KEY] ?? DEFAULT_UI_SCALE };
  }

  try {
    return {
      ...JSON.parse(localStorage.getItem(PREVIEW_KEY) ?? "{}"),
      uiScale: Number(localStorage.getItem(PREVIEW_SCALE_KEY)) || DEFAULT_UI_SCALE,
    };
  } catch {
    return {};
  }
}

function applySavedValues(saved) {
  if (Array.isArray(saved.columns)) {
    const columns = saved.columns.map((column) => normalizeColumn(column, saved)).filter(Boolean).slice(0, MAX_COLUMNS);
    if (columns.length) state.columns = columns;
  }

  if (saved.theme === "sun" || saved.theme === "moon" || saved.theme === "system") state.theme = saved.theme;
  if (SEARCH_ENGINES.some((engine) => engine.id === saved.engine)) state.engine = saved.engine;
  state.collegeId = COLLEGES.some((college) => college.id === saved.collegeId) ? saved.collegeId : "";
  const uiScale = Number(saved.uiScale);
  state.uiScale = UI_SCALE_OPTIONS.includes(uiScale) ? uiScale : DEFAULT_UI_SCALE;
  applyUiScale();
}

function normalizeColumn(column, saved) {
  if (!column || typeof column.id !== "string") return null;
  const title = typeof column.title === "string" ? column.title : "常用入口";
  let links;
  if (Array.isArray(column.links)) {
    links = column.links;
  } else if (Array.isArray(column.groupIds)) {
    // Legacy v1 format: links were stored under per-group records.
    links = column.groupIds.flatMap((groupId) => {
      const group = saved?.[`${LEGACY_GROUP_PREFIX}${groupId}`] ?? saved?.groups?.[groupId];
      return Array.isArray(group?.links) ? group.links : (groupId === "teaching" ? DEFAULT_TEACHING_LINKS : []);
    });
  } else {
    links = [];
  }
  return { id: column.id, title, links: links.map(sanitizeLink).filter(Boolean) };
}

function migrateDefaultContent(saved) {
  const savedVersion = Number(saved.defaultsVersion) || 0;
  if (savedVersion >= DEFAULTS_VERSION) return false;

  if (savedVersion >= 9) {
    const teachingPlatform = state.columns.flatMap((column) => column.links).find((link) => link.id === "teaching-platform");
    if (teachingPlatform) {
      teachingPlatform.useWebVPN = false;
      teachingPlatform.bypassWebVPN = false;
    }
  }

  // Re-save normalized v12+ data, including removal of credential-bearing URLs.
  if (savedVersion >= 12) return true;

  if (savedVersion >= 11) {
    const sciHub = state.columns.flatMap((column) => column.links).find((link) => link.id === "sci-hub");
    if (sciHub) sciHub.url = "https://sci-hub.sg/";
    return true;
  }

  if (savedVersion >= 9) {
    const campus = state.columns.find((column) => column.id === "campus");
    if (campus && savedVersion < 10) {
      const existingIds = new Set(campus.links.map((link) => link.id));
      campus.links.push(
        ...DEFAULT_INFORMATION_LINKS.filter((link) =>
          (link.id === "student-affairs" || link.id === "graduate-office") && !existingIds.has(link.id),
        ).map((link) => ({ ...link })),
      );
    }

    const academic = state.columns.find((column) => column.id === "daily");
    if (academic) {
      if (academic.title === "工具与生活") academic.title = "科研学术";
      const existingIds = new Set(academic.links.map((link) => link.id));
      academic.links.push(...DEFAULT_ACADEMIC_LINKS.filter((link) => !existingIds.has(link.id)).map((link) => ({ ...link })));
    }
    return true;
  }

  for (const defaults of DEFAULT_COLUMNS) {
    const column = state.columns.find((item) => item.id === defaults.id);
    if (!column) continue;
    if (defaults.id === "campus" && column.title === "校园服务") column.title = defaults.title;
    if (defaults.id === "daily" && column.title === "工具与生活") column.title = defaults.title;

    const defaultLinkIds = new Set(defaults.links.map((link) => link.id));
    for (const otherColumn of state.columns) {
      if (otherColumn.id !== column.id) {
        otherColumn.links = otherColumn.links.filter((link) => !defaultLinkIds.has(link.id));
      }
    }

    const existingIds = new Set(column.links.map((link) => link.id));
    column.links.push(...defaults.links.filter((link) => !existingIds.has(link.id)).map((link) => ({ ...link })));

    const defaultLinksById = new Map(defaults.links.map((link) => [link.id, link]));
    for (const link of column.links) {
      const defaultLink = defaultLinksById.get(link.id);
      if (!defaultLink) continue;
      link.useWebVPN = defaultLink.useWebVPN === true;
      link.bypassWebVPN = defaultLink.bypassWebVPN === true;
    }
  }

  return true;
}

function serializeState() {
  return {
    defaultsVersion: DEFAULTS_VERSION,
    theme: state.theme,
    engine: state.engine,
    collegeId: state.collegeId,
    columns: state.columns.map(({ id, title, links }) => ({ id, title, links: [...links] })),
  };
}

function persistState() {
  saveQueue = saveQueue.catch(() => undefined).then(async () => {
    const sync = getSyncApi();
    const values = serializeState();

    if (!sync) {
      localStorage.setItem(PREVIEW_KEY, JSON.stringify(values));
      return;
    }

    const current = await sync.get(null);
    const staleKeys = Object.keys(current).filter((key) => key.startsWith(LEGACY_GROUP_PREFIX));
    await sync.set(values);
    if (staleKeys.length) await sync.remove(staleKeys);
  });
  return saveQueue;
}

let scaleSaveQueue = Promise.resolve();

function persistUiScale() {
  scaleSaveQueue = scaleSaveQueue.catch(() => undefined).then(async () => {
    const local = getLocalStorageApi();
    if (local) {
      await local.set({ [UI_SCALE_STORAGE_KEY]: state.uiScale });
      return;
    }
    localStorage.setItem(PREVIEW_SCALE_KEY, String(state.uiScale));
  });
  return scaleSaveQueue;
}

function showToast(message, isError = false) {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.toggle("is-error", isError);
  toast.classList.add("is-visible");
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2900);
}

function saveAndRender(message = "已保存", { persistScale = false } = {}) {
  renderHome();
  if (settingsDialog.open) renderEditor();
  const persistence = persistScale ? Promise.all([persistState(), persistUiScale()]) : persistState();
  persistence.then(
    () => showToast(message),
    () => showToast("同步存储空间不足或暂不可用；本次更改未能保存。", true),
  );
}

function applyTheme() {
  const resolvedTheme = state.theme === "system"
    ? (systemThemeMedia?.matches ? "moon" : "sun")
    : state.theme;
  document.documentElement.dataset.theme = resolvedTheme;
  document.documentElement.dataset.themeMode = state.theme;
  const themeColor = document.querySelector('meta[name="theme-color"]');
  themeColor.content = resolvedTheme === "sun" ? "#f3f5f2" : "#15191b";
  const currentMode = state.theme === "system" ? `跟随系统（当前 ${resolvedTheme.toUpperCase()}）` : `${state.theme.toUpperCase()} 模式`;
  const nextTheme = state.theme === "moon" ? "SUN" : state.theme === "sun" ? "跟随系统" : "MOON";
  const toggle = document.querySelector("#theme-toggle");
  toggle.setAttribute("aria-label", `当前${currentMode}，点击切换到${nextTheme}模式`);
  toggle.title = `当前${currentMode} · 点击切换到${nextTheme}模式`;
}

function applyUiScale() {
  const zoom = state.uiScale / 100;
  const isMobile = window.matchMedia("(max-width: 700px)").matches;
  const margin = isMobile ? 22 : 30;
  const viewportHeightLimit = window.innerHeight * (isMobile ? 0.91 : 0.88);
  const maxDialogHeight = Math.min(viewportHeightLimit, 900);
  const searchHero = document.querySelector(".search-hero");
  const quickEntries = document.querySelector(".quick-entries");

  document.documentElement.style.zoom = String(zoom);
  document.body.style.minHeight = `${window.innerHeight / zoom}px`;
  settingsDialog.style.width = `${Math.max(0, Math.min(1020, window.innerWidth - margin) / zoom)}px`;
  settingsDialog.style.maxHeight = `${maxDialogHeight / zoom}px`;
  settingsContent.style.maxHeight = `${Math.max(120, (viewportHeightLimit - (isMobile ? 205 : 210)) / zoom)}px`;
  itemDialog.style.width = `${Math.max(0, Math.min(560, window.innerWidth - margin) / zoom)}px`;
  itemDialog.style.maxHeight = `${maxDialogHeight / zoom}px`;

  if (searchHero && quickEntries) {
    searchHero.style.paddingTop = "0px";
    const heroTop = searchHero.getBoundingClientRect().top;
    if (isMobile) {
      const baseMobileTop = Math.max(105, Math.min(window.innerHeight * 0.18, 150));
      searchHero.style.paddingTop = `${baseMobileTop / zoom}px`;
    } else {
      const quickRect = quickEntries.getBoundingClientRect();
      const quickCenterOffset = quickRect.top + quickRect.height / 2 - heroTop;
      searchHero.style.paddingTop = `${Math.max(0, (window.innerHeight / 2 - quickCenterOffset) / zoom)}px`;
    }

    const baseBottom = isMobile ? 48 : Math.max(50, Math.min(window.innerHeight * 0.062, 72));
    searchHero.style.paddingBottom = `${baseBottom / zoom}px`;
  }
}

function currentEngine() {
  return SEARCH_ENGINES.find((engine) => engine.id === state.engine) ?? SEARCH_ENGINES[0];
}

function applyEngine() {
  const engine = currentEngine();
  const mark = document.querySelector("#engine-mark");
  mark.src = engine.icon;
  const toggle = document.querySelector("#engine-toggle");
  toggle.setAttribute("aria-label", `${engine.name} 搜索引擎`);
  toggle.title = engine.name;
  for (const option of engineMenu.querySelectorAll("[role='option']")) {
    option.setAttribute("aria-selected", String(option.dataset.engine === engine.id));
  }
}

function renderEngineMenu() {
  engineMenu.replaceChildren();
  const options = element("div", "engine-options");
  options.setAttribute("role", "presentation");

  for (const engine of SEARCH_ENGINES) {
    const button = element("button", "engine-option");
    button.type = "button";
    button.setAttribute("role", "option");
    button.dataset.engine = engine.id;
    button.setAttribute("aria-selected", String(engine.id === state.engine));
    const mark = element("img", "engine-option-mark");
    mark.src = engine.icon;
    mark.alt = "";
    button.append(mark, element("span", "engine-option-name", engine.name));
    options.append(button);
  }
  engineMenu.append(options);
  applyEngine();
}

function makeTile(link) {
  const anchor = element("a", "shortcut-tile");
  anchor.href = linkTargetUrl(link);
  anchor.target = "_blank";
  anchor.rel = "noopener noreferrer";
  anchor.title = `${link.title} · ${link.url}`;
  anchor.append(element("span", "tile-label", link.title));
  return anchor;
}

function renderCollegeEntry() {
  collegeEntry.replaceChildren();
  collegeMenu.replaceChildren();
  setCollegeMenu(false);
  const college = COLLEGES.find((entry) => entry.id === state.collegeId);

  if (college) {
    const anchor = element("a", "quick-entry college-shortcut", `🏫${college.name}`);
    anchor.href = college.url;
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
    anchor.title = `${college.name} · 可在设置中更改关注学院`;
    collegeEntry.append(anchor);
    setCollegeMenu(false);
    return;
  }

  const trigger = element("button", "quick-entry college-select-trigger", "🏫选择学院");
  trigger.type = "button";
  trigger.setAttribute("aria-haspopup", "listbox");
  trigger.setAttribute("aria-controls", "college-menu");
  trigger.setAttribute("aria-expanded", String(!collegeMenu.hidden));
  trigger.addEventListener("click", () => {
    setCollegeMenu(collegeMenu.hidden);
  });

  for (const entry of COLLEGES) {
    const option = element("button", "college-option", entry.name);
    option.type = "button";
    option.setAttribute("role", "option");
    option.dataset.collegeId = entry.id;
    option.title = entry.name;
    collegeMenu.append(option);
  }
  collegeEntry.append(trigger);
  setCollegeMenu(false);
}

function setCollegeMenu(open) {
  collegeMenu.hidden = !open;
  collegeEntry.querySelector(".college-select-trigger")?.setAttribute("aria-expanded", String(open));
}

function renderHome() {
  renderCollegeEntry();
  columnsGrid.dataset.columnCount = String(state.columns.length);
  columnsGrid.replaceChildren();
  for (const column of state.columns) {
    const columnNode = element("section", "home-column");
    columnNode.setAttribute("aria-label", column.title);
    const heading = element("div", "column-heading");
    heading.append(element("h2", "column-title", column.title));
    columnNode.append(heading);

    const tileGrid = element("div", "tile-grid");
    for (const link of column.links) tileGrid.append(makeTile(link));
    columnNode.append(tileGrid);
    columnsGrid.append(columnNode);
  }
}

function renderEditor() {
  settingsContent.replaceChildren();
  settingsContent.dataset.columnCount = String(state.columns.length);

  const toolbar = element("div", "settings-toolbar");
  const addColumn = element("button", "primary-button", "+ 新建分类");
  addColumn.type = "button";
  addColumn.dataset.action = "add-column";
  addColumn.disabled = state.columns.length >= MAX_COLUMNS;
  addColumn.title = addColumn.disabled ? `最多设置 ${MAX_COLUMNS} 个分类` : "新建分类";
  const resetSettings = element("button", "secondary-button", "重置");
  resetSettings.type = "button";
  resetSettings.dataset.action = "reset-initial-state";
  resetSettings.title = "恢复初始化状态：默认分类、链接和设置";
  toolbar.append(addColumn, resetSettings);
  settingsContent.append(toolbar);

  const preferences = element("section", "settings-preferences");
  const preferenceCopy = element("div", "settings-preference-copy");
  preferenceCopy.append(
    element("h3", "", "关注学院"),
    element("p", "", "一次只能关注一个学院；可随时在这里更改。"),
  );
  const collegeSelect = createCustomSelect({
    id: "featured-college",
    className: "settings-college-select",
    label: "选择关注学院",
    options: [
      { value: "", label: "未选择" },
      ...COLLEGES.map((college) => ({ value: college.id, label: college.name })),
    ],
    value: state.collegeId,
  });
  preferences.append(preferenceCopy, collegeSelect);
  settingsContent.append(preferences);

  const scalePreferences = element("section", "settings-preferences");
  const scaleCopy = element("div", "settings-preference-copy");
  scaleCopy.append(
    element("h3", "", "页面显示比例"),
    element("p", "", "仅保存在当前浏览器；放大首页和设置界面。"),
  );
  const scaleSelect = createCustomSelect({
    id: "page-scale",
    className: "settings-scale-select",
    label: "页面显示比例",
    options: UI_SCALE_OPTIONS.map((scale) => ({ value: String(scale), label: `${scale}%` })),
    value: String(state.uiScale),
  });
  scalePreferences.append(scaleCopy, scaleSelect);
  settingsContent.append(scalePreferences);

  for (const [columnIndex, column] of state.columns.entries()) {
    const columnCard = element("section", "editor-column");
    const heading = element("div", "editor-column-heading");
    heading.append(element("h3", "", `${String(columnIndex + 1).padStart(2, "0")} · ${column.title}`));
    const renameColumn = element("button", "small-button", "改名");
    renameColumn.type = "button";
    renameColumn.dataset.action = "edit-column";
    renameColumn.dataset.id = column.id;
    const deleteColumn = element("button", "small-button is-danger", "删除");
    deleteColumn.type = "button";
    deleteColumn.dataset.action = "delete-column";
    deleteColumn.dataset.id = column.id;
    deleteColumn.disabled = state.columns.length <= MIN_COLUMNS;
    deleteColumn.title = deleteColumn.disabled ? "至少保留一个分类" : "删除分类及其全部链接";
    const columnActions = element("div", "editor-column-actions");
    columnActions.append(renameColumn, deleteColumn);
    heading.append(columnActions);
    columnCard.append(heading);

    const links = element("div", "editor-links");
    if (!column.links.length) links.append(element("p", "editor-empty", "暂无链接"));
    for (const [linkIndex, link] of column.links.entries()) {
      const row = element("div", "editor-link");
      const copy = element("div", "editor-link-copy");
      copy.append(element("span", "editor-link-title", link.title), element("span", "editor-link-url", link.url));
      const linkActions = element("div", "editor-actions");
      const linkUp = actionButton("↑", "move-link-up", link.id);
      linkUp.disabled = linkIndex === 0;
      const linkDown = actionButton("↓", "move-link-down", link.id);
      linkDown.disabled = linkIndex === column.links.length - 1;
      linkActions.append(linkUp, linkDown, actionButton("✎", "edit-link", link.id), actionButton("×", "delete-link", link.id, "is-danger"));
      row.append(copy, linkActions);
      links.append(row);
    }

    const addLink = element("button", "editor-add-link", "+ 添加链接");
    addLink.type = "button";
    addLink.dataset.action = "add-link";
    addLink.dataset.id = column.id;
    columnCard.append(heading, links, addLink);
    settingsContent.append(columnCard);
  }

  const settingsFooter = element("div", "settings-footer");
  const githubLink = element("a", "settings-github-link");
  githubLink.href = "https://github.com/DreamDZL";
  githubLink.target = "_blank";
  githubLink.rel = "noopener noreferrer";
  githubLink.setAttribute("aria-label", "DreamDZL 的 GitHub 主页（在新标签页打开）");
  const githubIcon = element("img");
  githubIcon.src = "icons/search/github.svg";
  githubIcon.alt = "";
  githubIcon.setAttribute("aria-hidden", "true");
  githubLink.append(githubIcon, element("span", "", "GitHub 主页"));
  settingsFooter.append(githubLink);
  settingsContent.append(settingsFooter);
}

function openSettings() {
  renderEditor();
  settingsDialog.showModal();
}

function populateColumnSelect(selectedId) {
  const root = document.querySelector("#item-column-picker");
  const value = selectedId && state.columns.some((column) => column.id === selectedId)
    ? selectedId
    : state.columns[0]?.id;
  setCustomSelectOptions(root, state.columns.map((column) => ({ value: column.id, label: column.title })), value);
}

function openItemEditor({ type, id = null, columnId = null } = {}) {
  const formError = document.querySelector("#form-error");
  formError.textContent = "";
  const titleInput = itemForm.elements.namedItem("title");
  const urlInput = itemForm.elements.namedItem("url");
  const proxyToggle = itemForm.elements.namedItem("useWebVPN");
  const proxyField = document.querySelector("#item-proxy-field");
  const titleField = document.querySelector("#item-title-field");
  const urlField = document.querySelector("#item-url-field");
  const columnField = document.querySelector("#item-column-field");
  const dialogTitle = document.querySelector("#item-dialog-title");
  const linkEntry = type === "link" ? findLink(id) : null;
  const columnEntry = type === "column" ? state.columns.find((column) => column.id === id) : null;

  itemForm.dataset.type = type;
  itemForm.dataset.id = id ?? "";
  itemForm.dataset.manualProxy = String(linkEntry?.link.useWebVPN === true);
  itemForm.dataset.bypassProxy = String(linkEntry?.link.bypassWebVPN === true);
  itemForm.reset();
  titleField.hidden = false;
  urlField.hidden = type !== "link";
  columnField.hidden = type === "column";
  proxyField.hidden = type !== "link";
  dialogTitle.textContent = ({ link: id ? "编辑链接" : "添加链接", column: id ? "重命名分类" : "新建分类" })[type];
  titleInput.value = linkEntry?.link.title ?? columnEntry?.title ?? "";
  urlInput.value = linkEntry?.link.url ?? "";
  proxyToggle.checked = linkEntry?.link.useWebVPN === true;
  updateWebVpnControls();

  const selectedColumnId = linkEntry?.column.id ?? columnId ?? state.columns[0].id;
  populateColumnSelect(selectedColumnId);
  itemDialog.showModal();
  titleInput.focus();
}

function findLink(linkId) {
  for (const column of state.columns) {
    const link = column.links.find((item) => item.id === linkId);
    if (link) return { column, link };
  }
  return null;
}

function normalizeWebUrl(value) {
  const trimmed = value.trim();
  const candidate = /^[a-z][a-z\d+.-]*:/i.test(trimmed) ? trimmed : `https://${trimmed}`;
  const url = new URL(candidate);
  if (url.protocol !== "https:" && url.protocol !== "http:") throw new Error("链接网址必须以 http:// 或 https:// 开头。");
  if (!url.hostname) throw new Error("请输入有效的网址。");
  if (url.username || url.password) throw new Error("网址中不能包含账号或密码，请直接访问网站并登录。");
  return url.href;
}

function getSearchAddress(value) {
  const input = value.trim();
  const hasWebProtocol = /^https?:\/\//i.test(input);
  const bareAddressPattern = /^(?:localhost|(?:\d{1,3}\.){3}\d{1,3}|\[[\da-f:.]+\]|(?:[\p{L}\d](?:[\p{L}\d-]*[\p{L}\d])?\.)+(?:[\p{L}]{2,}|xn--[\p{L}\d-]{2,}))(?::\d{1,5})?(?:[/?#]\S*)?$/iu;
  if (!hasWebProtocol && !bareAddressPattern.test(input)) return null;

  try {
    const url = new URL(hasWebProtocol ? input : `https://${input}`);
    return url.protocol === "http:" || url.protocol === "https:" ? url : null;
  } catch {
    return null;
  }
}

function updateSearchButton() {
  const action = getSearchAddress(searchInput.value) ? "visit" : "search";
  searchSubmit.dataset.action = action;
  searchSubmit.setAttribute("aria-label", action === "visit" ? "访问网址" : "搜索");
  searchSubmit.title = action === "visit" ? "访问网址" : "搜索";
}

function updateWebVpnControls() {
  const proxyToggle = itemForm.elements.namedItem("useWebVPN");
  const proxyHint = document.querySelector("#webvpn-hint");
  const rawUrl = String(itemForm.elements.namedItem("url").value).trim();
  let target = null;
  if (rawUrl) {
    try {
      target = new URL(normalizeWebUrl(rawUrl));
    } catch {
      // URL validation is reported when the form is submitted.
    }
  }

  const gateway = target && isWebVpnHostname(target.hostname);
  const automatic = target && !gateway && isHzcuHostname(target.hostname);
  proxyToggle.disabled = Boolean(gateway);
  proxyToggle.checked = gateway
    ? false
    : automatic
      ? itemForm.dataset.bypassProxy !== "true"
      : itemForm.dataset.manualProxy === "true";
  proxyHint.textContent = gateway
    ? "WebVPN 地址不会重复代理"
    : automatic
      ? "HZCU 域名默认使用校园 WebVPN，可取消勾选直连"
      : "其他校内系统可手动开启代理";
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
    if (id) {
      const column = state.columns.find((item) => item.id === id);
      if (!column) return;
      column.title = title;
    } else {
      if (state.columns.length >= MAX_COLUMNS) {
        error.textContent = `最多只能设置 ${MAX_COLUMNS} 个分类。`;
        return;
      }
      state.columns.push({ id: safeId("column"), title, links: [] });
    }
    itemDialog.close();
    saveAndRender(id ? "分类名称已保存" : "分类已创建");
    return;
  }

  const targetColumn = state.columns.find((column) => column.id === document.querySelector("#item-column").value);
  if (!targetColumn) {
    error.textContent = "请选择所属分类。";
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

  const existing = findLink(id);
  const parsedUrl = new URL(url);
  const isHzcu = isHzcuHostname(parsedUrl.hostname);
  const isGateway = isWebVpnHostname(parsedUrl.hostname);
  const proxyEnabled = itemForm.elements.namedItem("useWebVPN").checked;
  const useWebVPN = proxyEnabled && !isHzcu && !isGateway;
  const bypassWebVPN = isHzcu && !proxyEnabled;
  const link = { id: existing?.link.id ?? safeId("link"), title, url, useWebVPN, bypassWebVPN };
  if (existing && existing.column.id !== targetColumn.id) {
    existing.column.links = existing.column.links.filter((item) => item.id !== existing.link.id);
    targetColumn.links.push(link);
  } else if (existing) {
    targetColumn.links = targetColumn.links.map((item) => item.id === existing.link.id ? link : item);
  } else {
    targetColumn.links.push(link);
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
    case "add-column":
      if (state.columns.length < MAX_COLUMNS) openItemEditor({ type: "column" });
      return;
    case "delete-column": {
      const column = state.columns.find((item) => item.id === id);
      if (!column || state.columns.length <= MIN_COLUMNS) return;
      const count = column.links.length;
      const detail = count ? `及其 ${count} 个链接` : "";
      if (!window.confirm(`确定删除分类“${column.title}”${detail}？此操作无法撤销。`)) return;
      state.columns = state.columns.filter((item) => item.id !== id);
      saveAndRender("分类已删除");
      return;
    }
    case "reset-initial-state": {
      if (!window.confirm("恢复初始化状态？这会重置分类、链接、主题、搜索引擎、关注学院和页面显示比例。此操作无法撤销。")) return;
      state.columns = structuredClone(DEFAULT_COLUMNS);
      state.theme = "moon";
      state.engine = "baidu";
      state.collegeId = "";
      state.uiScale = DEFAULT_UI_SCALE;
      applyTheme();
      applyUiScale();
      renderEngineMenu();
      saveAndRender("已恢复初始化状态", { persistScale: true });
      return;
    }
    case "add-link": openItemEditor({ type: "link", columnId: id }); return;
    case "edit-link": openItemEditor({ type: "link", id }); return;
    case "delete-link": {
      const entry = findLink(id);
      if (!entry || !window.confirm(`删除链接“${entry.link.title}”？`)) return;
      entry.column.links = entry.column.links.filter((link) => link.id !== id);
      saveAndRender("链接已删除");
      return;
    }
    case "move-link-up":
    case "move-link-down": {
      const entry = findLink(id);
      if (!entry) return;
      const delta = action.endsWith("up") ? -1 : 1;
      if (moveItem(entry.column.links, id, delta)) saveAndRender("链接顺序已更新");
      return;
    }
  }
}

function setEngineMenu(open) {
  engineMenu.hidden = !open;
  engineToggle.setAttribute("aria-expanded", String(open));
}

document.querySelector("#theme-toggle").addEventListener("click", () => {
  state.theme = ({ moon: "sun", sun: "system", system: "moon" })[state.theme] ?? "moon";
  applyTheme();
  const modeName = state.theme === "system" ? "跟随系统" : `${state.theme.toUpperCase()} 模式`;
  persistState().then(
    () => showToast(`${modeName}已保存`),
    () => showToast("模式已切换，但同步保存失败。", true),
  );
});

if (systemThemeMedia?.addEventListener) {
  systemThemeMedia.addEventListener("change", () => {
    if (state.theme === "system") applyTheme();
  });
} else if (systemThemeMedia?.addListener) {
  systemThemeMedia.addListener(() => {
    if (state.theme === "system") applyTheme();
  });
}

document.querySelector("#settings-toggle").addEventListener("click", openSettings);

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
  if (!event.target.closest("#college-entry-wrap")) setCollegeMenu(false);

  const option = event.target.closest("[data-custom-select-option]");
  const trigger = event.target.closest("[data-custom-select-trigger]");
  if (option) {
    const root = option.closest(".custom-select");
    if (root) chooseCustomSelectOption(root, option);
  } else if (trigger) {
    const root = trigger.closest(".custom-select");
    if (root) {
      const shouldOpen = trigger.getAttribute("aria-expanded") !== "true";
      closeCustomSelects(root);
      setCustomSelectOpen(root, shouldOpen);
    }
  } else {
    closeCustomSelects();
  }

  const closeButton = event.target.closest("[data-close-dialog]");
  if (closeButton) document.getElementById(closeButton.dataset.closeDialog)?.close();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setEngineMenu(false);
  if (event.key === "Escape") setCollegeMenu(false);

  const trigger = event.target.closest?.("[data-custom-select-trigger]");
  const option = event.target.closest?.("[data-custom-select-option]");
  const root = trigger?.closest(".custom-select") ?? option?.closest(".custom-select");
  if (!root) {
    if (event.key === "Escape") closeCustomSelects();
    return;
  }

  if (event.key === "Escape") {
    event.preventDefault();
    setCustomSelectOpen(root, false);
    root.querySelector(".custom-select-trigger").focus();
    return;
  }

  if (trigger && ["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
    event.preventDefault();
    closeCustomSelects(root);
    setCustomSelectOpen(root, true);
    const destination = event.key === "Home" ? "first" : event.key === "End" ? "last" : "selected";
    focusCustomSelectOption(root, destination);
    return;
  }

  if (option && ["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
    event.preventDefault();
    const destination = event.key === "Home" ? "first" : event.key === "End" ? "last" : event.key === "ArrowDown" ? "next" : "previous";
    focusCustomSelectOption(root, destination);
  }
});

document.addEventListener("focusin", (event) => {
  if (!event.target.closest?.(".custom-select")) closeCustomSelects();
});

window.addEventListener("resize", () => {
  applyUiScale();
  for (const root of document.querySelectorAll(".custom-select")) {
    if (root.querySelector(".custom-select-menu")?.matches(":popover-open")) positionCustomSelect(root);
  }
});
window.addEventListener("scroll", () => {
  for (const root of document.querySelectorAll(".custom-select")) {
    if (root.querySelector(".custom-select-menu")?.matches(":popover-open")) positionCustomSelect(root);
  }
}, true);

collegeMenu.addEventListener("click", (event) => {
  const option = event.target.closest("[data-college-id]");
  if (!option) return;
  state.collegeId = option.dataset.collegeId;
  saveAndRender("关注学院已保存");
});

itemForm.elements.namedItem("url").addEventListener("input", updateWebVpnControls);
itemForm.elements.namedItem("useWebVPN").addEventListener("change", (event) => {
  const rawUrl = String(itemForm.elements.namedItem("url").value).trim();
  let target = null;
  try {
    if (rawUrl) target = new URL(normalizeWebUrl(rawUrl));
  } catch {
    // URL validation is reported when the form is submitted.
  }
  if (target && isHzcuHostname(target.hostname)) {
    itemForm.dataset.bypassProxy = String(!event.target.checked);
  } else {
    itemForm.dataset.manualProxy = String(event.target.checked);
  }
});
itemForm.addEventListener("submit", handleItemSubmit);
settingsContent.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");
  if (button) handleEditorAction(button.dataset.action, button.dataset.id);
});
searchInput.addEventListener("input", updateSearchButton);
updateSearchButton();
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = searchInput.value.trim();
  if (!query) {
    searchInput.focus();
    return;
  }
  const address = getSearchAddress(query);
  if (address) {
    window.location.assign(linkTargetUrl({ url: address.href, useWebVPN: false }));
    return;
  }
  window.location.assign(currentEngine().url.replace("{query}", encodeURIComponent(query)));
});

if (globalThis.chrome?.storage?.onChanged) {
  globalThis.chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === "local" && changes[UI_SCALE_STORAGE_KEY]) {
      const uiScale = Number(changes[UI_SCALE_STORAGE_KEY].newValue);
      state.uiScale = UI_SCALE_OPTIONS.includes(uiScale) ? uiScale : DEFAULT_UI_SCALE;
      applyUiScale();
      const scaleSelect = settingsContent.querySelector('[data-custom-select="page-scale"]');
      if (scaleSelect) {
        const options = [...scaleSelect.querySelectorAll("[data-custom-select-option]")].map((option) => ({
          value: option.dataset.value,
          label: option.textContent,
        }));
        setCustomSelectOptions(scaleSelect, options, String(state.uiScale));
      }
      return;
    }
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
  let shouldPersistMigration = false;
  try {
    const saved = await readSavedValues();
    applySavedValues(saved);
    shouldPersistMigration = migrateDefaultContent(saved);
  } catch {
    showToast("无法读取同步设置，已使用默认布局。", true);
    shouldPersistMigration = migrateDefaultContent({});
  }
  applyTheme();
  renderEngineMenu();
  renderHome();
  searchInput.focus({ preventScroll: true });
  if (shouldPersistMigration) {
    persistState().catch(() => showToast("城院教学入口未能同步保存。", true));
  }
}

initialize();
