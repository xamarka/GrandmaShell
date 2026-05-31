const STORAGE_KEY = 'tvbox-tiles';
const LOCK_KEY = 'tvbox-locked';
const USERNAME_KEY = 'tvbox-username';
const CITY_KEY = 'tvbox-city';
const LANG_KEY = 'tvbox-lang';

let currentLang = 'ru';

const LANG = {
  'greeting.morning': { ru: 'Доброе утро', en: 'Good morning' },
  'greeting.afternoon': { ru: 'Добрый день', en: 'Good afternoon' },
  'greeting.evening': { ru: 'Добрый вечер', en: 'Good evening' },
  'greeting.night': { ru: 'Доброй ночи', en: 'Good night' },
  'greeting.home.withName': { ru: 'Что смотрим, {name}?', en: 'What are we watching, {name}?' },
  'greeting.home.withoutName': { ru: 'Что смотрим?', en: 'What are we watching?' },
  'settings.name': { ru: 'Имя', en: 'Name' },
  'settings.namePlaceholder': { ru: 'Ваше имя', en: 'Your name' },
  'settings.city': { ru: 'Город', en: 'City' },
  'settings.cityPlaceholder': { ru: 'Москва', en: 'Moscow' },
  'settings.displayMode': { ru: 'Режим экрана', en: 'Display mode' },
  'settings.tiles': { ru: 'Плитки', en: 'Tiles' },
  'settings.language': { ru: 'Язык / Language', en: 'Language / Язык' },
  'settings.testScreen': { ru: 'Тест заставки', en: 'Test screensaver' },
  'settings.done': { ru: 'Готово', en: 'Done' },
  'lang.current': { ru: 'Русский', en: 'English' },
  'lock.locked': { ru: 'Заблокировано', en: 'Locked' },
  'lock.unlocked': { ru: 'Разблокировано', en: 'Unlocked' },
  'display.window': { ru: 'Окно', en: 'Window' },
  'display.fullscreen': { ru: 'Полный экран', en: 'Fullscreen' },
  'display.switchWindow': { ru: 'Переключить в оконный режим', en: 'Switch to window mode' },
  'display.switchFullscreen': { ru: 'Переключить в полноэкранный режим', en: 'Switch to fullscreen mode' },
  'toolbar.label': { ru: 'Навигация', en: 'Navigation' },
  'tool.home': { ru: 'Главная', en: 'Home' },
  'tool.back': { ru: 'Назад', en: 'Back' },
  'tool.forward': { ru: 'Вперёд', en: 'Forward' },
  'tool.reload': { ru: 'Обновить', en: 'Reload' },
  'tool.close': { ru: 'Закрыть', en: 'Close' },
  'tool.quit': { ru: 'Выход', en: 'Quit' },
  'tool.settings': { ru: 'Настройки', en: 'Settings' },
  'addTile.label': { ru: 'Добавить плитку', en: 'Add tile' },
  'addTile.text': { ru: 'Добавить', en: 'Add' },
  'modal.add': { ru: 'Добавить плитку', en: 'Add tile' },
  'modal.edit': { ru: 'Редактировать плитку', en: 'Edit tile' },
  'modal.name': { ru: 'Название', en: 'Name' },
  'modal.namePlaceholder': { ru: 'YouTube', en: 'YouTube' },
  'modal.url': { ru: 'URL', en: 'URL' },
  'modal.urlPlaceholder': { ru: 'https://www.youtube.com/', en: 'https://www.youtube.com/' },
  'modal.color1': { ru: 'Цвет 1', en: 'Color 1' },
  'modal.color2': { ru: 'Цвет 2', en: 'Color 2' },
  'modal.gradient': { ru: 'Градиент', en: 'Gradient' },
  'modal.custom': { ru: 'Свой', en: 'Custom' },
  'modal.customLabel': { ru: 'Свой градиент', en: 'Custom gradient' },
  'modal.delete': { ru: 'Удалить', en: 'Delete' },
  'modal.cancel': { ru: 'Отмена', en: 'Cancel' },
  'modal.save': { ru: 'Сохранить', en: 'Save' },
  'modal.confirmDelete': { ru: 'Удалить плитку «{name}»?', en: 'Delete tile «{name}»?' },
  'tile.edit': { ru: 'Редактировать', en: 'Edit' },
  'tile.delete': { ru: 'Удалить', en: 'Delete' },
  'shutdown.label': { ru: 'Выключить систему', en: 'Shutdown' },
  'weather.cityNotFound': { ru: 'Город не найден', en: 'City not found' },
  'weather.loadError': { ru: 'Ошибка загрузки', en: 'Load error' },
  'preset.sunset': { ru: 'Закат', en: 'Sunset' },
  'preset.ocean': { ru: 'Океан', en: 'Ocean' },
  'preset.forest': { ru: 'Лес', en: 'Forest' },
  'preset.neon': { ru: 'Неон', en: 'Neon' },
  'preset.gold': { ru: 'Золото', en: 'Gold' },
  'preset.night': { ru: 'Ночь', en: 'Night' },
  'preset.cherry': { ru: 'Вишня', en: 'Cherry' },
  'preset.mint': { ru: 'Мятный', en: 'Mint' },
  'preset.ash': { ru: 'Пепел', en: 'Ash' },
  'preset.lavender': { ru: 'Лаванда', en: 'Lavender' },
  'wmo.0': { ru: 'Ясно', en: 'Clear' },
  'wmo.1': { ru: 'Преимущественно ясно', en: 'Mainly clear' },
  'wmo.2': { ru: 'Переменная облачность', en: 'Partly cloudy' },
  'wmo.3': { ru: 'Пасмурно', en: 'Overcast' },
  'wmo.45': { ru: 'Туман', en: 'Fog' },
  'wmo.48': { ru: 'Изморозь', en: 'Rime fog' },
  'wmo.51': { ru: 'Лёгкая морось', en: 'Light drizzle' },
  'wmo.53': { ru: 'Морось', en: 'Drizzle' },
  'wmo.55': { ru: 'Сильная морось', en: 'Dense drizzle' },
  'wmo.61': { ru: 'Небольшой дождь', en: 'Slight rain' },
  'wmo.63': { ru: 'Дождь', en: 'Rain' },
  'wmo.65': { ru: 'Сильный дождь', en: 'Heavy rain' },
  'wmo.71': { ru: 'Небольшой снег', en: 'Slight snow' },
  'wmo.73': { ru: 'Снег', en: 'Snow' },
  'wmo.75': { ru: 'Сильный снег', en: 'Heavy snow' },
  'wmo.80': { ru: 'Небольшие ливни', en: 'Slight showers' },
  'wmo.81': { ru: 'Ливни', en: 'Showers' },
  'wmo.82': { ru: 'Сильные ливни', en: 'Heavy showers' },
  'wmo.95': { ru: 'Гроза', en: 'Thunderstorm' },
  'wmo.96': { ru: 'Гроза с градом', en: 'Thunderstorm with hail' },
  'wmo.99': { ru: 'Сильная гроза с градом', en: 'Severe thunderstorm with hail' },
};

function t(key, vars) {
  let str = LANG[key]?.[currentLang] ?? key;
  if (vars) {
    str = str.replace(/\{(\w+)\}/g, (_, k) => vars[k] !== undefined ? vars[k] : `{${k}}`);
  }
  return str;
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    if (key) el.textContent = t(key);
  });
  document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
    const key = el.dataset.i18nAria;
    if (key) el.setAttribute('aria-label', t(key));
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.dataset.i18nPlaceholder;
    if (key) el.placeholder = t(key);
  });
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem(LANG_KEY, lang);
  document.documentElement.lang = lang;

  applyTranslations();
  updateHomeGreeting();
  updateLockUI();
  updateDisplayMode({ fullscreen: displayFullscreen });
  renderTiles();

  if (modalOverlay.classList.contains('modal-overlay--open')) {
    const idx = editIdInput.value;
    modalTitle.textContent = idx !== '' ? t('modal.edit') : t('modal.add');
  }

  const prevCity = getCity();
  if (prevCity) fetchWeather();
}

const GRADIENT_PRESETS = [
  { nameKey: 'sunset', color1: '#ff4500', color2: '#8b0000' },
  { nameKey: 'ocean', color1: '#0077ff', color2: '#0055cc' },
  { nameKey: 'forest', color1: '#2e7d32', color2: '#1b5e20' },
  { nameKey: 'neon', color1: '#d500f9', color2: '#651fff' },
  { nameKey: 'gold', color1: '#ff8f00', color2: '#e65100' },
  { nameKey: 'night', color1: '#1a237e', color2: '#0d47a1' },
  { nameKey: 'cherry', color1: '#880e4f', color2: '#4a001f' },
  { nameKey: 'mint', color1: '#00897b', color2: '#004d40' },
  { nameKey: 'ash', color1: '#424242', color2: '#212121' },
  { nameKey: 'lavender', color1: '#7b1fa2', color2: '#4a148c' },
];

const DEFAULT_TILES = [
  { id: 'card-youtube', name: 'YouTube', url: 'https://www.youtube.com/tv#/', service: 'youtube', color1: '#ff0000', color2: '#282828' },
  { id: 'card-kinopoisk', name: 'Кинопоиск', url: 'https://hd.kinopoisk.ru', service: 'kinopoisk', color1: '#ff6a00', color2: '#e63e00' },
  { id: 'card-vkvideo', name: 'VK Видео', url: 'https://vkvideo.ru/', service: 'vkvideo', color1: '#0077ff', color2: '#0055cc' },
  { id: 'card-google', name: 'Google', url: 'https://www.google.com/', service: 'google', color1: '#ffffff', color2: '#cccccc' },
];

const homeScreen = document.getElementById('home-screen');
const clockEl = document.getElementById('clock');
const homeDate = document.getElementById('home-date');
const shutdownBtn = document.getElementById('btn-shutdown');
const displayLabel = document.getElementById('display-label');
const displayIconFull = document.getElementById('display-icon-full');
const displayIconWindow = document.getElementById('display-icon-window');
const tilesContainer = document.querySelector('.tiles');
const addTileBtn = document.getElementById('btn-add-tile');
const modalOverlay = document.getElementById('modal-overlay');
const modalForm = document.getElementById('modal-form');
const modalTitle = document.getElementById('modal-title');
const editIdInput = document.getElementById('edit-id');
const inputName = document.getElementById('input-name');
const inputUrl = document.getElementById('input-url');
const inputColor1 = document.getElementById('input-color1');
const inputColor2 = document.getElementById('input-color2');
const modalSave = document.getElementById('modal-save');
const modalCancel = document.getElementById('modal-cancel');
const modalDelete = document.getElementById('modal-delete');

const confirmOverlay = document.getElementById('confirm-overlay');
const confirmText = document.getElementById('confirm-text');
const confirmYes = document.getElementById('confirm-yes');
const confirmNo = document.getElementById('confirm-no');

const settingsBtn = document.getElementById('btn-settings');
const settingsPanel = document.getElementById('settings-panel');
const settingsName = document.getElementById('settings-name');
const settingsCity = document.getElementById('settings-city');
const settingsDone = document.getElementById('settings-done');
const settingsTest = document.getElementById('settings-test');
const settingsDisplay = document.getElementById('settings-display');
const greetingOverlay = document.getElementById('greeting-overlay');
const greetingText = document.getElementById('greeting-text');
const homeGreeting = document.getElementById('home-greeting');
const weatherWidget = document.getElementById('weather-widget');
const weatherIcon = document.getElementById('weather-icon');
const weatherTemp = document.getElementById('weather-temp');
const weatherCity = document.getElementById('weather-city');
const weatherDesc = document.getElementById('weather-desc');
const screensaver = document.getElementById('screensaver');
const saTime = document.getElementById('sa-time');
const saDate = document.getElementById('sa-date');
const saWicon = document.getElementById('sa-wicon');
const saWtemp = document.getElementById('sa-wtemp');
const saWcity = document.getElementById('sa-wcity');

const lockBtn = document.getElementById('btn-lock');
const lockLabel = document.getElementById('lock-label');
const lockIconOpen = document.getElementById('lock-icon-open');
const lockIconClosed = document.getElementById('lock-icon-closed');
const presetGrid = document.getElementById('preset-grid');
const navButtons = Array.from(document.querySelectorAll('.toolbar .tool'));
const navActions = navButtons.map((btn) => btn.dataset.action);

let tilesData = [];
let cards = [];
let focusZone = 'cards';
let cardIndex = 0;
let navIndex = 0;
let isLocked = false;
let displayFullscreen = false;

// --- Data persistence ---

function loadTiles() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      tilesData = JSON.parse(stored);
      return;
    } catch (_) {}
  }
  tilesData = DEFAULT_TILES.map((t) => ({ ...t }));
}

function loadLockState() {
  const stored = localStorage.getItem(LOCK_KEY);
  isLocked = stored === 'true';
  updateLockUI();
}

function saveLockState() {
  localStorage.setItem(LOCK_KEY, isLocked);
}

function updateLockUI() {
  lockLabel.textContent = isLocked ? t('lock.locked') : t('lock.unlocked');
  lockBtn.style.borderColor = isLocked ? '#81c995' : '#333';
  lockBtn.style.color = isLocked ? '#81c995' : 'var(--text)';
  lockIconOpen.hidden = isLocked;
  lockIconClosed.hidden = !isLocked;
}

function getUsername() {
  return localStorage.getItem(USERNAME_KEY) || '';
}

function saveUsername(name) {
  localStorage.setItem(USERNAME_KEY, name.trim());
}

function getGreeting() {
  const h = new Date().getHours();
  if (h >= 6 && h < 12) return t('greeting.morning');
  if (h >= 12 && h < 18) return t('greeting.afternoon');
  if (h >= 18 && h < 23) return t('greeting.evening');
  return t('greeting.night');
}

function updateHomeGreeting() {
  const name = getUsername();
  homeGreeting.textContent = name
    ? t('greeting.home.withName', { name })
    : t('greeting.home.withoutName');
}

function showGreeting() {
  const name = getUsername();
  if (!name) {
    updateHomeGreeting();
    return;
  }
  greetingText.textContent = `${getGreeting()}, ${name}!`;
  greetingOverlay.classList.add('greeting-overlay--visible');
  setTimeout(() => {
    greetingOverlay.classList.remove('greeting-overlay--visible');
    greetingOverlay.classList.add('greeting-overlay--hidden');
    updateHomeGreeting();
  }, 3000);
}

function getCity() {
  return localStorage.getItem(CITY_KEY) || '';
}

function saveCity(city) {
  localStorage.setItem(CITY_KEY, city.trim());
}

const WMO_CODES = {
  0: { icon: '☀️', descKey: 'wmo.0' },
  1: { icon: '🌤️', descKey: 'wmo.1' },
  2: { icon: '⛅', descKey: 'wmo.2' },
  3: { icon: '☁️', descKey: 'wmo.3' },
  45: { icon: '🌫️', descKey: 'wmo.45' },
  48: { icon: '🌫️', descKey: 'wmo.48' },
  51: { icon: '🌦️', descKey: 'wmo.51' },
  53: { icon: '🌦️', descKey: 'wmo.53' },
  55: { icon: '🌧️', descKey: 'wmo.55' },
  61: { icon: '🌦️', descKey: 'wmo.61' },
  63: { icon: '🌧️', descKey: 'wmo.63' },
  65: { icon: '🌧️', descKey: 'wmo.65' },
  71: { icon: '🌨️', descKey: 'wmo.71' },
  73: { icon: '🌨️', descKey: 'wmo.73' },
  75: { icon: '❄️', descKey: 'wmo.75' },
  80: { icon: '🌦️', descKey: 'wmo.80' },
  81: { icon: '🌧️', descKey: 'wmo.81' },
  82: { icon: '🌧️', descKey: 'wmo.82' },
  95: { icon: '⛈️', descKey: 'wmo.95' },
  96: { icon: '⛈️', descKey: 'wmo.96' },
  99: { icon: '⛈️', descKey: 'wmo.99' },
};

async function fetchWeather() {
  const city = getCity();
  if (!city) {
    weatherWidget.classList.add('weather--hidden');
    return;
  }

  weatherWidget.classList.remove('weather--hidden');
  weatherWidget.classList.add('weather--loading');

  try {
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=${currentLang}&format=json`,
    );
    const geoData = await geoRes.json();
    if (!geoData.results || geoData.results.length === 0) {
      weatherCity.textContent = city;
      weatherTemp.textContent = '—';
      weatherIcon.textContent = '🌍';
      weatherDesc.textContent = t('weather.cityNotFound');
      return;
    }

    const { latitude, longitude, name } = geoData.results[0];
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto`,
    );
    const weatherData = await weatherRes.json();

    const current = weatherData.current_weather;
    const code = current.weathercode;
    const wmo = WMO_CODES[code] || { icon: '🌡️', descKey: 'wmo.0' };

    weatherIcon.textContent = wmo.icon;
    weatherTemp.textContent = `${Math.round(current.temperature)}°C`;
    weatherCity.textContent = name;
    weatherDesc.textContent = t(wmo.descKey);
    updateScreensaverWeather();
  } catch {
    weatherIcon.textContent = '⚠️';
    weatherTemp.textContent = '—';
    weatherDesc.textContent = t('weather.loadError');
  } finally {
    weatherWidget.classList.remove('weather--loading');
  }
}

let screensaverTimer = null;
let screensaverVisible = false;

function getLocale() {
  return currentLang === 'ru' ? 'ru-RU' : 'en-US';
}

function updateScreensaverClock() {
  const now = new Date();
  const locale = getLocale();
  saTime.textContent = now.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
  saDate.textContent = now.toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'long' });
}

function updateScreensaverWeather() {
  const city = getCity();
  if (!city) {
    saWicon.textContent = '';
    saWtemp.textContent = '';
    saWcity.textContent = '';
    return;
  }
  const temp = weatherTemp.textContent;
  const icon = weatherIcon.textContent;
  const cityEl = weatherCity.textContent;
  saWicon.textContent = icon;
  saWtemp.textContent = temp;
  saWcity.textContent = cityEl || city;
}

function showScreensaver() {
  if (screensaverVisible) return;
  screensaverVisible = true;
  settingsPanel.classList.remove('settings-panel--open');
  if (focusZone === 'edit-modal') closeModal();
  updateScreensaverClock();
  updateScreensaverWeather();
  screensaver.classList.add('screensaver--visible');
}

function hideScreensaver() {
  if (!screensaverVisible) return;
  screensaverVisible = false;
  screensaver.classList.remove('screensaver--visible');
  resetIdleTimer();
}

function resetIdleTimer() {
  if (screensaverTimer) clearInterval(screensaverTimer);
  if (screensaverVisible) return;
  let idle = 0;
  screensaverTimer = setInterval(() => {
    idle++;
    if (idle >= 120) showScreensaver();
  }, 1000);
}

function onActivity() {
  if (screensaverVisible) {
    hideScreensaver();
    return;
  }
  if (screensaverTimer) clearInterval(screensaverTimer);
  resetIdleTimer();
}

function saveTiles() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tilesData));
}

// --- Render ---

function renderTiles() {
  tilesContainer.innerHTML = '';

  tilesData.forEach((tile, index) => {
    const btn = document.createElement('div');
    btn.className = `tile${index === cardIndex && focusZone === 'cards' ? ' tile--focused' : ''}`;
    btn.id = tile.id;
    btn.dataset.index = index;
    btn.role = 'listitem';
    btn.setAttribute('aria-label', tile.name);
    btn.tabIndex = -1;

    const poster = document.createElement('span');
    poster.className = 'tile__poster';
    poster.style.background = `linear-gradient(160deg, ${tile.color1} 0%, ${tile.color2} 100%)`;

    const text = document.createElement('span');
    text.className = 'tile__text';
    text.style.color = '#fff';
    text.textContent = tile.name;

    poster.appendChild(text);

    const actions = document.createElement('span');
    actions.className = 'tile__actions';

    const editBtn = document.createElement('button');
    editBtn.className = 'tile__action tile__action--edit';
    editBtn.setAttribute('aria-label', t('tile.edit'));
    editBtn.innerHTML = '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>';

    const delBtn = document.createElement('button');
    delBtn.className = 'tile__action tile__action--delete';
    delBtn.setAttribute('aria-label', t('tile.delete'));
    delBtn.innerHTML = '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M19 6.4L17.6 5 12 10.6 6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12z"/></svg>';

    if (!isLocked) {
      actions.appendChild(editBtn);
      actions.appendChild(delBtn);
    }

    const name = document.createElement('span');
    name.className = 'tile__name';
    name.textContent = tile.name;

    btn.appendChild(poster);
    btn.appendChild(actions);
    btn.appendChild(name);
    tilesContainer.appendChild(btn);

    editBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openEditModal(index);
    });

    delBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      deleteTile(index);
    });
  });

  addTileBtn.hidden = isLocked;
  updateCardRefs();
}

function updateCardRefs() {
  cards = Array.from(document.querySelectorAll('.tile'));

  cards.forEach((card) => {
    const origIdx = parseInt(card.dataset.index, 10);
    card.addEventListener('click', () => {
      focusZone = 'cards';
      setCardFocus(origIdx);
      activateCard(origIdx);
    });

    card.addEventListener('mouseenter', () => {
      if (focusZone !== 'edit-modal') {
        focusZone = 'cards';
        setCardFocus(origIdx);
      }
    });
    card.addEventListener('mouseleave', () => {
      if (focusZone === 'cards') {
        cards.forEach((c) => c.classList.remove('tile--focused'));
      }
    });
  });

  if (focusZone === 'cards') {
    const maxIdx = tilesData.length - 1;
    setCardFocus(Math.min(cardIndex, maxIdx));
  }
}



// --- Focus ---

function setCardFocus(index) {
  if (index < 0) index = 0;
  if (index >= tilesData.length) index = tilesData.length - 1;
  cardIndex = index;
  let matched = false;
  cards.forEach((card) => {
    const isMatch = parseInt(card.dataset.index, 10) === index;
    card.classList.toggle('tile--focused', isMatch);
    if (isMatch) matched = true;
  });
  if (!matched && cards.length > 0) {
    const fallback = parseInt(cards[0].dataset.index, 10);
    cardIndex = fallback;
    cards[0].classList.add('tile--focused');
  }
  shutdownBtn.classList.remove('power-btn--focused');
  addTileBtn.classList.remove('add-tile--focused');
}

function setAddTileFocus() {
  cards.forEach((card) => card.classList.remove('tile--focused'));
  shutdownBtn.classList.remove('power-btn--focused');
  addTileBtn.classList.add('add-tile--focused');
}

function setNavFocus(index) {
  navIndex = index;
  navButtons.forEach((btn, i) => {
    btn.classList.toggle('tool--focused', i === index);
  });
  shutdownBtn.classList.remove('power-btn--focused');
  addTileBtn.classList.remove('add-tile--focused');
}

function setShutdownFocus() {
  focusZone = 'shutdown';
  cards.forEach((card) => card.classList.remove('tile--focused'));
  navButtons.forEach((btn) => btn.classList.remove('tool--focused'));
  addTileBtn.classList.remove('add-tile--focused');
  shutdownBtn.classList.add('power-btn--focused');
}

function setSettingsFocus() {
  focusZone = 'settings-btn';
  cards.forEach((card) => card.classList.remove('tile--focused'));
  navButtons.forEach((btn) => btn.classList.remove('tool--focused'));
  addTileBtn.classList.remove('add-tile--focused');
  shutdownBtn.classList.remove('power-btn--focused');
  settingsBtn.classList.add('settings-btn--focused');
}

// --- Actions ---

function activateCard(index) {
  const tile = tilesData[index];
  if (!tile) return;

  if (tile.service) {
    window.tvBox.openService(tile.service);
  } else {
    window.tvBox.openUrl(tile.url);
  }
}

async function runAction(action) {
  switch (action) {
    case 'home':
      await window.tvBox.goHome();
      break;
    case 'back':
      await window.tvBox.goBack();
      break;
    case 'forward':
      await window.tvBox.goForward();
      break;
    case 'reload':
      await window.tvBox.reload();
      break;
    case 'close':
      await window.tvBox.closePage();
      break;
    case 'quit':
      await window.tvBox.quitApp();
      break;
    case 'shutdown':
      await window.tvBox.shutdown();
      break;
    case 'toggle-display':
      await window.tvBox.toggleDisplayMode();
      break;
    default:
      break;
  }
}

async function activateNav(index) {
  const btn = navButtons[index];
  if (btn.disabled) return;
  await runAction(navActions[index]);
}

// --- Confirm dialog ---

function showConfirm(message) {
  return new Promise((resolve) => {
    confirmText.textContent = message;
    confirmOverlay.classList.add('confirm-overlay--open');
    confirmOverlay.setAttribute('aria-hidden', 'false');
    confirmYes.focus();

    const prevFocus = focusZone;
    focusZone = 'confirm';

    function cleanup(result) {
      confirmOverlay.classList.remove('confirm-overlay--open');
      confirmOverlay.setAttribute('aria-hidden', 'true');
      confirmYes.removeEventListener('click', onYes);
      confirmNo.removeEventListener('click', onNo);
      confirmOverlay.removeEventListener('click', onOverlay);
      document.removeEventListener('keydown', onKey);
      focusZone = prevFocus;
      resolve(result);
    }

    function onYes() { cleanup(true); }
    function onNo() { cleanup(false); }
    function onOverlay(e) { if (e.target === confirmOverlay) cleanup(false); }
    function onKey(e) {
      if (e.key === 'Escape') { e.preventDefault(); cleanup(false); }
      if (e.key === 'Enter') { e.preventDefault(); cleanup(true); }
    }

    confirmYes.addEventListener('click', onYes);
    confirmNo.addEventListener('click', onNo);
    confirmOverlay.addEventListener('click', onOverlay);
    document.addEventListener('keydown', onKey);
  });
}

// --- CRUD ---

function openAddModal() {
  modalTitle.textContent = t('modal.add');
  editIdInput.value = '';
  inputName.value = '';
  inputUrl.value = '';
  inputColor1.value = '#ff4500';
  inputColor2.value = '#8b0000';
  modalDelete.hidden = true;
  populatePresets();
  selectPreset(-1);
  modalOverlay.classList.add('modal-overlay--open');
  modalOverlay.setAttribute('aria-hidden', 'false');
  focusZone = 'edit-modal';
  inputName.focus();
}

function openEditModal(index) {
  const tile = tilesData[index];
  if (!tile) return;

  modalTitle.textContent = t('modal.edit');
  editIdInput.value = index;
  inputName.value = tile.name;
  inputUrl.value = tile.url;
  inputColor1.value = tile.color1;
  inputColor2.value = tile.color2;
  modalDelete.hidden = false;
  populatePresets();
  const presetIdx = GRADIENT_PRESETS.findIndex(
    (p) => p.color1 === tile.color1 && p.color2 === tile.color2,
  );
  selectPreset(presetIdx);
  modalOverlay.classList.add('modal-overlay--open');
  modalOverlay.setAttribute('aria-hidden', 'false');
  focusZone = 'edit-modal';
  inputName.focus();
}

function closeModal() {
  modalOverlay.classList.remove('modal-overlay--open');
  modalOverlay.setAttribute('aria-hidden', 'true');
  focusZone = 'cards';
  if (cardIndex >= tilesData.length) {
    cardIndex = Math.max(0, tilesData.length - 1);
  }
  setCardFocus(Math.max(0, cardIndex));
}

function saveModalData() {
  const name = inputName.value.trim();
  const url = inputUrl.value.trim();
  const color1 = inputColor1.value;
  const color2 = inputColor2.value;

  if (!name || !url) return;

  const editIndex = editIdInput.value;
  const id = 'card-' + Date.now();

  const tileData = { id, name, url, color1, color2 };

  if (editIndex !== '') {
    const idx = parseInt(editIndex, 10);
    if (idx >= 0 && idx < tilesData.length) {
      tileData.id = tilesData[idx].id;
      if (tilesData[idx].service) {
        tileData.service = tilesData[idx].service;
      }
      tilesData[idx] = tileData;
    }
  } else {
    tilesData.push(tileData);
  }

  saveTiles();
  renderTiles();
  closeModal();
}

async function deleteTile(index) {
  if (index < 0 || index >= tilesData.length) return;

  const tile = tilesData[index];
  const confirmed = await showConfirm(t('modal.confirmDelete', { name: tile.name }));
  if (!confirmed) return;

  tilesData.splice(index, 1);
  if (cardIndex >= tilesData.length) {
    cardIndex = Math.max(0, tilesData.length - 1);
  }
  saveTiles();
  renderTiles();
  setCardFocus(Math.max(0, cardIndex));
}

function selectPreset(index) {
  const presets = document.querySelectorAll('.modal__preset');
  presets.forEach((p) => p.classList.remove('modal__preset--active'));
  if (index >= 0 && index < GRADIENT_PRESETS.length) {
    presets[index].classList.add('modal__preset--active');
    inputColor1.value = GRADIENT_PRESETS[index].color1;
    inputColor2.value = GRADIENT_PRESETS[index].color2;
  } else {
    const customPreset = document.querySelector('.modal__preset--custom');
    if (customPreset) customPreset.classList.add('modal__preset--active');
  }
}

function populatePresets() {
  presetGrid.innerHTML = '';
  GRADIENT_PRESETS.forEach((p, i) => {
    const btn = document.createElement('button');
    btn.className = 'modal__preset';
    btn.style.background = `linear-gradient(160deg, ${p.color1}, ${p.color2})`;
    btn.setAttribute('aria-label', t('preset.' + p.nameKey));
    btn.title = t('preset.' + p.nameKey);
    btn.addEventListener('click', () => selectPreset(i));
    presetGrid.appendChild(btn);
  });
  const customBtn = document.createElement('button');
  customBtn.className = 'modal__preset modal__preset--custom';
  customBtn.textContent = t('modal.custom');
  customBtn.setAttribute('aria-label', t('modal.customLabel'));
  customBtn.addEventListener('click', () => selectPreset(-1));
  presetGrid.appendChild(customBtn);
}

// --- Event listeners ---

addTileBtn.addEventListener('click', () => {
  focusZone = 'cards';
  openAddModal();
});

addTileBtn.addEventListener('mouseenter', () => {
  focusZone = 'add-tile';
  cards.forEach((card) => card.classList.remove('tile--focused'));
  shutdownBtn.classList.remove('power-btn--focused');
  addTileBtn.classList.add('add-tile--focused');
});

addTileBtn.addEventListener('mouseleave', () => {
  addTileBtn.classList.remove('add-tile--focused');
});

lockBtn.addEventListener('click', () => {
  isLocked = !isLocked;
  updateLockUI();
  saveLockState();
  renderTiles();
});

modalSave.addEventListener('click', saveModalData);

modalCancel.addEventListener('click', closeModal);

modalDelete.addEventListener('click', () => {
  const idx = parseInt(editIdInput.value, 10);
  if (!isNaN(idx) && idx >= 0 && idx < tilesData.length) {
    deleteTile(idx);
  }
});

modalForm.addEventListener('submit', (e) => {
  e.preventDefault();
  saveModalData();
});

modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) {
    closeModal();
  }
});

navButtons.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    focusZone = 'nav';
    setNavFocus(index);
    activateNav(index);
  });

  btn.addEventListener('mouseenter', () => {
    focusZone = 'nav';
    setNavFocus(index);
  });
  btn.addEventListener('mouseleave', () => {
    if (focusZone === 'nav') {
      navButtons.forEach((b) => b.classList.remove('tool--focused'));
    }
  });
});

shutdownBtn.addEventListener('click', () => {
  setShutdownFocus();
  runAction('shutdown');
});

shutdownBtn.addEventListener('mouseenter', () => {
  setShutdownFocus();
});

shutdownBtn.addEventListener('mouseleave', () => {
  shutdownBtn.classList.remove('power-btn--focused');
});

settingsBtn.addEventListener('click', () => {
  const isOpen = settingsPanel.classList.toggle('settings-panel--open');
  if (isOpen) {
    focusZone = 'settings-btn';
    setSettingsFocus();
    settingsName.value = getUsername();
    settingsCity.value = getCity();
    settingsName.focus();
  }
});

settingsBtn.addEventListener('mouseenter', () => {
  setSettingsFocus();
});

settingsBtn.addEventListener('mouseleave', () => {
  settingsBtn.classList.remove('settings-btn--focused');
});

const btnLang = document.getElementById('btn-lang');
btnLang.addEventListener('click', () => {
  setLanguage(currentLang === 'ru' ? 'en' : 'ru');
});

const settingsQuit = document.getElementById('btn-settings-quit');
settingsQuit.addEventListener('click', () => {
  settingsPanel.classList.remove('settings-panel--open');
  runAction('quit');
});

settingsDone.addEventListener('click', () => {
  const prevCity = getCity();
  saveUsername(settingsName.value);
  saveCity(settingsCity.value);
  settingsPanel.classList.remove('settings-panel--open');
  updateHomeGreeting();
  if (getCity() !== prevCity) fetchWeather();
  focusZone = 'settings-btn';
  setSettingsFocus();
  settingsBtn.focus();
});

settingsDisplay.addEventListener('click', () => {
  window.tvBox.toggleDisplayMode();
});

settingsName.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    settingsCity.focus();
  }
  if (e.key === 'Escape') {
    settingsDone.click();
  }
});

settingsCity.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    settingsDone.click();
  }
  if (e.key === 'Escape') {
    settingsDone.click();
  }
});

inputColor1.addEventListener('input', () => selectPreset(-1));
inputColor2.addEventListener('input', () => selectPreset(-1));

settingsTest.addEventListener('click', () => {
  settingsPanel.classList.remove('settings-panel--open');
  showScreensaver();
});

['mousemove', 'mousedown', 'keydown', 'wheel', 'touchstart'].forEach((ev) => {
  document.addEventListener(ev, onActivity);
});

// --- Keyboard navigation ---

document.addEventListener('keydown', (event) => {
  const { key } = event;

  if (screensaverVisible) {
    event.preventDefault();
    return;
  }

  if (focusZone === 'edit-modal') {
    if (key === 'Escape') {
      event.preventDefault();
      closeModal();
    }
    return;
  }

  if (focusZone === 'confirm') {
    return;
  }

  if (key === 'Escape' && settingsPanel.classList.contains('settings-panel--open')) {
    settingsPanel.classList.remove('settings-panel--open');
    setSettingsFocus();
    settingsBtn.focus();
    return;
  }

  if (focusZone === 'cards') {
    if (key === 'ArrowRight') {
      event.preventDefault();
      if (cardIndex < tilesData.length - 1) {
        setCardFocus(cardIndex + 1);
      }
    } else if (key === 'ArrowLeft') {
      event.preventDefault();
      if (cardIndex > 0) {
        setCardFocus(cardIndex - 1);
      }
    } else if (key === 'ArrowDown') {
      event.preventDefault();
      if (cardIndex === tilesData.length - 1) {
        setAddTileFocus();
        focusZone = 'add-tile';
      } else {
        setShutdownFocus();
      }
    } else if (key === 'ArrowUp') {
    } else if (key === 'Enter') {
      event.preventDefault();
      if (cardIndex >= 0 && cardIndex < tilesData.length) {
        activateCard(cardIndex);
      }
    }
  } else if (focusZone === 'add-tile') {
    if (key === 'ArrowRight') {
      event.preventDefault();
      setShutdownFocus();
    } else if (key === 'ArrowLeft') {
      event.preventDefault();
      if (cards.length > 0) {
        focusZone = 'cards';
        setCardFocus(tilesData.length - 1);
      }
    } else if (key === 'ArrowDown') {
      event.preventDefault();
      setShutdownFocus();
    } else if (key === 'ArrowUp') {
      event.preventDefault();
      if (cards.length > 0) {
        focusZone = 'cards';
        setCardFocus(tilesData.length - 1);
      }
    } else if (key === 'Enter') {
      event.preventDefault();
      openAddModal();
    }
  } else if (focusZone === 'shutdown') {
    if (key === 'ArrowRight') {
      event.preventDefault();
      focusZone = 'settings-btn';
      setSettingsFocus();
    } else if (key === 'ArrowLeft') {
      event.preventDefault();
      if (cards.length > 0) {
        focusZone = 'cards';
        setCardFocus(tilesData.length - 1);
      } else {
        focusZone = 'add-tile';
        setAddTileFocus();
      }
    } else if (key === 'ArrowUp') {
      event.preventDefault();
      if (!homeScreen.classList.contains('home--hidden')) {
        if (tilesData.length > 0) {
          focusZone = 'cards';
          setCardFocus(cardIndex);
        } else {
          focusZone = 'add-tile';
          setAddTileFocus();
        }
      }
    } else if (key === 'Enter') {
      event.preventDefault();
      runAction('shutdown');
    }
  } else if (focusZone === 'settings-btn') {
    if (key === 'ArrowRight') {
      event.preventDefault();
      focusZone = 'nav';
      setNavFocus(0);
    } else if (key === 'ArrowLeft') {
      event.preventDefault();
      setShutdownFocus();
    } else if (key === 'ArrowUp') {
      event.preventDefault();
      if (!homeScreen.classList.contains('home--hidden')) {
        if (tilesData.length > 0) {
          focusZone = 'cards';
          setCardFocus(cardIndex);
        } else {
          focusZone = 'add-tile';
          setAddTileFocus();
        }
      }
    } else if (key === 'Enter') {
      event.preventDefault();
      settingsBtn.click();
    }
  } else if (focusZone === 'nav') {
    if (key === 'ArrowRight') {
      event.preventDefault();
      setNavFocus((navIndex + 1) % navButtons.length);
    } else if (key === 'ArrowLeft') {
      event.preventDefault();
      if (navIndex === 0) {
        setSettingsFocus();
      } else {
        setNavFocus(navIndex - 1);
      }
    } else if (key === 'Enter') {
      event.preventDefault();
      activateNav(navIndex);
    } else if (key === 'ArrowUp') {
      event.preventDefault();
      if (!homeScreen.classList.contains('home--hidden')) {
        if (tilesData.length > 0) {
          focusZone = 'cards';
          setCardFocus(cardIndex);
        } else {
          focusZone = 'add-tile';
          setAddTileFocus();
        }
      }
    }
  }
});

// --- IPC listeners ---

window.tvBox.onShowHome(() => {
  homeScreen.classList.remove('home--hidden');
  focusZone = 'cards';
  setCardFocus(cardIndex);
});

window.tvBox.onHideHome(() => {
  homeScreen.classList.add('home--hidden');
  focusZone = 'nav';
  setNavFocus(0);
});

window.tvBox.onBrowserStateChanged(updateBrowserNavState);
window.tvBox.onDisplayModeChanged(updateDisplayMode);
window.tvBox.getBrowserState().then(updateBrowserNavState);
window.tvBox.getDisplayMode().then(updateDisplayMode);

// --- UI helpers ---

function updateDisplayMode(state) {
  displayFullscreen = state.fullscreen;
  const fullscreen = displayFullscreen;
  displayLabel.textContent = fullscreen ? t('display.window') : t('display.fullscreen');
  displayIconFull.hidden = !fullscreen;
  displayIconWindow.hidden = fullscreen;
  settingsDisplay.setAttribute(
    'aria-label',
    fullscreen ? t('display.switchWindow') : t('display.switchFullscreen'),
  );
}

function updateBrowserNavState(state) {
  document.getElementById('nav-back').disabled = !state.isOpen || !state.canGoBack;
  document.getElementById('nav-forward').disabled = !state.isOpen || !state.canGoForward;
  document.getElementById('nav-reload').disabled = !state.isOpen;
  document.getElementById('nav-close').disabled = !state.isOpen;
}

function updateClock() {
  const now = new Date();
  const locale = getLocale();
  clockEl.textContent = now.toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
  });
  homeDate.textContent = now.toLocaleDateString(locale, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
  updateScreensaverClock();
}

// --- Init ---

currentLang = localStorage.getItem(LANG_KEY) || 'ru';

loadTiles();
loadLockState();
renderTiles();
setCardFocus(0);
updateHomeGreeting();
updateClock();
applyTranslations();
setInterval(updateClock, 10000);
fetchWeather();
setInterval(fetchWeather, 1800000);
showGreeting();
resetIdleTimer();
