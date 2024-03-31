import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function LoginScreen({navigation}) {

    const goToCreate = () => {
        navigation.navigate("Create Account");
    }
    const onBtnPress = () => {
        navigation.navigate("Home");
    }

    return (
      <View style={styles.container}>
        <Text>Listings Screen!</Text>
        <Pressable style={{borderWidth:1, padding:20}} onPress={onBtnPress}>
            <Text>Go to homepage</Text>
        </Pressable>
        <Pressable style={{borderWidth:1, padding:20}} onPress={goToCreate}>
            <Text>Create Account</Text>
        </Pressable>
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
  