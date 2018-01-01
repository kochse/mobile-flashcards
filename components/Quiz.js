import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { StyleSheet, Text, View } from 'react-native';
import FlipCard from 'react-native-flip-card';
import Button from './Button';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers';

class Quiz extends React.Component {
  state = {
    current: 0,
    correct: 0,
    flip: false,
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

  handleFinishDeck = () => {
    clearLocalNotification().then(setLocalNotification);
  };

  render() {
    const { questions, size } = this.props;
    const { current, correct, flip } = this.state;
    const currentQuestion = _.nth(questions, current);
    if (!currentQuestion) {
      this.handleFinishDeck();
      return (
        <View style={styles.result}>
          <Text style={styles.counter}>
            Correct: {correct} / {size}
          </Text>
          <Button title="Restart" onPress={this.handleRestart} />
          <Button title="Back to Deck" onPress={this.handleExit} />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <FlipCard
          style={styles.card}
          flip={flip}
          flipHorizontal
          flipVertical={false}
          clickable={false}
          perspective={1000}>
          {/* Face Side */}
          <View style={styles.face}>
            <Text style={styles.counter}>
              {current + 1} / {size}
            </Text>
            <Text>Question</Text>
            <Text>{_.get(currentQuestion, 'question')}</Text>
            <Button title="Show Answer" onPress={this.handleShowAnswer} />
          </View>
          {/* Back Side */}
          <View style={styles.back}>
            <Text style={styles.counter}>
              {current + 1} / {size}
            </Text>
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
    backgroundColor: '#5889bd',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  card: {
    height: 300,
  },
  counter: {
    padding: 20,
  },
  face: {
    height: 300,
    justifyContent: 'space-between',
    backgroundColor: '#aaaaaa',
    alignItems: 'center',
    padding: 40,
  },
  back: {
    height: 300,
    justifyContent: 'space-between',
    backgroundColor: '#5889bd',
    alignItems: 'center',
    padding: 40,
  },
});

const mapStateToProps = (state, ownProps) => {
  const deck = state[ownProps.navigation.state.params.key];
  return {
    questions: deck.questions,
    size: _.size(deck.questions),
  };
};

export default connect(mapStateToProps)(Quiz);
