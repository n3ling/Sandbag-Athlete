import { Button, StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';
import { useEffect } from 'react';

import ListingScreen from './Listings';
import AddListingScreen from './AddListing'
import BookingScreen from './Bookings';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ListingStackComponent = ({navigation}) => {

    const logoutPressed = async () => {
        try {
            if (auth.currentUser === null) {
                console.log("No user logged in");
                alert("No user logged in. Redirecting to login page.");
                navigation.navigate("Login");
            }
            else {
                
                await signOut(auth);
                navigation.navigate("Login");
            }
        } catch (err) {
            console.log(err);
        }
    }

    const addListingPressed = () => {
        navigation.navigate("Add Listing");
    }

    return(
        <Stack.Navigator>
            <Stack.Screen name="Listings" component={ListingScreen} options={{headerLeft: ()=>{
                return(
                    <View>
                        <Button title="Logout" onPress={logoutPressed}/>
                    </View>
                )
            },
            headerRight: ()=>{
                return(
                    <View>
                        <Button title="+" onPress={addListingPressed} />
                    </View>
                )
            }
            }}/>
            <Stack.Screen name="Add Listing" component={AddListingScreen} options={{}}/>
        </Stack.Navigator>
    )
}

export default function HomeScreen({navigation}) {

    // useEffect(
    //     ()=>{
    //         navigation.addListener('beforeRemove', (e) => {
    //             e.preventDefault();
    //         })
    //     },
    //     [navigation]
    // )

  return (
    <Tab.Navigator>
      <Tab.Screen name="Listings Stack" component={ListingStackComponent} options={{headerShown:false}}/>
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
