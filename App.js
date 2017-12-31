import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { MaterialIcons } from '@expo/vector-icons'
import { Constants } from 'expo';
import reducer from './reducers';
import Decks from './components/Decks';
import DeckDetail from './components/DeckDetail';
import AddDeck from './components/AddDeck';
import AddQuestion from './components/AddQuestion';

const Tabs = TabNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'DECKS',
      tabBarIcon: ({ tintColor }) => <MaterialIcons name='library-books' size={30} color={tintColor} />
    },
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'NEW DECK',
      tabBarIcon: ({ tintColor }) => <MaterialIcons name='add-box' size={30} color={tintColor} />
    },
  },
});


const MainNavigator = StackNavigator({
  Decks: {
    screen: Tabs,
  },
  DeckDetail: {
    screen: DeckDetail,
  },
  AddQuestion: {
    screen: AddQuestion,
  },
});

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={styles.container}>
          <View style={styles.statusBar} />
          <MainNavigator />
        </View>
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
    backgroundColor: '#ccc',
    height: Constants.statusBarHeight,
  },
});
