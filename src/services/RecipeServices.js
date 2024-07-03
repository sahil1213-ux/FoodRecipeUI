
import axios from 'axios';

export const GetIngredients = meals => {
  console.log('balllleee', meals);
  if (!Array.isArray(meals) || meals.length === 0) {
    console.error('Invalid meals argument. Expected an array with at least one element.');
    return [];
  }

  let ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meals[0][`strIngredient${i}`]) {
      ingredients.push({
        ingredient: meals[0][`strIngredient${i}`],
        // Uncomment and ensure meals[0][`strMeasure${i}`] exists if measures are needed
        measure: meals[0][`strMeasure${i}`],
      });
    }
  }
  return ingredients;
};


  export const GetRecipesDetails = async (setLoading,setMeals,id) => {
    console.log('id', id);

    try {
      const res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
      );

      if (res && res.data) {
       await setMeals(res.data.meals);
        setLoading(false);
      }
    } catch (error) {
      console.log('error', error.message || 'Something went wrong!');
    }
  };