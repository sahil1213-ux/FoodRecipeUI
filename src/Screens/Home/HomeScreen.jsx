import {View, ScrollView, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import {HeadingText} from '../../components/commonComp/Common';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

import Recipes from '../../components/HomeScreenComp/Recipes';
import {CustomStatusBar} from '../../components/commonComp/Common';
import {
  HeaderComponent,
  SearchComponent,
  SpecialText,
} from '../../components/HomeScreenComp/HomeUsedComp';
import Categories from '../../components/HomeScreenComp/Categories';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState('Beef');
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    getCategories();
    getRecipes();
  }, []);

  const handleChangeCategory = category => {
    setActiveCategory(category);
    getRecipes(category);
    setMeals([]);
  };
  const getCategories = async () => {
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

  const getRecipes = async (category = 'Beef') => {
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

  return (
    <View className="bg-white flex-1">
      <CustomStatusBar />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 50}}
        style={{paddingTop: hp(5)}}
        className="space-x-3 space-y-3"
        nestedScrollEnabled={true}>
        {/* bell Icon */}
        <HeaderComponent navigation={navigation} />
        <View className="mx-2 space-y-2 mb-2">
          <HeadingText text={'What do you want to cook today?'} />
          <SpecialText specialTxt={'Stay at'} finalText={'home'} />
        </View>

        {/* Search Bar */}
        <Pressable onPress={() => navigation.push('Search')}>
          <SearchComponent
            searchedText={searchedText}
            setSearchedText={setSearchedText}
          />
        </Pressable>
        {/* categories */}
        {/* here we have to render categories only when we get info from api so than animation can be seen */}
        <View>
          {categories.length > 0 && (
            <Categories
              activeCategory={activeCategory}
              handleChangeCategory={handleChangeCategory}
              categories={categories}
            />
          )}
        </View>
        {/* recipes */}
        <View>
          <Recipes categories={categories} meals={meals} />
        </View>
      </ScrollView>
    </View>
  );
}
