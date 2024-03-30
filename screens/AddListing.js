import { StyleSheet, Text, View } from 'react-native';

export default function AddListingScreen() {
    return (
      <View style={styles.container}>
        <Text>Add Listings Screen!</Text>
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
  