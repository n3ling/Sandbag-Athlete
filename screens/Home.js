import { Alert, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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

    const goToLogin = () => {
        navigation.navigate("Login");
    }

    const addListingPressed = () => {
        navigation.navigate("Add Listing");
    }

    return(
        <Stack.Navigator>
            <Stack.Screen name="Listings" component={ListingScreen} options={{headerLeft: ()=>{
                return(
                    <View>
                        <Button title="Logout" onPress={goToLogin}/>
                    </View>
                )
            },
            headerRight: ()=>{
                return(
                    <View>
                        <TouchableOpacity onPress={addListingPressed}>
                            <Text style={styles.addButton}>+</Text>
                        </TouchableOpacity>
                    </View>
                )
            }
            }}/>
            <Stack.Screen name="Add Listing" component={AddListingScreen} options={{
                title:"Add Athlete Listing",
            }}/>
        </Stack.Navigator>
    )
}

export default function HomeScreen({navigation}) {

    const logoutPressed = async () => {
        try {
            if (auth.currentUser === null) {
                console.log("No user logged in");
                alert("No user logged in. Redirecting to login page.");
            }
            else {

                await signOut(auth);
                console.log(auth.currentUser);
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(
        ()=>{
            navigation.addListener('beforeRemove', (e) => {
                e.preventDefault();
                Alert.alert(
                    'Logout?',
                    'Are you sure you want to logout?',
                    [
                        {
                            text: 'Yes',
                            style: 'destructive',
                            onPress: () => {
                                logoutPressed();
                                navigation.dispatch(e.data.action)
                            },
                        },
                        { text: "No", style: 'cancel', onPress: () => {} },
                    ]
                )
            })
        },
        [navigation]
    )

  return (
    <Tab.Navigator>
      <Tab.Screen name="Listings Stack" component={ListingStackComponent} options={{headerShown:false, title:"Listings"}}/>
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
  addButton: {
    color: "#007AFF",
    marginRight: 15,
    fontSize: 30
  }
});
