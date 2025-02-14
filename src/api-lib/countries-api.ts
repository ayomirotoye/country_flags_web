import axios from "axios";
import { Country } from "../pages/countries";
import { apiBaseUrl } from "../utils/constant";

export const fetchCountriesFromApi = async (startIndex: number, count: number): Promise<Country[]> => {
    try {
      const response = await axios.get(apiBaseUrl.concat("/countries"), {
        params: {
          startIndex: startIndex,
          count: count,
        },
      });
  
      const countries: Country[] = response.data;
  
      const countriesWithId = countries.map((country, i) => ({
          ...country,
          id: startIndex + i + 1,
          flag: country.flag || `https://i.pravatar.cc/150?img=${(startIndex + i) % 70}`
      }))
  
      return countriesWithId;
  
    } catch (error) {
      console.error('Error fetching countries:', error);
      throw error;
    }
  };