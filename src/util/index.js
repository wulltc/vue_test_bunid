import {API_KEY, BASE_URL, BOOK_ENDPOINT} from "@/util/constant";

export const finalizeUrl = (value, startIndex) => `${BASE_URL + BOOK_ENDPOINT}?q=intitle:${value}&printType=books&startIndex=${startIndex}&maxResults=10&key=${API_KEY}`;