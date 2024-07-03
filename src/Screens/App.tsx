/**
 * Libraries
 * // Reanimated
 * npm install react-native-reanimated
 * Add react-native-reanimated/plugin plugin to your babel.config.js :-
 * plugins: [
      ...
      'react-native-reanimated/plugin',
    ],
 * npm start -- --reset-cache
// navigation
npm install @react-navigation/native
npm install react-native-screens react-native-safe-area-context
npm install @react-navigation/native-stack
// tailwindCSS
npm install nativewind
npm install --save-dev tailwindcss@3.3.2
Run npx tailwindcss init to create a tailwind.config.js file :-
Modify your babel.config.js with plugins: ["nativewind/babel"],
//heroIcons
npm i react-native-heroicons react-native-svg
// responsive
npm install react-native-responsive-screen --save
// recipe list package
npm add @react-native-seoul/masonry-list // similar to flat list
import MasonryList from '@react-native-seoul/masonry-list'; // use this one

// to store image cache in the divice so than again load of images is not neccessary
npm install @react-native-async-storage/async-storage
// youtube Video
npm install react-native-youtube-iframe
npm install react-native-youtube-iframe --legacy-peer-deps
npm install --save react-native-webview // neccesary for youtube video work
// Recipe Images and data
TheMealDB
// api calls
npm install axios
// local storage
yarn add react-native-mmkv
cd ios && pod install
// fast image loading
npm install react-native-fast-image
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Text} from 'react-native';
import AuthNav from '../navigation/AuthNav';
import {MMKV} from 'react-native-mmkv';
export const storage = new MMKV({
  id: `user-${1}-storage`,
  // path: `${}/storage`,
  encryptionKey: 'hunter85',
});
export default function App() {
  return (
    <NavigationContainer>
      <AuthNav />
      {/* <Text>Hello</Text> */}
    </NavigationContainer>
  );
}
