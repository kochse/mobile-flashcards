import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { addDeck } from '../actions';
import { saveDeck } from '../utils/api';
import { uuidv4 } from '../utils/helpers';
import Input from './Input';
import Button from './Button';

class AddDeck extends React.Component {
  state = {
    title: '',
  };

  handleChangeTitle = title => {
    this.setState({ ...this.state, title });
  };

  handleSubmit = () => {
    const { title } = this.state;
    const { addDeck, navigation } = this.props;
    const key = uuidv4();
    const deck = { [key]: { title, questions: [] } };
    addDeck(deck);
    saveDeck(deck);
    const resetAction = NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: 'Decks'}),
        NavigationActions.navigate({ routeName: 'DeckDetail', params: { key, title } }),
      ],
    });
    navigation.dispatch(resetAction);
    this.setState({ ...this.state, title: '' });
  };

  render() {
    return (
      <View style={styles.container}>
        <Input label="Enter Title" value={this.state.title} onChangeText={this.handleChangeTitle} />
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

export default connect(undefined, { addDeck })(AddDeck);
