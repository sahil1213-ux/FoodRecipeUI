import axios from 'axios';
// import {useState} from 'react';



// export const [activeCategory, setActiveCategory] = useState('Beef');
// export const [categories, setCategories] = useState([]);
// export const [meals, setMeals] = useState([]);


export const getCategories = async (setCategories) => {
    try {
      const res = await axios.get(
        'https://www.themealdb.com/api/json/v1/1/categories.php',
      );

      if (res && res.data) {
        // console.log(res.data);
        setCategories(res.data.categories);
      }
    } catch (error) {
      console.log('error', error.message || 'Something went wrong!');
    }
  };

export const getRecipes = async (category = 'Beef',setMeals) => {
    try {
      const res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`,
      );

      if (res && res.data && res.data.meals) {
        const validMeals = await res.data.meals.filter(
          meal => meal.strMealThumb && meal.strMealThumb.trim() !== '',
        );
        setMeals(validMeals);
      }
    } catch (error) {
      console.log('error', error.message || 'Something went wrong!');
    }
  };


 export const handleChangeCategory = (setActiveCategory,getRecipes,setMeals) => {
    setActiveCategory(category);
    getRecipes(category);
    setMeals([]);
  };