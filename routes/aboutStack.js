import { createStackNavigator } from '@react-navigation/stack';
import About from '../screens/about';
import Header from '../shared/header'

const Stack = createStackNavigator();

const AboutStack = () => {
  return (
    <Stack.Navigator   
    initialRouteName="About"
    screenOptions={({navigation}) =>({
      header: () => <Header navigation={navigation} title='About Gamezone'/>,
    })}>
      <Stack.Screen name="aboutStack" component={About} />
    </Stack.Navigator>
  );
};

export default AboutStack 
