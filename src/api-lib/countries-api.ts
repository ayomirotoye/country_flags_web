import axios from "axios";
import { Country } from "../pages/countries";
import { apiBaseUrl } from "../utils/constant";

interface ApiResponse {
  next: string,
  previous: string,
  dataList: Country[]
}

export const fetchCountriesFromApi = async (startIndex: number, count: number): Promise<Country[]> => {
  try {
    const response = await axios.get(apiBaseUrl.concat("/countries"), {
      params: {
        startIndex: startIndex,
        count: count,
      },
    });

    const countries: ApiResponse = response.data;

    const countriesWithId = countries?.dataList?.map((country, i) => ({
      ...country,
      id: startIndex + i + 1,
      flagUrl: country.flagUrl || `https://i.pravatar.cc/150?img=${(startIndex + i) % 70}`
    }))

    return countriesWithId;

  } catch (error) {
    console.error('Error fetching countries:', error);
    throw error;
  }
};