//https://github.com/skypro-web-developer/webdev-react-hw-template/blob/main/API.md
// Получить все треки
export function getAllTracks() {
  return fetch("https://skypro-music-api.skyeng.tech/catalog/track/all/").then(
    (response) => {
      if (!response.ok) {
        throw new Error("Произошла ошибка сервера, попробуйте позже");
      }
      return response.json();
    }
  );
}

// Регистрация
export function registerUser({ email, password }) {
  return fetch("https://skypro-music-api.skyeng.tech/user/signup/", {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
      username: email,
    }),
    headers: {
      "content-type": "application/json",
    },
  });
}

// Вход
export function loginUser({ email, password }) {
  return fetch("https://skypro-music-api.skyeng.tech/user/login/", {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
    }),
    headers: {
      "content-type": "application/json",
    },
  });
}

// Получение токена
export function getTokenUser({ email, password }) {
  return fetch("https://skypro-music-api.skyeng.tech/user/token/", {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
    }),
    headers: {
      "content-type": "application/json",
    },
  }).then((response) => response.json());
}

// Рефреш токена
export function refreshTokenUser(token) {
  console.log("Отправка запроса на обновление токена...");

  return fetch("https://skypro-music-api.skyeng.tech/user/token/refresh/", {
    method: "POST",
    body: JSON.stringify({
      refresh: token,
    }),
    headers: {
      "content-type": "application/json",
    },
  }).then((response) => response.json());
}
