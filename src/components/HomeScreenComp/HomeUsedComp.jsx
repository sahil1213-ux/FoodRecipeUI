import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {HeartIcon} from 'react-native-heroicons/outline';
import {MagnifyingGlassIcon} from 'react-native-heroicons/solid';
import {NormalText} from '../commonComp/Common';

export const HeaderComponent = ({navigation}) => (
  <View
    className="flex-row justify-between items-center mx-2"
    style={{
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
    <TouchableOpacity onPress={() => navigation.push('Favourite')}>
      <HeartIcon size={hp(5.5)} color="grey" />
    </TouchableOpacity>
  </View>
);

export const SpecialSearchComponent = ({navigation}) => (
  <Pressable
    onPress={() => navigation.push('Search')}
    className="mx-3 space-y-1 flex-row justify-between items-center rounded-full bg-black/5 p-[4px]">
    <Text
      className="flex-1 tracking-wider text-gray-600 my-2 ml-2"
      style={{fontSize: hp(1.7)}}>
      Search Any recipe
    </Text>
    <View className="bg-white rounded-full p-4">
      <MagnifyingGlassIcon size={hp(2.5)} color="gray" strokeWidth={3} />
    </View>
  </Pressable>
);

export const SearchComponent = ({searchedText, setSearchedText, searchRef}) => (
  <View className="mx-3 flex-row items-center rounded-full bg-black/5 p-[4px]">
    <TextInput
      placeholder="Search Any recipe"
      placeholderTextColor={'gray'}
      value={searchedText}
      onChangeText={text => setSearchedText(text)}
      ref={searchRef}
      style={{fontSize: hp(2), padding: hp(1)}}
      className="flex-1 mb-1 tracking-wider"
    />
    {searchedText.length > 0 && (
      <Text
        className="text-gray-600 mr-2.5"
        style={{fontSize: hp(2.5)}}
        onPress={() => setSearchedText('')}>
        X
      </Text>
    )}

    <View className="bg-white rounded-full p-3">
      <MagnifyingGlassIcon size={hp(2.8)} color="gray" strokeWidth={3} />
    </View>
  </View>
);

export const SpecialText = ({specialTxt, finalText}) => (
  <Text style={{fontSize: hp(4)}} className="font-semibold text-neutral-600">
    {specialTxt} <Text className="text-amber-600">{finalText}</Text>
  </Text>
);
