import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function CreateAccountScreen({navigation}) {

    const onBtnPress = () => {
        navigation.navigate("Home");
    }

    return (
      <View style={styles.container}>
        <Text>Create Account Screen!</Text>
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
  