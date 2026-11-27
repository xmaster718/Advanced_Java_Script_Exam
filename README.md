# Проверка пароля по базе утечек

Мини-проект по предмету «Advanced JavaScript», Тема 5: проверка пароля по базе утечек без раскрытия пароля.

🔗 **Демо:** https://ВАШ-ЛОГИН.github.io/ИМЯ-РЕПОЗИТОРИЯ/

## Что проверяет проект
Попал ли пароль в известные утечки. Используется приём **k-anonymity**:
1. Браузер считает SHA-1 пароля (`crypto.subtle.digest`).
2. На сервер Pwned Passwords уходят только первые 5 символов хеша.
3. Сервер возвращает список всех хешей с таким префиксом и числом утечек.
4. Остаток хеша сравнивается локально в браузере.

Пароль и полный хеш никуда не отправляются. Приложение показывает, что именно ушло на сервер, и объясняет, почему 5 символов не позволяют восстановить пароль.

## Стек
React 18 + Vite. Компоненты: `PasswordForm`, `ResultCard`, `ServerRequestInfo`, `HashList`. Данные: `fetch` в `useEffect` с состояниями loading / error / empty.

## Запуск
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # сборка в dist/
npm run preview  # проверка сборки
```
Открывать через `localhost` или https: на `file://` `crypto.subtle` не работает.

## Публикация
GitHub Pages через GitHub Actions (`.github/workflows/deploy.yml`). В `vite.config.js` задан `base: './'`.

## Источник данных
API [Pwned Passwords](https://haveibeenpwned.com/API/v3#PwnedPasswords) — открытый, ключ не нужен. Секреты и `localStorage` в проекте не используются.
