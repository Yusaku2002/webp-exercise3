export async function fetchImages(character) {
    const response = await fetch(
      `https://www.amiiboapi.com/api/amiibo/?name=${character}`
    );
    const data = await response.json();
    return data.amiibo;
  }