import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { StyleSheet, Text, View } from 'react-native';
import Button from './Button';

const handleStartQuiz = (navigate, key, title) => {
  navigate('Quiz', {
    key,
    title,
  });
};

const handleAddQuestion = (navigate, key) => {
  navigate('AddQuestion', { key });
};

const SingleDeck = ({ navigation, deckKey, deck }) => {
  const numOfCards = _.size(deck.questions);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{deck.title}</Text>
      <Text style={styles.counter}>{numOfCards !== 0 ? numOfCards + ' Cards' : '0 Cards'}</Text>
      <View>
        <Button title="Start Quiz" onPress={() => handleStartQuiz(navigation.navigate, deckKey, deck.title)} disabled={numOfCards === 0}/>
        <Button title="Add Question" onPress={() => handleAddQuestion(navigation.navigate, deckKey)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    margin: 10,
  },
  counter: {
    fontSize: 18,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    padding: 40,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#5889bd',
  },
});

const mapStateToProps = (state, ownProps) => ({
  deckKey: ownProps.navigation.state.params.key,
  deck: state[ownProps.navigation.state.params.key],
});

export default connect(mapStateToProps, {})(SingleDeck);
