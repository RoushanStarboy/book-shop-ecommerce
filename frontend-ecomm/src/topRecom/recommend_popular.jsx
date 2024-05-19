
import axios from "axios";

const options = {
    method: 'GET',
    url: 'http://127.0.0.1:8000/recommender/recommendpopular/',
  };
  



async function Recommend_popular(){
    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.log();
        return [];
    }

}


export default Recommend_popular;