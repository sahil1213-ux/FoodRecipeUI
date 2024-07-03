import {View, Text, Image} from 'react-native';
import React, {useEffect} from 'react';
// import {TextStyle} from '../../Utils/TextStyle';
import Animated, {useSharedValue, withSpring} from 'react-native-reanimated';

import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {CustomStatusBar} from '../../components/commonComp/Common';

export default function WelcomeScreen({navigation}) {
  const ring1Padding = useSharedValue(0);
  const ring2Padding = useSharedValue(0);

  useEffect(() => {
    ring1Padding.value = 0;
    ring2Padding.value = 0;
    setTimeout(() => {
      ring1Padding.value = withSpring(ring1Padding.value + hp(5));
    }, 100);
    setTimeout(() => {
      ring2Padding.value = withSpring(ring2Padding.value + hp(5.5));
    }, 300);
    setTimeout(() => {
      navigation.replace('Home');
    }, 2500);
  }, []);

  return (
    <View className="flex-1 justify-center items-center bg-amber-500 space-y-3">
      <CustomStatusBar />
      {/* logo image witn rings */}
      <Animated.View
        className="bg-white/20 rounded-full"
        style={{padding: ring2Padding}}>
        <Animated.View
          className="bg-white/20 rounded-full"
          style={{padding: ring1Padding}}>
          <Image
            source={require('../../assets/images/Welcome.png')}
            style={{
              height: hp(25),
              width: hp(25),
              borderRadius: 120,
              resizeMode: 'contain',
            }}
          />
        </Animated.View>
      </Animated.View>

      {/* title and punchLine */}
      <View className="items-center space-y-2">
        <Text
          //   style={{fontFamily: 'Roboto-Bold'}}
          className="tracking-widest text-white font-bold"
          style={{fontSize: hp(8)}}>
          Foody
        </Text>
        <Text
          className=" text-white tracking-widest font-medium"
          style={{fontSize: hp(3)}}>
          Feel the delicious food!
        </Text>
      </View>
    </View>
  );
}
