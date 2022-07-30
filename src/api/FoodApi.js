import axios from "axios";
import SECRET_KEY from "./SECRET_KEY";

const BASE_API_URL = 'https://api.spoonacular.com/recipes';

/* 
  json-server will give you CRUD endpoints on recipes.
  Here we've provided you with a single action to get recipes by types
  You'll need to add to this class as you build features for the app.
*/

class getFoodRecipe {

  static async getRecipe(endpoint,sort) {
    const result = await axios.get(`${BASE_API_URL}/${endpoint}?apiKey=${SECRET_KEY}&${sort}&number=9`);
    return result.data;
  }
  static async getDetail(id) {
    const result = await axios.get(`${BASE_API_URL}/${id}/information?apiKey=${SECRET_KEY}&number=9`);
    return result.data;
  }


}

export default getFoodRecipe;