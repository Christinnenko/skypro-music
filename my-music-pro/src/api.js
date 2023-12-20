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
