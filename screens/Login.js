import { Pressable, SafeAreaView, StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { useState } from 'react';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function LoginScreen({navigation}) {

    const [emailUI, setEmailUI] = useState('');
    const [passwordUI, setPasswordUI] = useState('');
    const [loginErrorMessage, setLoginErrorMessage] = useState('');

    const loginPressed = async () => {
        try {
            await signInWithEmailAndPassword(auth, emailUI, passwordUI);
            console.log(`${auth.currentUser.uid}`)
        } catch (err) {
            console.log(err);
        }

        if(auth.currentUser === null) {
            setLoginErrorMessage("Incorrect email or password");
        }
        else {
            setEmailUI("");
            setPasswordUI("");
            setLoginErrorMessage("");
            navigation.navigate("Home");
        }
    }

    const goToCreate = () => {
        navigation.navigate("Create Account");
    }

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
            <Text style={styles.title}>Sandbag</Text>
            <Text style={styles.subtitle}>Athlete</Text>
            <TextInput style={[styles.loginTextInput, {marginBottom: 0}]} placeholder='example@email.com' value={emailUI} onChangeText={setEmailUI} />
            <TextInput style={styles.loginTextInput} placeholder='password' value={passwordUI} onChangeText={setPasswordUI} secureTextEntry={true} />
            <Pressable style={styles.loginButton} onPress={loginPressed}>
                <Text style={styles.loginButtonText}>Login</Text>
            </Pressable>
            {loginErrorMessage && (
                <Text style={styles.error}>{loginErrorMessage}</Text>
            )}
        </View>
        <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account?</Text>
            <Button title='Create an account here' onPress={goToCreate} />
        </View>
      </SafeAreaView>
    );
  }
  
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    footer: {
        alignItems: 'center',
        marginBottom: 25
    },
    footerText: {
        fontSize: 14,
        color: "#555"
    },
    title: {
        fontSize: 75,
        fontFamily: "Futura-CondensedExtraBold",
    },
    subtitle: {
        fontSize: 20,
        fontFamily: "Futura",
        paddingLeft: 210,
        marginBottom: 30
    },
    loginTextInput: {
        borderWidth: 1,
        padding: 7,
        borderRadius: 5,
        width: 300,
        margin: 10
    },
    loginButton: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 7,
        margin: 10,
        backgroundColor: "#000",
        width: 150,
        height: 40,
        alignItems: "center",
    },
    loginButtonText: {
        color: "#fff",
        fontFamily: "Futura",
        fontWeight: "bold",
        fontSize: 18
    },
    error: {
        color: "#f00",
        marginTop: 3
    }
  });
  