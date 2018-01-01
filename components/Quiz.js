import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import FlipCard from 'react-native-flip-card';
import Button from './Button';

class Quiz extends React.Component {
  state = {
    current: 0,
    correct: 0,
    flip: false
  };

  handleCorrect = () => {
    const { current, correct } = this.state;
    this.setState({ flip: false, current: current + 1, correct: correct + 1 });
  };

  handleInCorrect = () => {
    const { current } = this.state;
    this.setState({ ...this.state, flip: false, current: current + 1 });
  };

  handleRestart = () => {
    this.setState({ flip: false, current: 0, correct: 0 });
  };

  handleExit = () => {
    this.props.navigation.goBack();
  };

  handleShowAnswer = () => {
    this.setState({ ...this.state, flip: true });
  };

  render() {
    const { title, questions, size } = this.props;
    const { current, correct, flip } = this.state;
    const currentQuestion = _.nth(questions, current);
    if(!currentQuestion) {
      return (
        <View style={styles.result}>
          <Text style={styles.counter}>Correct: {correct} / {size}</Text>
          <Button title="Restart" onPress={this.handleRestart} />
          <Button title="Back to Deck" onPress={this.handleExit} />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Text style={styles.counter}>{current + 1} / {size}</Text>
        <FlipCard
          style={styles.card}
          flip={flip}
          flipHorizontal={true}
          flipVertical={false}
        >
          {/* Face Side */}
          <View style={styles.face}>
            <Text>Question</Text>
            <Text>{_.get(currentQuestion, 'question')}</Text>
            <Button title="Show Answer" onPress={this.handleShowAnswer} />
          </View>
          {/* Back Side */}
          <View style={styles.back}>
            <Text>Answer</Text>
            <Text>{_.get(currentQuestion, 'answer')}</Text>
            <View>
              <Button title="Correct" onPress={this.handleCorrect} />
              <Button title="Incorrect" onPress={this.handleInCorrect} />
            </View>
          </View>
        </FlipCard>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  result: {
    padding: 20,
  },
  container: {
    flex: 1,
  },
  card: {
  },
  counter: {
    padding: 20,
  },
  face: {
    height: 300,
    justifyContent: 'space-between',
    backgroundColor: '#fdb700',
    alignItems: 'center',
    padding: 40,
  },
  back: {
    height: 300,
    justifyContent: 'space-between',
    backgroundColor: '#1496fd',
    alignItems: 'center',
    padding: 40,
  },
});

const mapStateToProps = (state, ownProps) => {
  const deck = state[ownProps.navigation.state.params.key];
  return {
    title: deck.title,
    questions: deck.questions,
    size: _.size(deck.questions),
  };
};

export default connect(mapStateToProps)(Quiz);
