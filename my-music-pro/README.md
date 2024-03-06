## Курсовая работа:

### Планируемое время на выполнение задания: 30 часов

### Фактическое время выполнения: 40 часов

## Чек-лист для тестирования:

- Работает вход, выход и регистрация:

  - Пользователь считается авторизованным, если у него в Local Storage по ключу user лежит непустое значение.
  - Если пользователь не авторизован, то при попытке перехода на защищенные страницы (главная, категория, «Мои треки») его редиректит на страницу /login.
    Пользователь может зарегистрироваться в приложении.
  - Если не заполнена почта или пароль, то после клика на «Зарегистрироваться» отображается сообщение об ошибке «Укажите почту/пароль», запрос в API не происходит.
  - Если введенные пароли не совпадают, то после клика на «Зарегистрироваться» отображается сообщение об ошибке «Пароли не совпадают», запрос в API не происходит.
  - Если пользователь указал неверные данные, то после клика на «Зарегистрироваться» отображается ошибка от API, например «Пользователь с таким именем уже существует».
  - На время запроса кнопка «Зарегистрироваться» блокируется.
  - Если запрос на авторизацию выполнился успешно, пользователь попадает на форму входа.
  - Если запрос на авторизацию выполнился успешно, пользователь попадает на «Главную» в режиме «Авторизованный пользователь».
  - На время запроса кнопка «Войти» блокируется.
  - В правом верхнем углу приложения отображается username текущего пользователя.
  - После обновления страницы приложение остается в режиме «Авторизованный пользователь», данные о текущем пользователе хранятся в Local Storage.
  - Приложение остается в режиме «Авторизованный пользователь» до тех пор, пока пользователь явно не сделает выход.
  - При клике на иконку выхода в правом верхнем углу приложения происходит переход в режим «Неавторизованный пользователь».
  - При клике на кнопку «Выйти» в левом меню приложения происходит переход в режим «Неавторизованный пользователь».
  - Приложение работает в режиме «Неавторизованный пользователь».
  - Неавторизованному пользователю доступны только страницы входа и регистрации.
  - При попытке перейти на страницы, доступные только для авторизованного пользователя, происходит редирект на страницу входа.

- Работает страница "Главное"
- Работает поиск и фильтрация на странице "Главное":

  - При клике на фильтр (исполнитель, год, жанр) открываются всплывающие окна, при повторном клике на тот же фильтр окно закрывается.
  - Одновременно можно открыть только один фильтр, при клике на другой фильтр старый (открытый) закрывается.
  - Кнопка с фильтром показывает цветом активное и неактивное состояние.
  - Когда выбран фильтр или сортировка отображается фиолетовый кружок с количеством выбранных элементов
  - Когда выбран фильтр, в списке отображаются только треки выбранного исполнителя\жанра
  - Когда выбрана сортировка, треки в списке сортируются по возрастанию\убыванию даты релиза
  - Если в поиске введено значение, то в списке отображаются только треки, в названии которых есть введенное значение

- Работает механика лайков (снять и поставить лайк) и страница "Мой плейлист":

  - Сердечко закрашивается.
  - Трек появляется/удаляется на странице «Мои треки».
  - Лайкнутый трек сохраняется/удаляется в API, то есть если пользователь авторизуется в приложении на другом устройстве, то увидит треки, которые он лайкал.

- Работают переходы на страницы с подборками и сами страницы с подборками, при переходах между страницами музыка не прекращает играть:

  - Клик по баннеру открывает соовтетствующую страницу с подборкой
  - Плейлист на странице подборок работает также, как и на других страницах: можно включать треки, ставить лайки etc.
  - Плейлист должен сохраняться при переходе между страницами: если нажать «Следующий трек» — включится следующая песня из плейлиста, который изначально включали.

- На всех страницах с треками можно выбрать трек и начнется воспроизведение трека:

  - При клике на название трека в списке трек начинает воспроизводиться
  - После того как заканчивается текущий трек, включается следующий трек из текущего плейлиста

- Работает ручное переключение треков назад и вперед кнопками
- Работает функция "перемешать треки"

- Работает управление воспроизведением: play, pause, громкость и зацикливание:

  - При клике на кнопку Pause воспроизведение трека останавливается, кнопка меняется на кнопку Play.
  - При клике на кнопку Play воспроизведение трека продолжается, кнопка меняется на кнопку Pause.
  - Работает механика «повтор трека»:
    - если повтор включен, то кнопка Loop светится белым, при клике на нее повтор трека выключается;
    - если повтор выключен, то кнопка Loop серая, при клике на нее повтор трека включается;
    - если повтор включен, то, когда трек проигрывается до конца, он автоматически начинается сначала;
    - если повтор выключен, то, когда трек проигрывается до конца, ничего не происходит.
    - В плеере работает регулировка громкости трека.

- Приложением удобно пользоваться:
  - При переходе на несуществующий роут пользователь попадает на страницу Not Found.
  - Переходы между страницами работают без перезагрузки приложения.
  - При клике на ссылку «Главное» в левом меню, пользователь остается на главной странице.
  - Обработано состояние загрузки: пока треки загружаются, пользователь видит «скелетон», который мы реализовали ранее.
  - Если произошла ошибка при выполнении запроса, пользователь вместо списка треков должен увидеть надпись «Не удалось загрузить плейлист, попробуйте позже».

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
