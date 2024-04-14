import { StyleSheet, Switch, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { useState } from 'react';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import { storage, db, auth } from '../firebaseConfig';
import { ref, uploadBytesResumable } from 'firebase/storage';
import { collection, addDoc, doc } from 'firebase/firestore';

export default function AddListingScreen() {

    const [fnameUI, setFnameUI] = useState("");
    const [lnameUI, setLnameUI] = useState("");
    const [affiliationUI, setAffiliationUI] = useState("");
    const [addressUI, setAddressUI] = useState("");
    const [cityUI, setCityUI] = useState("");
    const [sportUI, setSportUI] = useState("");
    const [priceUI, setPriceUI] = useState("");
    const [experienceUI, setExperienceUI] = useState("");
    const [proUI, setProUI] = useState(false);
    const [imageFromGallery, setImageFromGallery] = useState(null)
    const [imageLabel, setImageLabel] = useState("")

    const chooseImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })
        //console.log(result)

        // check if user selected a photo
        if (result.canceled === true) {
            setImageLabel("No photo selected")
            setImageFromGallery(null)
            return
        }
 
 
        setImageLabel(`Path to photo: ${result.assets[0].uri}`)
        setImageFromGallery(result.assets[0].uri) 
    }

    const submitPressed = async () => {

        if (imageFromGallery === "") {
            alert("No photo selected")
            return
        } else {
            //console.log("DEBUG: Path to image is:")
            //console.log(imageFromGallery)           
        }
 
 
        // get name of file
        // find the last / symbol
        // then get all text after the / symbol
        const filename = imageFromGallery.substring(imageFromGallery.lastIndexOf('/') + 1, imageFromGallery.length);
 
 
        //create a "path" in Firebase Storage
        const photoRef = ref(storage, filename)
 
 
        try {           
            // download the image from the phone's gallery
            console.log(`DEBUG: retrieving image data`)
            const response = await fetch(imageFromGallery)           
            // convert the image into a Blob data type
            console.log(`DEBUG: converting data to a blob`)
            // The Blob data type is used to represent file and other media streams in a database
            const blob = await response.blob()            
            // upload the blob to Firebase Storage           
            console.log(`DEBUG: Uploading data`)
            await uploadBytesResumable(photoRef, blob)           
            //alert("Done uploading!")
            console.log(`DEBUG: Done uploading!`)
        } catch (err) {
            console.log(err)
        }

        try {
            const ownerRef = doc(db, "ownerdata", auth.currentUser.uid);

            const geocodeLocation = await Location.geocodeAsync(addressUI + ', ' + cityUI);

            const athleteToInsert = {
                fname: fnameUI,
                lname: lnameUI,
                address: addressUI,
                city: cityUI,
                affiliation: affiliationUI,
                experience: experienceUI,
                owner: ownerRef,
                price: priceUI,
                pro: proUI,
                sport: sportUI,
                location: geocodeLocation[0],
                available: true,
            }

            console.log(athleteToInsert);

            const docRef = await addDoc(collection(db, "athletes"), athleteToInsert);

            clearForm();

            alert("You have added a new athlete");
        } catch (err) {
            console.log(err)
        }
 
    }

    const clearForm = () => {
        setFnameUI("");
        setLnameUI("");
        setAffiliationUI("");
        setAddressUI("");
        setCityUI("");
        setSportUI("");
        setExperienceUI(0);
        setPriceUI(0);
        setProUI(false);
        setImageFromGallery(null);
        setImageLabel("");
    }

    return (
      <View style={styles.container}>
        <Text style={styles.subtitle}>Please enter athlete information</Text>
        <View style={styles.formFieldView}>
            <Text>First name: </Text>
            <TextInput style={styles.inputBox} value={fnameUI} onChangeText={setFnameUI}/>
        </View>
        <View style={styles.formFieldView}>
            <Text>Last name: </Text>
            <TextInput style={styles.inputBox} value={lnameUI} onChangeText={setLnameUI}/>
        </View>
        <View style={styles.formFieldView}>
            <Text>Affiliation: </Text>
            <TextInput style={styles.inputBox} value={affiliationUI} onChangeText={setAffiliationUI}/>
        </View>
        <View style={styles.formFieldView}>
            <Text>Address: </Text>
            <TextInput style={styles.inputBox} value={addressUI} onChangeText={setAddressUI}/>
        </View>
        <View style={styles.formFieldView}>
            <Text>City: </Text>
            <TextInput style={styles.inputBox} value={cityUI} onChangeText={setCityUI}/>
        </View>
        <View style={styles.formFieldView}>
            <Text>Sport: </Text>
            <TextInput style={styles.inputBox} value={sportUI} onChangeText={setSportUI}/>
        </View>
        <View style={styles.formFieldView}>
            <Text>Experience: </Text>
            <TextInput style={styles.inputBox} value={experienceUI} onChangeText={setExperienceUI} keyboardType='number-pad'/>
        </View>
        <View style={styles.formFieldView}>
            <Text>Price per day: </Text>
            <TextInput style={styles.inputBox} value={priceUI} onChangeText={setPriceUI} keyboardType='numeric'/>
        </View>
        <View style={styles.formFieldView}>
            <Text>Pro: </Text>
            <Switch value={proUI} onValueChange={setProUI}/>
        </View>
        <View style={styles.formFieldView}>
            <Text>Athlete image: </Text>
            <TouchableOpacity onPress={chooseImage} style={styles.imageButton}>
                <Text style={styles.submitButtonText}>Upload image</Text>
            </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={submitPressed}>
            <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      flex:1
    },
    subtitle: {
        fontSize: 20,
        fontFamily: "Futura",
    },
    formFieldView: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10
    },
    inputBox: {
        borderWidth: 1,
        borderColor: "#ccc",
        width: 200
    },
    submitButton: {
        borderWidth: 1,
        backgroundColor: "#000",
        borderRadius: 8,
        alignItems:"center",
        padding:10,
        margin: 10
    },
    submitButtonText: {
        color: "#fff",
        fontFamily: "Futura",
        fontWeight: "bold",
        textAlign: "center"
    },
    imageButton: {
        borderWidth: 1,
        backgroundColor: "#000",
        borderRadius: 8,
        alignItems:"center",
        width: 100
    }
  });
  