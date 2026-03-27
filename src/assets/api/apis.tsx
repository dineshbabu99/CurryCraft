 import axios from 'axios';
import { searchByNameUrl } from './Urls';


export const fetchFoodData = async () => {
    try {
      const response = await axios.get(
        `${searchByNameUrl}`
      );
   return response.data.meals || [];
    //   console.log(response.data.meals);
    } catch (error) {
      console.error('Error fetching food data:', error);
    }
  };

  