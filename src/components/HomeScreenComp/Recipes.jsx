import {View, Text, Pressable, FlatList} from 'react-native';

import React from 'react';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {useNavigation} from '@react-navigation/native';

import Animated, {FadeInDown} from 'react-native-reanimated';
import {Loading} from '../commonComp/Common';
import {CachedImage} from '../../helpers/cachedImage';
import FastImage from 'react-native-fast-image';
// import {navigation} from '../../services/RecipeServices';

export default function Recipes({categories, meals}) {
  const navigation = useNavigation();
  console.log(meals);
  return (
    <View className="space-y-2 ">
      <Text
        style={{fontSize: hp(3)}}
        className="font-semibold text-neutral-600">
        Recipes
      </Text>
      {/* load the list only when meals and categories are fetched */}
      {categories.length > 0 || meals.length > 0 ? (
        <FlatList
          data={meals}
          keyExtractor={item => item.idMeal.toString()}
          numColumns={2} // Now you can use numColumns directly
          initialNumToRender={5}
          windowSize={2}
          scrollEnabled={false}
          updateCellsBatchingPeriod={100}
          maxToRenderPerBatch={10}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => (
            // navigation={navigation}
            <RecipeCard item={item} index={index} navigation={navigation} />
          )}
          onEndReachedThreshold={0.1}
        />
      ) : (
        <Loading size="large" className="mt-20" />
      )}
    </View>
  );
}

const RecipeCard = ({item, index, navigation}) => {
  let isEven = index % 2 == 0;
  const {idMeal} = item;

  console.log(item);
  return (
    <Animated.View
      key={index}
      entering={FadeInDown.delay(index * 100)
        .duration(600)
        .springify()
        .damping(20)}>
      <Pressable
        style={{
          width: '100%',
          paddingLeft: isEven ? 0 : 8,
          paddingRight: isEven ? 8 : 0,
        }}
        className="flex justify-center mb-3 space-y-1 "
        onPress={() => navigation.push('RecipeDetails', {...item})}>
        {/* <CachedImage
          uri={item.strMealThumb}
          style={{
            height: index % 3 == 0 ? hp(25) : hp(35),
            borderRadius: 35,
            width: hp(25),

            // animation: 'fadeIn',
          }}
          sharedTransitionTag={`${idMeal}-image`} // Add this line,
          // className="bg-black/5"
        /> */}
        <FastImage
          source={{uri: item.strMealThumb}}
          style={{
            height: index % 3 == 0 ? hp(25) : hp(35),
            borderRadius: 35,
            width: hp(25),
          }}
        />
        <Text className="font-semibold ml-3 text-neutral-600">
          {item.strMeal && item.strMeal.length > 20
            ? item.strMeal.slice(0, 20) + '...'
            : item.strMeal || ''}
        </Text>
      </Pressable>
    </Animated.View>
  );
};
