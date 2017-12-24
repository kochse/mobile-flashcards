import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Constants } from 'expo';
import reducer from './reducers';

class ListScreen extends React.Component {
  state = {
    decks: [
      { id: 0, title: "Deck 1", cards: 0 },
      { id: 1, title: "Deck 2", cards: 0 },
      { id: 2, title: "Deck 3", cards: 0 },
    ]
  }

  handleDeckSelection = () => {
    this.props.navigation.navigate("Deck");
  }

  renderDeck = ({item}) => {
    return (
      <TouchableOpacity style={styles.deck} onPress={this.handleDeckSelection}>
        <Text>{item.title}</Text>
        <Text>{item.cards} cards</Text>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.decks}
          renderItem={this.renderDeck}
          keyExtractor={(item) => item.id }
        />
      </View>
    );
  }
}

class SingleDeckScreen extends React.Component {
  render() {
    return (
      <Text>Single Screen</Text>
    );
  }
}


const MainNavigator = StackNavigator({
  List: {
    screen: ListScreen,
  },
  Deck: {
    screen: SingleDeckScreen,
  },
});

export default class App extends React.Component {


  render() {

    return (
      <Provider store={createStore(reducer)}>
        <MainNavigator/>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
  statusBar: {
    backgroundColor: "#C2185B",
    height: Constants.statusBarHeight,
  },
  deck: {
    height: 120,
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
