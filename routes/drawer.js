import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeStack from './homeStack';
import AboutStack from './aboutStack';

const Drawer = createDrawerNavigator();

const DrawerStack = () => {
  return (
    <NavigationContainer>
     <Drawer.Navigator>
        <Drawer.Screen name="Home" component={HomeStack}  options={{ headerShown: false }}/>
        <Drawer.Screen name="About" component={AboutStack}options={{ headerShown: false }} />
      </Drawer.Navigator>
    </NavigationContainer>
    
  );
};

export default DrawerStack;
