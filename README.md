# settime

Точное время онлайн. Фронтенд [settime.ru](https://settime.ru): сверяет часы устройства с эталонным временем по WebSocket.

API: [github.com/teplostanski/api.settime.ru](https://github.com/teplostanski/api.settime.ru)

![Скриншот](./screen.webp)

## Возможности

- синхронизация времени через WebSocket
- отображение расхождения с системными часами
- выбор часового пояса
- словесное время по-русски
- PWA

## Стек

React 19, TypeScript, Vite, Redux Toolkit, dayjs, Zod, WebSocket

## Запуск

```bash
npm install
npm run dev
```

По умолчанию приложение подключается к WebSocket API на `ws://localhost:8080/ws`. Для работы нужен backend из репозитория [api.settime.ru](https://github.com/teplostanski/api.settime.ru):

```bash
git clone https://github.com/teplostanski/api.settime.ru.git
cd api.settime.ru
npm install
npm run dev
```

## Переменные окружения

`VITE_WS_URL` задаёт адрес WebSocket API.

В режиме разработки используется `ws://localhost:8080/ws` из `src/shared/config/time-server.ts`. Другой адрес можно указать в `.env.development` (см. `.env.example`).

Для Github Pages нужно указать `VITE_WS_URL` в Settings -> Environments -> github-pages -> Environment variables.

## Сборка

```bash
npm run build
npm run preview
```

## Линт

```bash
npm run lint
```

## Связанные репозитории

| Репозиторий                                                                              | Описание        |
| ---------------------------------------------------------------------------------------- | --------------- |
| [github.com/teplostanski/api.settime.ru](https://github.com/teplostanski/api.settime.ru) | WebSocket + NTP |

<br>

[![Donate](https://img.shields.io/static/v1?label=donate&message=teplostanski.me&color=4F46E5)](https://donate.teplostanski.me)
