import { useTheme, Box } from 'native-base';
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";

export function Routes() {
  const { colors } = useTheme();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  const Render = () => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('token')
        if(value !== null) {
          return(<AppRoutes />);
        } else {
          return(<AuthRoutes />)
        }
      } catch(e) {
        // error reading value
      }
    }
  }

  return (
    <Box flex={1} bg="gray.700">
      <NavigationContainer theme={theme}>
        <Render />
      </NavigationContainer>
    </Box>
  );
}