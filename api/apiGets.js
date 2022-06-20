import axios from 'axios'
const baseUrl = 'https://opentdb.com/';

export const getCategories = async () => {
    const result = await axios.get(`${baseUrl}/api_category.php`);
    return result;
}
export const getQuestions = async(categoryId,level) =>{
    const uri = baseUrl +`api.php?amount=10&category=${categoryId}&difficulty=${level}&type=multiple&encode=url3986`;
    const result = await axios.get(uri);
    return result;
}