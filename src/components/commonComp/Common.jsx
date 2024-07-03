// import {View, Text,} from 'react-native';
import {View, Text, ActivityIndicator, StatusBar} from 'react-native';
import React from 'react';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

export function Divider() {
  return (
    <View
      className="w-ful bg-gray-400 h-0.5 mt-4"
      style={{opacity: 0.5}}></View>
  );
}

export function Loading({size}) {
  return (
    <View className="flex items-center justify-center">
      <ActivityIndicator size={size} color="#000000" />
    </View>
  );
}

export function Error({error}) {
  return (
    <View className="flex items-center justify-center">
      <Text>{error}</Text>
    </View>
  );
}

export function CustomStatusBar({backgroundColor, ...props}) {
  return (
    <StatusBar
      backgroundColor={backgroundColor || 'transparent'}
      translucent
      {...props}
    />
  );
}

export function NormalText({text, size = hp(3)}, props) {
  return (
    <Text
      className="font-semibold text-neutral-600"
      style={{fontSize: size, fontFamily: 'Roboto-Regular'}}
      {...props}>
      {text}
    </Text>
  );
}

export function HeadingText({text}) {
  return (
    <View>
      <Text
        className="font-semibold text-neutral-600"
        style={{fontSize: hp(4), fontFamily: 'Roboto-Bold'}}>
        {text}
      </Text>
    </View>
  );
}
