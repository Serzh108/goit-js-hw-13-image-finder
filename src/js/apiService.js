// export default объект отвечающий за логику HTTP-запросов к API
const key = '16012564-983777c468f78516fc9320c6b';
const baseUrl = 'https://pixabay.com/api/';
const per_page = 12;

function getQuery(search, page) {
  return fetch(
    `${baseUrl}?image_type=photo&orientation=horizontal&q=${search}&page=${page}&per_page=${per_page}&key=${key}`,
  )
    .then(response => response.json())
    .catch(err => console.log('Error: ', err));
}

export default getQuery;
