import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts as useRoboto, Roboto_400Regular } from '@expo-google-fonts/roboto';

SplashScreen.preventAutoHideAsync(); // keep splash visible by default

export default function useAppReady() {
  const [fontsLoaded] = useRoboto({ Roboto_400Regular });
  const [delayDone, setDelayDone] = useState(false);
  const [appIsReady, setAppIsReady] = useState(false);

  // Timer for minimum 5s delay
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDelayDone(true);
    }, 5000); // 5 seconds

    return () => clearTimeout(timeout);
  }, []);

  // When both fonts and delay are done, hide splash
  useEffect(() => {
    if (fontsLoaded && delayDone) {
      setAppIsReady(true);
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, delayDone]);

  return appIsReady;
}
