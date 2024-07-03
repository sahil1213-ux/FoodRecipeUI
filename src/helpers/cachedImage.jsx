// import AsyncStorage from '@react-native-async-storage/async-storage';
// import React, {useEffect, useState} from 'react';
// import {Image} from 'react-native'; // Use standard Image if Animated.Image is not required
// import Animated from 'react-native-reanimated';

// export const CachedImage = props => {
//   const [cachedSource, setCachedSource] = useState(null);
//   const {uri} = props;

//   useEffect(() => {
//     const getCachedImage = async () => {
//       try {
//         const cachedImageData = await AsyncStorage.getItem(uri);
//         if (cachedImageData) {
//           setCachedSource({uri: cachedImageData});
//         } else {
//           const response = await fetch(uri);
//           const imgBlob = await response.blob();
//           const base64Data = await new Promise((resolve, reject) => {
//             const reader = new FileReader();
//             reader.readAsDataURL(imgBlob);
//             reader.onloadend = () => resolve(reader.result);
//             reader.onerror = reject;
//           });
//           await AsyncStorage.setItem(uri, base64Data);
//           setCachedSource({uri: base64Data});
//         }
//       } catch (error) {
//         console.log(error.message || 'Something went wrong!');
//         setCachedSource({uri});
//       }
//     };
//     getCachedImage();
//   }, []);

//   return <Animated.Image {...props} source={cachedSource} />;
// };
import React, {useEffect, useState} from 'react';
import Animated from 'react-native-reanimated';
import {storage} from '../Screens/App';
// import {MMKV} from '@react-native-mmkv';
storage;

export const CachedImage = props => {
  const [cachedSource, setCachedSource] = useState(null);
  const {uri} = props;

  useEffect(() => {
    const getCachedImage = async () => {
      try {
        // Try to get the cached image data
        const cachedImageData = storage.getString(uri);
        if (cachedImageData) {
          // If found in cache, update state to use it
          setCachedSource({uri: cachedImageData});
        } else {
          // If not found, fetch from the network
          const response = await fetch(uri);
          const imgBlob = await response.blob();
          const base64Data = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(imgBlob);
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
          });
          // Store the fetched image data in MMKV
          storage.set(uri, base64Data);
          // Update state to use the fetched image
          setCachedSource({uri: base64Data});
        }
      } catch (error) {
        console.log(error.message || 'Something went wrong!');
        // Fallback to the original URI if there's an error
        setCachedSource({uri});
      }
    };
    getCachedImage();
  }, [uri]); // Ensure effect runs when URI changes  //uri

  return <Animated.Image {...props} source={cachedSource} />;
};
