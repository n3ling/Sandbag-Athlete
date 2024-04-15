import { StyleSheet, Text, View, FlatList, Button, Image } from 'react-native';
import { db, auth, storage } from '../firebaseConfig';
import { doc, getDocs, collection, query, where, getDoc, updateDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';

export default function BookingScreen() {

    const screenFocused = useIsFocused();

    useEffect(()=>{
        getBookingsList();
    },[screenFocused]);

    const [bookingList, setBookingList] = useState([]);

    const getBookingsList = async () => {
      try {
        const ownerRef = doc(db, "ownerdata", auth.currentUser.uid);
        const q = query(collection(db, "bookings"), where("owner", "==", ownerRef));
        const resultsFromDB = []

        const querySnapshot = await getDocs(q);

        // get every athlete for ownerId and save to state variable
        querySnapshot.forEach(async (currDoc) => {
            //console.log(currDoc.id, " => ", currDoc.data());
            const userSnapshot = await getDoc(currDoc.data().booker);
            const athleteSnapshot = await getDoc(currDoc.data().athlete);
            const ownerSnapshot = await getDoc(currDoc.data().owner);

            const booking = {
                id: currDoc.id,
                confirmation: currDoc.data().confirmation,
                booker: userSnapshot.data(),
                athlete: athleteSnapshot.data(),
                owner: ownerSnapshot.data(),
                status: currDoc.data().status
            }

            resultsFromDB.push(booking)
        });
      
        // update the flat list
        setBookingList(resultsFromDB)

      } catch(err) {
        console.log(err);
      }
    }

    return (
      <View style={styles.container}>
        <FlatList
            data={bookingList}
            keyExtractor={(item)=>{ return item.id }}
            renderItem={
                    ({item})=>{
                        return(
                            <View>
                              <View>
                                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", margin:5}}>
                                  <Text style={styles.subtitle}>Athlete Info</Text>
                                  <Button onPress={ async () => {
                                    if (item.status === "CONFIRMED") {
                                      try {
                                        const docToUpdate = doc(db, "bookings", item.id);
                                        const updatedBooking = {
                                          status: "CANCELLED"
                                        }
                                        await updateDoc(docToUpdate, updatedBooking);
                                        alert("Booking has been cancelled");
                                      } catch (err) {
                                        console.log(err);
                                      }
                                    }
                                    else {
                                      alert("Booking is already cancelled");
                                    }
                                  }} title='Cancel Booking'/>
                                </View>
                                <View style={{margin:5}}>
                                  <Text style={styles.text}>Name: {item.athlete.fname} {item.athlete.lname}</Text>
                                  <Text style={styles.text}>Price: ${item.athlete.price} per day</Text>
                                  <Image style={{height:150, width:150}} source={{uri:`${item.athlete.pic}`}} />
                                </View>
                              </View>
                              <View style={{margin:5}}>
                                <Text style={styles.subtitle}>Booker Info</Text>
                                <Text style={styles.text}>Booker name: {item.booker.fname} {item.booker.lname}</Text>
                                <Image style={{height:150, width:150}} source={{uri:`${item.booker.pfp}`}} />
                              </View>
                              <View style={{flexDirection: "row", alignItems: "center", margin:5}}>
                                <Text style={styles.subtitle}>Booking Status:</Text>
                                {(item.status === "CANCELLED") ? (
                                  <Text style={styles.cancelledText}>{item.status}</Text>
                                ) : (
                                  <Text style={styles.confirmedText}>{item.status}</Text>
                                )}
                              </View>
                              <View style={{flexDirection: "row", alignItems: "center", margin:5}}>
                                <Text style={styles.subtitle}>Confirmation Code:</Text>
                                <Text style={styles.text}>{item.confirmation}</Text>
                              </View>

                            </View>
                        )
                    }
                }  
            ItemSeparatorComponent={
                ()=>{
                  return(
                    <View style={{borderWidth:1, borderColor:"#ccc", marginVertical:6}}></View>
                  )
                }
              }

            />
      </View>
    );
  }
  
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    subtitle: {
      fontSize: 20,
      fontFamily: "Futura",
      padding: 5,
      fontWeight: "bold"
    },
    text: {
      fontSize: 16,
      padding: 5
    },
    cancelledText: {
      fontSize: 20,
      padding: 5,
      color: "red"
    },
    confirmedText: {
      fontSize: 18,
      padding: 5,
      color: "green"
    }
  });
  