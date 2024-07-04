import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NormalText} from '../../components/commonComp/Common';
import {storage} from '../../services/storage';
import {useNavigation} from '@react-navigation/native';
import {TrashIcon} from 'react-native-heroicons/outline';

export default function FavouriteScreen() {
  const [favorites, setFavorites] = useState([]); // Assuming you have a state for meals initialized to an empty array or similar
  const navigation = useNavigation();
  useEffect(() => {
    // Add your code for this component
    let favorites = [];
    const favouritesString = storage.getString('favorites');
    if (favouritesString) {
      favorites = JSON.parse(favouritesString);
      if (favorites) {
        setFavorites(favorites);
      } else {
        setFavorites([]);
      }
    }
  }, []);
  return (
    <View className="mt-2">
      <FlatList
        data={favorites}
        renderItem={({item}) => renderItem({item, navigation, setFavorites})}
        keyExtractor={item => item.idMeal}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={10}
        onEndReachedThreshold={0.5}
        removeClippedSubviews={true}
      />
    </View>
  );
}

const renderItem = ({item, navigation, setFavorites}) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.push('RecipeDetails', {...item})}>
      <View className="py-2 flex-row space-x-2 my-0.5 border-2 border-t-gray-300 border-l-gray-300 border-r-gray-300 border-b-gray-300 mx-2 rounded-md">
        <View className="h-28 w-32 rounded-xl ml-1">
          <Image
            source={{uri: item.strMealThumb}}
            className="h-full w-full rounded-xl"
          />
        </View>
        <View className="flex-1 mr-3">
          <Text
            className="text-xl text-gray-600"
            numberOfLines={2}
            ellipsizeMode="tail">
            {item.strMeal}
          </Text>
          <Text>{item.idMeal}</Text>
          <TouchableOpacity
            className="flex-row justify-end items-end mt-auto"
            onPress={() => removeItem(item, setFavorites)}>
            <TrashIcon size={24} color="grey" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // itemContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   padding: 10,
  //   marginVertical: 5,
  //   marginHorizontal: 2,
  //   borderWidth: 1,
  //   borderColor: '#000',
  //   borderRadius: 5,
  // },
  textContainer: {
    flexDirection: 'column',
  },
  mealText: {
    color: '#4A4A4A',
    fontSize: 18,
    fontWeight: 'bold',
  },
  idText: {
    color: '#787878',
    fontSize: 14,
  },
  removeButton: {
    padding: 5,
  },
});

const removeItem = (item, setFavorites) => {
  let favourites = [];
  const favouritesString = storage.getString('favorites');
  if (favouritesString) {
    favourites = JSON.parse(favouritesString);
  }
  const newFavourites = favourites.filter(
    favourite => favourite.idMeal !== item.idMeal,
  );
  storage.set('favorites', JSON.stringify(newFavourites));
  setFavorites(newFavourites);
};
