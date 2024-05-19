import axios from 'axios';

const options = {
  method: 'GET',
  url: 'https://all-books-api.p.rapidapi.com/getBooks',
  headers: {
    'X-RapidAPI-Key': '5715d5a3c1msh1eb4876d124e68ep1377c2jsne6ad620b089c',
    'X-RapidAPI-Host': 'all-books-api.p.rapidapi.com'
  }
};

async function RandomBooksAPI() {
  try {
    const response = await axios.request(options);
    return response.data; //the response has a books array
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default RandomBooksAPI;
