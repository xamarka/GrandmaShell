# GrandmaShell

**Smart TV interface for elderly users — Electron app for Linux**

**Простой Smart TV интерфейс для пожилых людей — Electron-приложение для Linux**

---

## English

### Overview

GrandmaShell (formerly TV Box) is an Electron application that turns an old laptop or mini-PC into a simple, elderly-friendly Smart TV. After booting, the app launches automatically in fullscreen mode — the user sees only large, colorful tiles with services like YouTube and Kinopoisk, without the Linux desktop.

Created by **Xamarka**.

### Features

- **Fullscreen kiosk mode** — no window chrome, no desktop, no distractions
- **Home screen** with large clickable tiles (YouTube, Kinopoisk, VK Video, Google, custom)
- **Built-in browser** based on Electron `WebContentsView` — browse any website inside the app
- **Navigation toolbar**: Home, Back, Forward, Reload, Close, Quit
- **Lock mode**: lock tiles to prevent accidental edits or deletion (hides edit/delete buttons and the "Add tile" button)
- **Settings panel**: configure user name, city (for weather), display mode, lock, and language
- **Weather widget**: automatic weather display via Open-Meteo API (free, no API key required)
- **Fullscreen greeting overlay**: shows "Good morning, {name}!" with GrandmaShell branding on startup
- **Screensaver**: after 2 minutes of inactivity, shows a large clock + weather; click or press any key to dismiss
- **Dark theme** in Android TV / Google TV style
- **Bilingual interface**: Russian and English, switchable on-the-fly in settings (no restart needed)
- **Remote control**: navigate with arrow keys + Enter, mouse, or touch
- **Gradient presets**: 10 built-in gradients + custom color picker for tile backgrounds
- **Autostart** via `.desktop` file for Linux
- **Auto-shutdown**: dedicated shutdown button calls `systemctl poweroff`

### Requirements

- Linux (Ubuntu, Debian, Fedora, etc.)
- Node.js 18+ and npm
- An old laptop or mini-PC (works great on 4GB RAM machines)

### Installation

```bash
# Clone or copy the project
cd grandmashell

# Install dependencies
npm install
```

### Running

```bash
npm start
```

The app opens in fullscreen mode. Press `Alt+F4` to close during development.

### Building a distributable

```bash
npm run build
```

Build output goes to `dist/`:
- `GrandmaShell-x.x.x.AppImage` — portable image
- `grandmashell_x.x.x_amd64.deb` — Debian/Ubuntu package

#### Install from .deb

```bash
sudo dpkg -i dist/grandmashell_*.deb
sudo apt-get install -f
```

#### Install AppImage

```bash
chmod +x dist/GrandmaShell-*.AppImage
sudo mkdir -p /opt/grandmashell
sudo cp dist/GrandmaShell-*.AppImage /opt/grandmashell/grandmashell
```

### Configuration

#### User name
Set in Settings → Name. Used in the greeting overlay ("Good morning, {name}!") and home screen ("What are we watching, {name}?").

#### City for weather
Set in Settings → City. Uses Open-Meteo geocoding + weather APIs. Weather updates every 30 minutes. Leave empty to hide the weather widget.

#### Language
Switch between Russian and English in Settings → Language. All interface strings update immediately without a page reload.

#### Lock mode
Enable in Settings → Tiles → Lock. When locked:
- Edit and delete buttons on tiles are hidden
- "Add tile" button is hidden
- Lock button turns green

### Autostart (Linux)

#### User autostart

```bash
mkdir -p ~/.config/autostart
cp autostart/tv-box.desktop ~/.config/autostart/
```

Edit the `Exec=` path if the app is installed elsewhere:
```ini
Exec=/opt/grandmashell/grandmashell
```

#### System-wide autostart

```bash
sudo cp autostart/tv-box.desktop /etc/xdg/autostart/
```

#### Full kiosk mode (no desktop)

For a pure "TV-only" experience, configure auto-login and a minimal environment:

**1. Auto-login (Ubuntu/GDM):**
```bash
sudo nano /etc/gdm3/custom.conf
```
Uncomment and set:
```ini
[daemon]
AutomaticLoginEnable=true
AutomaticLogin=username
```

**2. Disable taskbar (GNOME):**
```bash
gsettings set org.gnome.shell.extensions.dash-to-dock autohide true
gsettings set org.gnome.shell.extensions.dash-to-dock dock-fixed false
```

**3. Hide cursor on idle (optional):**
```bash
sudo apt install unclutter
echo "unclutter -idle 3 &" >> ~/.profile
```

**4. Run only GrandmaShell (no desktop):**
Create `~/.xsession`:
```bash
#!/bin/bash
exec /opt/grandmashell/grandmashell
```

### Remote assistance with RustDesk

RustDesk allows family members to remotely help with setup.

#### Install RustDesk

```bash
# Ubuntu/Debian
wget https://github.com/rustdesk/rustdesk/releases/download/1.3.6/rustdesk-1.3.6-x86_64.deb
sudo dpkg -i rustdesk-*.deb
sudo apt-get install -f
```

Or from the official site: https://rustdesk.com

#### Custom server (optional)

In RustDesk settings → Network → ID/Relay Server, enter your server address and key.

#### Autostart RustDesk

```bash
# Enable RustDesk service
sudo systemctl enable rustdesk
sudo systemctl start rustdesk
```

Or add alongside GrandmaShell:
```bash
cp /usr/share/applications/rustdesk.desktop ~/.config/autostart/
```

#### Tips for the elderly user

1. Write down the **ID** and **password** on a sticky note next to the laptop
2. Set a **permanent password** in RustDesk (Settings → Security → Set permanent password)
3. Enable **autostart** so help is always available after reboot
4. GrandmaShell and RustDesk work simultaneously — RustDesk minimizes to tray

### Usage

#### Home screen
- **Tiles**: large cards with service names and gradient backgrounds. Click to open.
- **Add tile**: click the "Add" button to add a custom website tile (name, URL, gradient colors).
- **Edit/Delete**: hover over a tile to reveal edit and delete buttons (when unlocked).

#### Adding / editing a tile
1. Click "Add tile" or the edit icon on an existing tile
2. Fill in: Name, URL, Color 1, Color 2
3. Pick a gradient preset or use the color pickers
4. Click Save

#### Settings
Click the gear icon (bottom-right) to open settings:
- **Name**: your preferred name
- **City**: your city for weather
- **Display mode**: toggle fullscreen/windowed
- **Tiles**: lock/unlock tile editing
- **Language**: switch between Russian and English

#### Screensaver
After 2 minutes of inactivity, the screensaver activates showing a large clock and weather. Move the mouse or press any key to return.

### Controls

| Action | Keyboard | Mouse |
|--------|----------|-------|
| Navigate tiles | ← → | Hover + click |
| Open tile | Enter (on focused tile) | Click |
| Go to shutdown | ↓ (from last tile) | Click shutdown button |
| Go to settings | → (from shutdown) | Click gear icon |
| Go to toolbar | → (from settings) | — |
| Navigate toolbar | ← → | Hover + click |
| Go back to tiles | ↑ (from anywhere) | — |
| Activate toolbar button | Enter | Click |
| Escape | Close settings / modal | — |

### Project structure

```
grandmashell/
├── main.js                 # Electron main process
├── preload.js              # IPC bridge between main & renderer
├── package.json
├── autostart/
│   └── tv-box.desktop      # Linux autostart file
├── renderer/
│   ├── index.html          # UI: home screen, toolbar, settings, modal, screensaver
│   ├── style.css           # Dark theme styles (Android TV inspired)
│   └── app.js              # All UI logic: tiles, navigation, weather, i18n, screensaver
└── README.md
```

### Technical details

- **Browser engine**: Electron `WebContentsView` (modern multi-window API)
- **State persistence**: `localStorage` (tiles, lock state, user name, city, language)
- **Weather**: Open-Meteo free API (geocoding + forecast), updates every 30 min
- **Screensaver idle timer**: 120 seconds of no activity
- **Internationalization**: custom `LANG` object with `ru`/`en` pairs, `data-i18n` attributes in HTML
- **Fullscreen toggling**: Electron `setFullScreen()` via IPC
- **Auto-shutdown**: calls `systemctl poweroff` via `exec()`
- **No frameworks**: pure vanilla JavaScript, HTML, CSS

### Development

```bash
# Run in development
npm start

# Build for Linux
npm run build
```

### License

MIT

---

## Русский

### Обзор

GrandmaShell (ранее TV Box) — это Electron-приложение, которое превращает старый ноутбук или мини-ПК в простую Smart TV-приставку для пожилого человека. После включения компьютера приложение автоматически запускается в полноэкранном режиме — пользователь видит только крупные красочные плитки с сервисами (YouTube, Кинопоиск и другие), без рабочего стола Linux.

Создатель: **Xamarka**.

### Возможности

- **Полноэкранный киоск-режим** — без окон, без рабочего стола, без отвлечений
- **Главный экран** с крупными плитками (YouTube, Кинопоиск, VK Видео, Google, свои)
- **Встроенный браузер** на базе Electron `WebContentsView` — просмотр любых сайтов внутри приложения
- **Панель навигации**: Главная, Назад, Вперёд, Обновить, Закрыть, Выход
- **Режим блокировки**: защита от случайного редактирования — скрываются кнопки правки/удаления и кнопка «Добавить плитку»
- **Настройки**: имя пользователя, город (погода), режим экрана, блокировка, язык
- **Виджет погоды**: автоматический показ погоды через Open-Meteo API (бесплатно, без ключа)
- **Заставка**: через 2 минуты бездействия показывает крупные часы и погоду; любое движение мыши или нажатие клавиши возвращает экран
- **Приветствие при запуске**: «Доброе утро, {name}!» с брендированием GrandmaShell
- **Тёмная тема** в стиле Android TV / Google TV
- **Два языка интерфейса**: русский и английский, переключение в настройках без перезагрузки
- **Управление**: стрелки + Enter, мышь, сенсор
- **Готовые градиенты**: 10 пресетов + собственный выбор цветов для фона плиток
- **Автозапуск** через `.desktop` файл в Linux
- **Выключение компьютера**: кнопка вызова `systemctl poweroff`

### Требования

- Linux (Ubuntu, Debian, Fedora и другие)
- Node.js 18+ и npm
- Старый ноутбук или мини-ПК (работает на 4 ГБ ОЗУ)

### Установка

```bash
# Клонировать или скопировать проект
cd grandmashell

# Установить зависимости
npm install
```

### Запуск

```bash
npm start
```

Приложение открывается в полноэкранном режиме. Для выхода в разработке нажмите `Alt+F4`.

### Сборка дистрибутива

```bash
npm run build
```

Собранные файлы в папке `dist/`:
- `GrandmaShell-x.x.x.AppImage` — переносимый образ
- `grandmashell_x.x.x_amd64.deb` — пакет для Debian/Ubuntu

#### Установка из .deb

```bash
sudo dpkg -i dist/grandmashell_*.deb
sudo apt-get install -f
```

#### Установка AppImage

```bash
chmod +x dist/GrandmaShell-*.AppImage
sudo mkdir -p /opt/grandmashell
sudo cp dist/GrandmaShell-*.AppImage /opt/grandmashell/grandmashell
```

### Настройка

#### Имя пользователя
Укажите в Настройки → Имя. Используется в приветствии («Доброе утро, {name}!») и на главном экране («Что смотрим, {name}?»).

#### Город для погоды
Укажите в Настройки → Город. Используется Open-Meteo геокодинг + прогноз. Погода обновляется каждые 30 минут. Оставьте пустым, чтобы скрыть виджет погоды.

#### Язык
Переключается в Настройки → Язык / Language. Все строки интерфейса обновляются мгновенно, без перезагрузки страницы.

#### Блокировка плиток
Включите в Настройки → Плитки → Заблокировано. При блокировке:
- Кнопки редактирования и удаления на плитках скрываются
- Кнопка «Добавить плитку» скрывается
- Кнопка блокировки подсвечивается зелёным

### Автозапуск в Linux

#### Пользовательский автозапуск

```bash
mkdir -p ~/.config/autostart
cp autostart/tv-box.desktop ~/.config/autostart/
```

Отредактируйте путь `Exec=`, если приложение установлено в другом месте:
```ini
Exec=/opt/grandmashell/grandmashell
```

#### Системный автозапуск

```bash
sudo cp autostart/tv-box.desktop /etc/xdg/autostart/
```

#### Полный киоск-режим (без рабочего стола)

**1. Автологин (Ubuntu/GDM):**
```bash
sudo nano /etc/gdm3/custom.conf
```
Раскомментируйте и настройте:
```ini
[daemon]
AutomaticLoginEnable=true
AutomaticLogin=имя_пользователя
```

**2. Отключение панели задач (GNOME):**
```bash
gsettings set org.gnome.shell.extensions.dash-to-dock autohide true
gsettings set org.gnome.shell.extensions.dash-to-dock dock-fixed false
```

**3. Скрытие курсора (опционально):**
```bash
sudo apt install unclutter
echo "unclutter -idle 3 &" >> ~/.profile
```

**4. Запуск только GrandmaShell:**
Создайте `~/.xsession`:
```bash
#!/bin/bash
exec /opt/grandmashell/grandmashell
```

### Удалённая помощь через RustDesk

RustDesk позволяет родственникам удалённо помогать с настройкой приставки.

#### Установка RustDesk

```bash
# Ubuntu/Debian
wget https://github.com/rustdesk/rustdesk/releases/download/1.3.6/rustdesk-1.3.6-x86_64.deb
sudo dpkg -i rustdesk-*.deb
sudo apt-get install -f
```

Или с официального сайта: https://rustdesk.com

#### Собственный сервер (опционально)

В настройках RustDesk → Сеть → ID/Relay Server укажите адрес вашего сервера и ключ.

#### Автозапуск RustDesk

```bash
sudo systemctl enable rustdesk
sudo systemctl start rustdesk
```

Или добавьте в автозапуск рядом с GrandmaShell:
```bash
cp /usr/share/applications/rustdesk.desktop ~/.config/autostart/
```

#### Рекомендации для пожилого пользователя

1. Запишите **ID** и **пароль** RustDesk на бумажке рядом с ноутбуком
2. Установите **постоянный пароль** (Настройки → Безопасность → Постоянный пароль)
3. Включите **автозапуск** RustDesk, чтобы помощь была доступна после перезагрузки
4. GrandmaShell и RustDesk работают одновременно — RustDesk сворачивается в трей

### Использование

#### Главный экран
- **Плитки**: крупные карточки с названием сервиса и градиентным фоном. Нажмите, чтобы открыть.
- **Добавить плитку**: нажмите кнопку «Добавить», чтобы создать свою плитку (название, URL, цвета градиента).
- **Редактирование/удаление**: наведите на плитку — появятся кнопки редактирования и удаления (если не заблокировано).

#### Добавление / редактирование плитки
1. Нажмите «Добавить плитку» или иконку редактирования на существующей плитке
2. Заполните: Название, URL, Цвет 1, Цвет 2
3. Выберите готовый градиент или используйте палитру
4. Нажмите «Сохранить»

#### Настройки
Нажмите на иконку шестерёнки (справа внизу):
- **Имя**: ваше имя для приветствия
- **Город**: ваш город для погоды
- **Режим экрана**: переключение полноэкранного/оконного режима
- **Плитки**: блокировка/разблокировка редактирования
- **Язык / Language**: переключение между русским и английским

#### Заставка
После 2 минут бездействия появляются крупные часы и погода. Пошевелите мышью или нажмите любую клавишу, чтобы вернуться.

### Управление

| Действие | Клавиши | Мышь |
|----------|---------|------|
| Навигация по плиткам | ← → | Наведение + клик |
| Открыть плитку | Enter (на фокусе) | Клик |
| Переход к выключению | ↓ (с последней плитки) | Кнопка выключения |
| Переход к настройкам | → (с выключения) | Иконка шестерёнки |
| Переход к панели навигации | → (с настроек) | — |
| Навигация по панели | ← → | Наведение + клик |
| Возврат к плиткам | ↑ (откуда угодно) | — |
| Активировать кнопку | Enter | Клик |
| Escape | Закрыть настройки / модалку | — |

### Структура проекта

```
grandmashell/
├── main.js                 # Главный процесс Electron
├── preload.js              # IPC-мост между процессами
├── package.json
├── autostart/
│   └── tv-box.desktop      # Файл автозапуска Linux
├── renderer/
│   ├── index.html          # UI: главный экран, панель, настройки, модалка, заставка
│   ├── style.css           # Тёмная тема (в стиле Android TV)
│   └── app.js              # Логика: плитки, навигация, погода, i18n, заставка
└── README.md
```

### Технические детали

- **Браузерный движок**: Electron `WebContentsView` (современный API)
- **Сохранение состояния**: `localStorage` (плитки, блокировка, имя, город, язык)
- **Погода**: Open-Meteo бесплатно (геокодинг + прогноз), обновление каждые 30 мин
- **Таймер заставки**: 120 секунд бездействия
- **Интернационализация**: объект `LANG` с парами `ru`/`en`, атрибуты `data-i18n` в HTML
- **Переключение полноэкранного режима**: Electron `setFullScreen()` через IPC
- **Выключение**: вызов `systemctl poweroff` через `exec()`
- **Без фреймворков**: чистый JavaScript, HTML, CSS

### Разработка

```bash
# Запуск в разработке
npm start

# Сборка для Linux
npm run build
```

### Лицензия

MIT
"# GrandmaShell" 
