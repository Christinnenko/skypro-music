//https://github.com/skypro-web-developer/webdev-react-hw-template/blob/main/API.md

//Получить все треки
export async function getAllTracks() {
  const response = await fetch(
    "https://skypro-music-api.skyeng.tech/catalog/track/all/"
  );

  if (!response.ok) {
    throw new Error("Произошла ошибка сервера, попробуйте позже");
  }

  const data = await response.json();
  return data;
}

//регистрация
export async function registerUser({ email, password }) {
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

//вход
export async function loginUser({ email, password }) {
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
