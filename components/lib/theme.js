import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import { useColorScheme } from 'react-native';

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#00f9ff',       // Neon cyan
    secondary: '#6a00ff',     // Purple
    background: '#f0f8ff',    // Light bluish
    surface: '#ffffff',
    text: '#000000',
    onSurface: '#000000',
    outline: '#6a00ff',
  },
  roundness: 10,
  fonts: {
    ...MD3LightTheme.fonts,
    bodyLarge: {
      ...MD3LightTheme.fonts.bodyLarge,
      fontFamily: 'Roboto_400Regular',
    },
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#00f9ff',
    secondary: '#6a00ff',
    background: '#0d0d0d',
    surface: '#121212',
    text: '#ffffff',
    onSurface: '#ffffff',
    outline: '#5affff',
  },
  roundness: 10,
  fonts: {
    ...MD3DarkTheme.fonts,
    bodyLarge: {
      ...MD3DarkTheme.fonts.bodyLarge,
      fontFamily: 'Roboto_400Regular',
    },
  },
};

// Optional helper hook to use system theme
export const useThemeMode = () => {
  const scheme = useColorScheme(); // 'light' | 'dark'
  return scheme === 'dark' ? darkTheme : lightTheme;
};
