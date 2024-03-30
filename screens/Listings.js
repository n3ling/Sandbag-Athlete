import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function ListingScreen() {

    return (
      <View style={styles.container}>
        <Text>Listing Screen!</Text>
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
  