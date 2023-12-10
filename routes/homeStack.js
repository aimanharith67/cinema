import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/home';
import ReviewDetails from "../screens/reviewDetails";
import Header from '../shared/header'
import MovieScreen from '../screens/movieScreen';
import CastScreen from '../screens/castScreen';
import SearchScreen from '../screens/searchScreen';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
       name="HomeStack"
       component={Home} 
       options={({navigation})=>({
        header: () => <Header navigation={navigation} title='Gamezone'/>,
        headerShown: false
      })}
       />
      <Stack.Screen name="ReviewDetails" 
      component={ReviewDetails} 
      />
      <Stack.Screen name="MovieScreen" 
      component={MovieScreen} options={{ headerShown: false }}
      />
       <Stack.Screen name="CastScreen" 
      component={CastScreen} options={{ headerShown: false }}
      />
      <Stack.Screen name="SearchScreen" 
      component={SearchScreen} options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack