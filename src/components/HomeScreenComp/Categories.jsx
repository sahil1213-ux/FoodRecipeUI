import {View, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';

import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

import Animated, {FadeInDown} from 'react-native-reanimated';
import {CachedImage} from '../../helpers/cachedImage';
import {NormalText} from '../commonComp/Common';
import FastImage from 'react-native-fast-image';

export default function Categories({
  activeCategory,
  handleChangeCategory,
  categories,
}) {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: hp(2)}}
        // pagingEnabled={true}
        // pinchGestureEnabled={true}
        // nestedScrollEnabled={true}
      >
        {categories.map((category, index) => {
          console.log('category', category);
          let isActive = category.strCategory == activeCategory;

          return (
            <View key={index}>
              <CategoryCard
                category={category}
                isActive={isActive}
                handleChangeCategory={handleChangeCategory}
              />
            </View>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
}

const CategoryCard = ({category, isActive, handleChangeCategory}) => {
  let activeBtnClass = isActive ? ' bg-amber-400' : ' bg-black/10';
  return (
    <TouchableOpacity
      className="flex mr-2 items-center mt-2"
      onPress={() => handleChangeCategory(category.strCategory)}>
      <View className={'rounded-full p-[6px]' + activeBtnClass}>
        <FastImage
          source={{uri: category.strCategoryThumb}}
          style={{height: hp(6), width: hp(6)}}
          className="rounded-full"
        />
      </View>
      <NormalText
        text={
          category.strCategory.length > 7
            ? category.strCategory.substring(0, 7) + '...'
            : category.strCategory
        }
        size={hp(2)}
      />
    </TouchableOpacity>
  );
};
