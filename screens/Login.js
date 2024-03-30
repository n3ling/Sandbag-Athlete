import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function LoginScreen({navigation}) {

    const onBtnPress = () => {
        navigation.navigate("Home");
        alert('Btn pressed, redirecting to homepage')
    }

    return (
      <View style={styles.container}>
        <Text>Listings Screen!</Text>
        <Pressable style={{borderWidth:1, padding:20}} onPress={onBtnPress}>
            <Text>Go to homepage</Text>
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
  