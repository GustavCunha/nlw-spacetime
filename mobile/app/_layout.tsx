import { styled } from "nativewind";
import { useEffect, useState } from "react";
import { ImageBackground } from "react-native";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SecureStore from 'expo-secure-store';

import { 
  useFonts, 
  Roboto_400Regular, 
  Roboto_700Bold 
} from '@expo-google-fonts/roboto';
import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree';

import blurBg from '../src/assets/bg-blur.png';
import Stripes from '../src/assets/stripes.svg';

const StyledStripes = styled(Stripes)

export default function Layout() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState<null | boolean>(null)

  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular, 
    Roboto_700Bold, 
    BaiJamjuree_700Bold
  })

  useEffect(() => {
    SecureStore.getItemAsync('token').then(token => {
      setIsUserAuthenticated(!!token)
    })
  }, [])

  if(!hasLoadedFonts) {
    return <SplashScreen />
  }

  return (
    <ImageBackground 
      source={blurBg} 
      className='bg-gray-900 flex-1 relative '
      imageStyle={{position: 'absolute', left: '-100%'}}
    >
      <StyledStripes className='absolute left-2' />
      <StatusBar style="light" translucent />

      <Stack screenOptions={{
        headerShown: false, 
        contentStyle: {backgroundColor: 'transparent'},
        animation: 'fade'}}
      >
        <Stack.Screen name='index' redirect={isUserAuthenticated} />
        <Stack.Screen name='new' />
        <Stack.Screen name='memories' />
      </Stack>
    </ImageBackground>
  )
}