import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as SplashScreen from 'expo-splash-screen';
import PiDashboard from './pages/PiDashboard';
import SolarCalculator from './pages/SolarCalculator';
import PiHistory from './pages/PiHistory';
import { PaperProvider } from 'react-native-paper';
import { useThemeMode } from './components/lib/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useAppReady from './hooks/useAppReady';
import { useCallback } from 'react';

const Tab = createBottomTabNavigator();

export default function App() {
  const sciFiTheme = useThemeMode();
  const appIsReady = useAppReady();

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) return null; // Wait until fonts + splash delay complete

  return (
    <PaperProvider theme={sciFiTheme}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ color, size }) => {
              let iconName;

              if (route.name === 'Pi Dashboard') {
                iconName = 'pi'; // π icon
              } else if (route.name === 'Solar Calculator') {
                iconName = 'earth'; // Planet icon
              } else
                iconName = 'clock'; // History icon

              return (
                <MaterialCommunityIcons name={iconName} size={size} color={color} />
              );
            },
            tabBarActiveTintColor: sciFiTheme.colors.primary,
            tabBarInactiveTintColor: sciFiTheme.colors.outline,
            tabBarStyle: {
              backgroundColor: sciFiTheme.colors.surface,
              borderTopColor: sciFiTheme.colors.outline,
            },
            tabBarLabelStyle: {
              fontSize: 12,
            },
          })}>
          <Tab.Screen name="Pi Dashboard" component={PiDashboard} />
          <Tab.Screen name="Solar Calculator" component={SolarCalculator} />
          <Tab.Screen name="Pi History" component={PiHistory} />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
