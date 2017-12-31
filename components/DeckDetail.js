import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

class SingleDeck extends React.Component {
  render() {
    return (
      <View>
        <Text>Deck Title</Text>
        <Text>Number of Cards</Text>
        <Text>Start Quiz</Text>
        <Text>Add Question</Text>
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

export default SingleDeck;