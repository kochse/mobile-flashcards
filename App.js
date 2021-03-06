import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { MaterialIcons } from '@expo/vector-icons';
import { Constants } from 'expo';
import { logger } from 'redux-logger';
import reducer from './reducers';
import Decks from './components/Decks';
import DeckDetail from './components/DeckDetail';
import AddDeck from './components/AddDeck';
import AddQuestion from './components/AddQuestion';
import Quiz from './components/Quiz';
import { setLocalNotification } from './utils/helpers';

const Tabs = TabNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'ALL DECKS',
      tabBarIcon: ({ tintColor }) => (
        <MaterialIcons name="library-books" size={30} color={tintColor} />
      ),
    },
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'NEW DECK',
      tabBarIcon: ({ tintColor }) => <MaterialIcons name="add-box" size={30} color={tintColor} />,
    },
  },
});

const MainNavigator = StackNavigator({
  Decks: {
    screen: Tabs,
    navigationOptions: {
      title: 'Decks',
    },
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.title}`,
    }),
  },
  AddQuestion: {
    screen: AddQuestion,
    navigationOptions: {
      title: 'Add Question',
    },
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.title} Quiz`,
    }),
  },
});

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={createStore(reducer, applyMiddleware(logger))}>
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
    backgroundColor: '#dddddd',
    height: Constants.statusBarHeight,
  },
});
