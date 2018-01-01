import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { getDecks } from '../utils/api';
import { receiveDecks } from '../actions';

class Decks extends React.Component {
  state = {
    ready: false,
  };

  componentDidMount() {
    getDecks()
      .then(decks => this.props.receiveDecks(decks))
      .then(() => this.setState(() => ({ ready: true })));
  }

  handleDeckSelection = (key, title) => {
    this.props.navigation.navigate('DeckDetail', { key, title });
  };

  renderDeck = ({ item }) => {
    return (
      <TouchableOpacity style={styles.deck} onPress={() => this.handleDeckSelection(item.key, item.title)}>
        <Text style={styles.deckTitle}>{item.title}</Text>
        <Text>{_.size(item.questions)} cards</Text>
      </TouchableOpacity>
    );
  };

  render() {
    if (!this.state.ready) {
      return <Text>loading...</Text>;
    }
    let decks = _.map(this.props.decks, (value, key) => {
      return { key, ...value };
    });
    return (
      <View style={styles.container}>
        <FlatList
          data={decks}
          renderItem={this.renderDeck}
          keyExtractor={item => item.key}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  deckTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  deck: {
    height: 120,
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});

const mapStateToProps = state => ({
  decks: state,
});

export default connect(mapStateToProps, { receiveDecks })(Decks);