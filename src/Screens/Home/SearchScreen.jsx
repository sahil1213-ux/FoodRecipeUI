import {View, SafeAreaView, Text, ScrollView} from 'react-native';
import React, {useRef, useEffect, useState} from 'react';
import {CustomStatusBar, Loading} from '../../components/commonComp/Common';
import {SearchComponent} from '../../components/HomeScreenComp/HomeUsedComp';
import Recipes from '../../components/HomeScreenComp/Recipes';

export default function SearchScreen() {
  const [searchedText, setSearchedText] = useState('');
  const [meals, setMeals] = useState([]);
  const searchRef = useRef(null);

  useEffect(() => {
    if (searchedText.length > 0) {
      // code here
      getProductsList();
    } else {
      setMeals([]);
    }
  }, [searchedText]);

  useEffect(() => {
    if (searchRef.current && typeof searchRef.current.focus === 'function') {
      searchRef.current.focus();
    }
  }, []);

  const getProductsList = async () => {
    try {
      let response = await fetch(
        'https://www.themealdb.com/api/json/v1/1/search.php?s=' + searchedText,
      );
      let data = await response.json();
      if (data.meals) {
        setMeals(data.meals);
      } else {
        console.log('No data found');
        setMeals([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View className="flex-1">
      <SafeAreaView className="space-y-2 mt-3">
        <CustomStatusBar />
        <SearchComponent
          searchedText={searchedText}
          setSearchedText={setSearchedText}
        />
        <ScrollView showsVerticalScrollIndicator={false} bounces>
          {/* Here categories is used for demo not neccessary needed to be added */}
          {searchedText.length > 0 ? (
            meals.length > 0 ? (
              <View>
                <Text className="font-semibold text-neutral-700 mb-2 px-3 text-xl">
                  Recipes
                </Text>
                <Recipes categories={['123']} meals={meals} />
              </View>
            ) : (
              meals.length === 0 && (
                <View className="flex-1 ustify-center items-center">
                  <Text>No data found</Text>
                </View>
              )
            )
          ) : (
            <View className="flex-row justify-center items-center">
              <Text className=" text-gray-700">Search Something Now</Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
