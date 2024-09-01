
import axios from "axios";

const options = {
    method: 'GET',
    url: 'https://book-shop-ecommerce-1.onrender.com/recommender/recommendpopular/',
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