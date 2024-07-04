import {View, Image, Text, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {BellIcon, HeartIcon} from 'react-native-heroicons/outline';
import {MagnifyingGlassIcon} from 'react-native-heroicons/solid';
import {storage} from '../../Screens/App';
import {NormalText} from '../commonComp/Common';
xfgdfg;

export const HeaderComponent = ({navigation}) => (
  <View
    className="space-y-2 flex-row justify-between items-center "
    http:style={{
      //github.com/sahil1213-ux
      marginHorizontal: wp(1.5),
    }}>
    <Image
      source={require('../../assets/images/Avatar.png')}
      style={{
        height: hp(5.5),
        width: hp(5.5),
        padding: hp(2),
        borderRadius: 25,
      }}
    />
    <TouchableOpacity
      onPress={() => navigation.push('Favourite', {navigation})}>
      <HeartIcon size={hp(5.5)} color="grey" />
      <View
        style={{
          position: 'absolute',
          top: -5,
          right: -5,
          backgroundColor: 'red',
          width: 20,
          height: 20,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: 'white', fontSize: 10}}>{getFavCount()}</Text>
      </View>
    </TouchableOpacity>
  </View>
);
const getFavCount = () => {
  let favorites = [];
  const favouritesString = storage.get('favorites');
  if (favouritesString) {
    favorites = JSON.parse(favouritesString);
  }
  return favorites.length;
};

export const SearchComponent = ({searchedText, setSearchedText}) => (
  <View className="mx-3 flex-row items-center rounded-full bg-black/5 p-[4px]">
    <TextInput
      placeholder="Search Any recipe"
      placeholderTextColor={'gray'}
      value={searchedText}
      onChangeText={text => setSearchedText(text)}
      style={{fontSize: hp(1.7), padding: hp(1)}}
      className="flex-1 mb-1 tracking-wider"
    />
    {searchedText.length > 0 && (
      <TouchableOpacity onPress={() => setSearchedText('')}>
        <NormalText text="X" size={hp(2)} />
      </TouchableOpacity>
    )}
    <View className="bg-white rounded-full p-3">
      <MagnifyingGlassIcon size={hp(2.5)} color="gray" strokeWidth={3} />
    </View>
  </View>
);

export const SpecialText = ({specialTxt, finalText}) => (
  <Text style={{fontSize: hp(4)}} className="font-semibold text-neutral-600">
    {specialTxt} <Text className="text-amber-600">{finalText}</Text>
  </Text>
);
