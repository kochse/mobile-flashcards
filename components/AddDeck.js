import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

class AddDeck extends React.Component {
  render() {
    return (
      <View>
        <Text>Enter title</Text>
        <Text>Submit</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  deck: {
    height: 120,
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default AddDeck;