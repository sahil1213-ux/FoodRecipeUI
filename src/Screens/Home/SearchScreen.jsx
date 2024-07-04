import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import {CustomStatusBar, Loading} from '../../components/commonComp/Common';
import {SearchComponent} from '../../components/HomeScreenComp/HomeUsedComp';
import {FlatList} from 'react-native-reanimated/lib/typescript/Animated';
import Recipes from '../../components/HomeScreenComp/Recipes';

export default function SearchScreen() {
  const [searchedText, setSearchedText] = useState('');
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    if (searchedText.length > 0) {
      // code here
      getProductsList();
    } else {
      setMeals([]);
    }
  }, [searchedText]);

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
      <SafeAreaView>
        <CustomStatusBar />
        <SearchComponent
          searchedText={searchedText}
          setSearchedText={setSearchedText}
        />
        {/* Here categories is used for demo not neccessary needed to be added */}
        {meals.length > 0 ? (
          <Recipes categories={[]} meals={meals} />
        ) : (
          <Loading size="large" className="mt-20" />
        )}
      </SafeAreaView>
    </View>
  );
}
