import axios from 'axios';

const API_KEY = '47498478-5b3c5ee421281cd3bcc4956d2';

export async function getImages(search, page) {
  const { data } = await axios(`https://pixabay.com/api/?`, {
    params: {
      key: API_KEY,
      q: search,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 15,
      page: page,
    },
  });
  return data;
}
