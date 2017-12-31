import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';

class AddQuestion extends React.Component {
  render() {
    return (
      <View>
        <Text>Question</Text>
        <Text>Answer</Text>
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

export default AddQuestion;