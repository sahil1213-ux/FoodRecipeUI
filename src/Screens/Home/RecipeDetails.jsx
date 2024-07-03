import {View, ScrollView} from 'react-native';
import React, {useEffect} from 'react';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Animated, {FadeInDown} from 'react-native-reanimated';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {GetRecipesDetails} from '../../services/RecipeServices';
import {
  CustomStatusBar,
  Divider,
  HeadingText,
  Loading,
  NormalText,
} from '../../components/commonComp/Common';
import {
  AddButton,
  AdditionalRecipeInfo,
  HeaderComponent,
  NameAndArea,
  RecipeImage,
  YoututeVideo,
} from '../../components/RecipeDetailsComp/RecipeDetailsUsedComp';

export default function RecipeDetails(props) {
  const [fav, setFav] = useState(false); // Assuming you have a state for meals initialized to an empty array or similar
  const [meals, setMeals] = useState([]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [ingredieants, setIngredients] = useState(undefined);

  const id = props.route.params.idMeal;
  useEffect(() => {
    console.log('id', id);
    if (id) {
      GetRecipesDetails(setLoading, setMeals, id);
    }
  }, []);

  // Add this useEffect
  useEffect(() => {
    if (meals.length > 0) {
      setIngredients(GetIngredients(meals));
    }
  }, [meals]); // This useEffect depends on `meals`

  const GetIngredients = meals => {
    console.log('balllleee', meals);
    if (!Array.isArray(meals) || meals.length === 0) {
      console.error(
        'Invalid meals argument. Expected an array with at least one element.',
      );
      return [];
    }

    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
      if (meals[0][`strIngredient${i}`]) {
        ingredients.push({
          ingredient: meals[0][`strIngredient${i}`],
          measure: meals[0][`strMeasure${i}`],
        });
      }
    }
    return ingredients;
  };

  // Use optional chaining to safely access meals[0]
  console.log('meals', meals);
  const {strArea, strInstructions, strYoutube} = meals[0] ?? {};
  let item = props.route.params;
  const {idMeal} = item;
  // const ingredients = GetIngredients(meals);

  return (
    <ScrollView
      className="bg-white flex-1"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: 30}}
      style={{padding: hp(1)}}>
      <CustomStatusBar />
      {/* recipe Image */}
      <RecipeImage idMeal={idMeal} strMealThumb={`${item.strMealThumb}`} />

      {/* back btn */}
      <HeaderComponent
        navigation={navigation}
        fav={fav}
        setFav={setFav}
        item={item}
      />

      {loading ? (
        <Loading size="large" className="mt-20" />
      ) : (
        <Animated.View
          entering={FadeInDown.delay(200).duration(600).springify().damping(20)}
          className="flex-1">
          <NameAndArea strMeal={item.strMeal} strArea={strArea} />
          <Divider />

          {/*  AdditionalRecipeInfo */}
          <View className="flex-row justify-around my-1">
            <AdditionalRecipeInfo
              icon={'Cook Time'}
              text1={'30 mins'}
              text2={'Cook Time'}
            />
            <AdditionalRecipeInfo
              icon={'user'}
              text1={'03'}
              text2={'Servings'}
            />
            <AdditionalRecipeInfo
              icon={'calaries'}
              text1={'103'}
              text2={'cal'}
            />
            <AdditionalRecipeInfo icon={'Easy'} text1={''} text2={'Easy'} />
          </View>

          {/* Add and Remove beutiful button */}
          {/* <AddButton /> */}

          {/* ingredients */}
          <Divider />
          <View className="space-y-2 px-2 justify-between pt-1 font-bold">
            <HeadingText text={'Ingredients'} className />
          </View>
          {ingredieants.map((item, index) => (
            <View className="flex-row space-x-1 items-center">
              <View className="rounded-full bg-amber-300 p-1.5" />
              <View className="flex-row space-x-1">
                <View>
                  <HeadingText text={item.ingredient} />
                </View>
                <View>
                  <NormalText text={item.measure} size={hp(2)} />
                </View>
              </View>
            </View>
          ))}
          {/* instructions */}
          <Divider />
          <View className="space-y-2 justify-between pt-3 font-bold">
            <HeadingText text={'Instructions'} />

            <NormalText text={strInstructions} />
          </View>

          {/* youtube video */}
          <View
            className="w-ful bg-gray-400 h-0.5 mt-4 px-2"
            style={{opacity: 0.5}}></View>
          {strYoutube && <YoututeVideo strYoutube={strYoutube} />}
        </Animated.View>
      )}
    </ScrollView>
  );
}
