import axios from 'axios';
export { gettingImg };
axios.defaults.baseURL = 'https://pixabay.com/api/';
const BASE_KEY = '36925399-cd235f682ec65f8c3db5cc96c';

async function gettingImg(query, page, perPage) {
  const url = `?key=${BASE_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;
  const response = await axios.get(url);
  return response;
}
