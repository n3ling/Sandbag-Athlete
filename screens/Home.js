import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

import { ListingScreen } from './Listings';
import { AddListingScreen } from './AddListing'
import { BookingScreen } from './Bookings';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ListingStackComponent = ({navigation}) => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="Listings" component={ListingScreen} />
            <Stack.Screen name="Add Listing" component={AddListingScreen} />
        </Stack.Navigator>
    )
}

export default function HomeScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Listings" component={ListingStackComponent} />
      <Tab.Screen name="Bookings" component={BookingScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
