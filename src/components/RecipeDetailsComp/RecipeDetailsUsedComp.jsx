import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Animated, {FadeIn, FadeInDown} from 'react-native-reanimated';
import {CatchedImage} from '../../helpers/cachedImage';
import {
  ArrowUturnLeftIcon,
  HeartIcon,
  MinusIcon,
  PlusIcon,
} from 'react-native-heroicons/solid';
import {
  ClockIcon,
  FireIcon,
  Square3Stack3DIcon,
  UserIcon,
} from 'react-native-heroicons/outline';

import {GetIngredients} from '../../services/RecipeServices';
import YoutubeIframe from 'react-native-youtube-iframe';
import FastImage from 'react-native-fast-image';
import {storage} from '../../Screens/App';

export const RecipeImage = ({idMeal, strMealThumb}) => (
  <Animated.View
    entering={FadeIn.delay(100).duration(600).springify()}
    className="flex-row justify-center">
    {/* <CatchedImage
      uri={strMealThumb}
      style={{
        // width: hp(98),
        height: hp(50),
        borderRadius: 30,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        // marginTop: 4,
        paddinghorizontal: 4,
      }}
      sharedTransitionTag={`${idMeal}-image`} // Add this line,
      className="w-full"
    /> */}
    <FastImage
      source={{uri: strMealThumb}}
      style={{
        height: hp(50),
        borderRadius: 30,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        // marginTop: 4,
        paddinghorizontal: 4,
      }}
      // s={`${idMeal}-image`} // Add this line,
      className="w-full"
      // resizeMode="contain"
    />
  </Animated.View>
);

export const HeaderComponent = ({navigation, fav, setFav, item}) => (
  <Animated.View
    entering={FadeIn.delay(200).duration(600).springify()}
    className="w-full absolute top-0 left-0 pt-6 flex-row justify-between items-center px-2 
">
    <TouchableOpacity
      className="p-2 rounded-full ml-2 bg-white"
      onPress={() => navigation.goBack()}>
      <ArrowUturnLeftIcon size={hp(3.5)} color="black" strokeWidth={4.5} />
    </TouchableOpacity>
    <TouchableOpacity
      className="p-2 rounded-full ml-2 bg-white"
      onPress={() => {
        // Function to update favorites list
        updateFavorites(fav, item, setFav);
      }}>
      <HeartIcon
        size={hp(3.5)}
        color={fav ? 'red' : 'black'}
        strokeWidth={4.5}
      />
    </TouchableOpacity>
  </Animated.View>
);

const updateFavorites = async (fav, item, setFav) => {
  let favorites = [];
  // Retrieve the current list of favorites
  const favoritesString = storage.getString('favorites');
  if (favoritesString) {
    favorites = JSON.parse(favoritesString);
  }

  if (fav) {
    // Remove item from favorites
    favorites = favorites.filter(favorite => favorite.idMeal !== idMeal);
  } else {
    // Add item to favorites
    favorites.push(item);
  }

  // Update the favorites in state
  await setFav(!fav);

  // Save the updated list of favorites
  storage.set('favorites', JSON.stringify(favorites));
};

export const NameAndArea = ({strMeal, strArea}) => (
  <View className="space-y-4 px-2 justify-between pt-3">
    <Text className="font-bold text-neutral-600 text-2xl">{strMeal}</Text>
    <Text className="font-semibold text-neutral-600 text-lg">
      Made in {strArea} Street Area
    </Text>
  </View>
);

export const AdditionalRecipeInfo = ({icon, text1, text2}) => {
  const props = {
    size: hp(4),
    strokeWidth: 2.5,
    color: '#525252',
  };
  return (
    <View className=" rounded-full bg-amber-300 p-1.5">
      <View className="bg-white rounded-full p-3 justify-center items-center ">
        {icon === 'Cook Time' ? (
          <ClockIcon {...props} />
        ) : icon === 'user' ? (
          <UserIcon {...props} />
        ) : icon === 'calaries' ? (
          <FireIcon {...props} />
        ) : (
          <Square3Stack3DIcon {...props} />
        )}
      </View>
      <View className="flex items-center py-2 space-y-1">
        <Text className="text-[14] font-semibold text-neutral-600">
          {text1}
        </Text>
        <Text className="text-[12] font-semibold text-neutral-600">
          {text2}
        </Text>
      </View>
    </View>
  );
};
const props = [(size = hp(50)), (strokeWidth = 3), (color = 'yellow')];
export const AddButton = () => (
  <View className="flex-row justify-around mt-4">
    <View
      className="rounded-md bg-black flex-row space-x-4 justify-around items-center"
      style={{paddingHorizontal: hp(4), paddingVertical: hp(2)}}>
      <MinusIcon {...props} color={'yellow'} />
      <Text className="font-semibold text-white  text-xl">{'0'}</Text>
      <PlusIcon {...props} color={'yellow'} />
    </View>
  </View>
);

export const YoututeVideo = ({strYoutube}) => (
  <View className="space-y-4">
    <Text className="font-bold text-neutral-600 text-2xl">Recipe Video</Text>
    <View style={{marginVertical: hp(0.5), borderRadius: 30}}>
      <YoutubeIframe
        videoId={strYoutube.split('=')[1]}
        height={hp(30)}
        width="100%"
      />
    </View>
  </View>
);
