import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { addDeck } from '../actions';
import { saveDeck } from '../utils/api';
import { uuidv4 } from '../utils/helpers'
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
    const { addDeck, goBack } = this.props;
    const deck = { [uuidv4()]: { title, questions: [] } };
    addDeck(deck);
    saveDeck(deck);
    goBack();
    this.setState({ ...this.state, title: '' });
  };

  render() {
    return (
      <View style={styles.container}>
        <Input
          label="Enter Title"
          value={this.state.title}
          onChangeText={this.handleChangeTitle}
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

const mapDispatchToProps = (dispatch, { navigation }) => ({
  addDeck: deck => dispatch(addDeck(deck)),
  goBack: () => navigation.goBack(),
});

const mapStateToProps = () => ({});


export default connect(mapStateToProps, mapDispatchToProps)(AddDeck);