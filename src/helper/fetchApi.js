import axios from "axios";


export default async function FetchApi(input,page) {
    try {
        const key = process.env.NEXT_PUBLIC_API_KEY;
    const response = await axios.get(`https://pixabay.com/api/?key=${key}&q=${encodeURIComponent(input)}&image_type=all&page=${page}`);
    const data = response.data;
    if (!data){
        console.log(" nothing found")
    }
    return data;
    } catch (error) {
        console.log(error.message);
    }
  
    
}
