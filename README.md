# AzaNews

ссылка на сайт - https://azanews.vercel.app/

ВОЗМОЖНО ЛЕНТА НОВОСТЕЙ НЕ БУДЕТ ВИДНА ВАМ, ЭТО НЕ ИЗ-ЗА ОШИБКИ В КОДЕ. ЭТО ЛИШЬ ПОТОМУ ЧТО ВОЗМОЖНО ЗАКОНЧИЛСЯ ПРОБНЫЙ ПЕРИОД API ключ. Нужно будет максимум заменить ключ API, мое задание выполнено на все ваши требования. На видео обзоре видна лента новостей и все работает.


AzaNews — новостное веб-приложение с минималистичным дизайном в духе Tengrinews, адаптированное под быстрый просмотр и фильтрацию новостей по категориям.

## Установка и запуск

1. Клонировать репозиторий:
   ```bash
   git clone https://github.com/yourusername/azanews.git
   cd azanews


npm install

npm start

Проектирование и разработка
Основная цель — создать чистый и удобный интерфейс, не перегруженный деталями. Идея возникла на фоне новостных сайтов, где слишком много отвлекающих элементов. Здесь весь акцент сделан на контент.

Используется NewsAPI.org для получения актуальных новостей. Вся фильтрация и поиск происходят на фронте. Интерфейс построен по принципам SPA.

Подходы и особенности
Сохранение состояния поиска и выбранной категории между сессиями

Реализация skeleton-загрузки и спиннеров, чтобы пользователь не видел пустую страницу

Кликабельна вся карточка, а не только кнопка

Минималистичный стиль, типографика адаптирована под новости

Компромиссы
Нет backend — всё работает на фронте. Это ограничивает функциональность, например, невозможность сохранять избранное или кешировать запросы.

Вместо бесконечной прокрутки реализована ручная подгрузка новостей через кнопку.

NewsAPI имеет ограничения по количеству запросов, поэтому стоит учитывать лимиты.

Известные проблемы
Некоторые статьи приходят без изображений, что может нарушать вёрстку

Поиск работает только по заголовкам, не по описанию

Нет обработки сетевых ошибок (например, при потере интернета)

Почему выбран такой стек
React — быстрый старт, простой способ собрать SPA

CSS — без фреймворков, чтобы сохранить контроль над внешним видом

NewsAPI — простой способ получить актуальные новости без авторизации пользователей

Что можно улучшить в будущем
Подключить OpenAI или другой LLM для генерации кратких аннотаций

Реализовать “Объясни простыми словами” под каждой новостью

Добавить утренний дайджест и умный поиск по темам
