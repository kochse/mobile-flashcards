import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { addQuestion } from '../actions';
import { addCardToDeck } from '../utils/api';
import Input from './Input';
import Button from './Button';

class AddQuestion extends React.Component {
  state = {
    question: '',
    answer: '',
  };

  handleChangeQuestion = question => {
    this.setState({ ...this.state, question });
  };

  handleChangeAnswer = answer => {
    this.setState({ ...this.state, answer });
  };

  handleSubmit = () => {
    const { question, answer } = this.state;
    const { addQuestion, goBack, deckKey } = this.props;
    addQuestion({ question, answer });
    addCardToDeck({ card: { question, answer }, key: deckKey });
    goBack();
  };

  render() {
    return (
      <View style={styles.container}>
        <Input
          label="Question"
          value={this.state.question}
          onChangeText={this.handleChangeQuestion}
        />
        <Input
          label="Answer"
          value={this.state.answer}
          onChangeText={this.handleChangeAnswer}
        />
        <Button title="Submit" onPress={this.handleSubmit} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

const mapStateToProps = (state, ownProps) => ({
  deckKey: ownProps.navigation.state.params.key,
});

const mapDispatchToProps = (dispatch, { navigation }) => {
  const { key } = navigation.state.params;
  return {
    addQuestion: question => dispatch(addQuestion({ ...question, key })),
    goBack: () => navigation.goBack(),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddQuestion);