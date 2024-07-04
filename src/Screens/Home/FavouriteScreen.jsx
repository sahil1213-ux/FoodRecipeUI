import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {storage} from '../App';
import {NormalText} from '../../components/commonComp/Common';

export default function FavouriteScreen(props) {
  const {navigation} = props.route.params;
  useEffect(() => {
    // Add your code for this component
    let favorites = [];
    const favouritesString = storage.get('favorites');
    if (favouritesString) {
      favorites = JSON.parse(favouritesString);
    }
  }, []);
  return (
    <View>
      <FlatList
        data={favorites}
        renderItem={({item}) => renderItem({item, navigation})}
        keyExtractor={item => item.idMeal}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={10}
        onEndReachedThreshold={0.5}
        // onEndReached={() => {
        //   // Add your code here
        // }}
      />
    </View>
  );
}

const renderItem = ({item, navigation}) => {
  return (
    <TouchableOpacity
      className="h-4, w-full mx-2 border-black my-2 flex-row justify-between items-center"
      onPress={() => navigation.push('RecipeDetails', ...item)}>
      <Text className="text-gray-600 text-lg pl-2">{item.strMeal}</Text>
      <NormalText text={item.idMeal} size={17} />
      <Text className="text-gray-600 text-lg pr-2">R</Text>
      <NormalText
        text="remove"
        color="red"
        size={17}
        onPress={() => removeItem(item)}
      />
    </TouchableOpacity>
  );
};

const removeItem = item => {
  let favourites = [];
  const favouritesString = storage.get('favorites');
  if (favouritesString) {
    favourites = JSON.parse(favouritesString);
  }
  const newFavourites = favourites.filter(
    favourite => favourite.idMeal !== item.idMeal,
  );
  storage.set('favorites', JSON.stringify(newFavourites));
};
