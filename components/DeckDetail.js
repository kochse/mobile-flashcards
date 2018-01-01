import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { StyleSheet, Text, View } from 'react-native';
import Button from './Button';

class SingleDeck extends React.Component {
  handleStartQuiz = () => {
    this.props.navigation.navigate('Quiz', { key: this.props.deckKey });
  };

  handleAddQuestion = () => {
    this.props.navigation.navigate('AddQuestion', { key: this.props.deckKey });
  };

  render() {
    const { deck } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{deck.title}</Text>
        <Text style={styles.counter}>{_.size(deck.questions)} Cards</Text>
        <Button title="Start Quiz" onPress={this.handleStartQuiz} />
        <Button title="Add Question" onPress={this.handleAddQuestion} />
      </View>
    );
  }
}

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
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = (state, ownProps) => ({
  deckKey: ownProps.navigation.state.params.key,
  deck: state[ownProps.navigation.state.params.key],
});

export default connect(mapStateToProps, {})(SingleDeck);
