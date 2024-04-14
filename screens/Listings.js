import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { db, auth } from '../firebaseConfig';
import { doc, getDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';


export default function ListingScreen() {

    const [user, setUser] = useState([]);
    const [userName, setUserName] = useState('');
    const [athleteList, setAthleteList] = useState([]);

    const screenFocused = useIsFocused();

    useEffect(()=>{
        getUser();
        getListings(auth.currentUser.uid);
    },[screenFocused]);

    const getUser = async () => {
        try {
            const docRef = doc(db, "ownerdata", auth.currentUser.uid);
            const docSnap = await getDoc(docRef);
            const result = [];
            if (docSnap.exists()) {
                //console.log(docSnap.data());
                const userdata = {
                    id: auth.currentUser.uid,
                    affiliation: docSnap.data().affiliation,
                    email: docSnap.data().email,
                    fname: docSnap.data().fname,
                    lname: docSnap.data().lname,
                }
                result.push(userdata);
                setUser(result);
            }
            //console.log(user);
        } catch (err) {
            console.log(err);
        }
    }

    const getListings = async (ownerId) => {
        try {
            // create docRef for logged in owner to access the owner query reference type
            const ownerRef = doc(db, "ownerdata", ownerId);
            // query
            const q = query(collection(db, "athletes"), where("owner", "==", ownerRef));
          
            const resultsFromDB = []

            const querySnapshot = await getDocs(q);

            // get every athlete for ownerId and save to state variable
            querySnapshot.forEach((currDoc) => {
                //console.log(currDoc.id, " => ", currDoc.data());
                const athlete = {
                    id: currDoc.id,
                    ...currDoc.data()
                }
                //console.log(athlete);
                resultsFromDB.push(athlete)
            })
            //console.log("------")
          
            // update the flat list
            setAthleteList(resultsFromDB)

        } catch (err) {
            console.log(err);
        }
    }

    return (
      <View style={styles.container}>
        {/* <Text>Welcome back, {}</Text> */}

        <FlatList
            data={athleteList}
            keyExtractor={(item)=>{ return item.id }}
            renderItem={
                    ({item})=>{
                        return(
                            <View>
                                <Text>Name: {item.fname} {item.lname}</Text>
                                <Text>Sport: {item.sport}</Text>
                                <Text>Experience: {item.experience} years</Text>
                                <Text>Price: ${item.price} per day</Text>
                                <Text>Pro: {item.pro.toString().charAt(0).toUpperCase() + item.pro.toString().slice(1)}</Text>
                            </View>
                        )
                    }
                }  
            ItemSeparatorComponent={
                ()=>{
                  return(
                    <View style={{borderWidth:1, borderColor:"#ccc", marginVertical:4}}></View>
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
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  