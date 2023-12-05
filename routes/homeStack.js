import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/home';
import ReviewDetails from "../screens/reviewDetails";
import Header from '../shared/header'

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
       name="HomeStack"
       component={Home} 
       options={({navigation})=>({
        header: () => <Header navigation={navigation} title='Gamezone'/>,
      })}
       />
      <Stack.Screen name="ReviewDetails" 
      component={ReviewDetails} 
      />
    </Stack.Navigator>
  );
};

export default HomeStack