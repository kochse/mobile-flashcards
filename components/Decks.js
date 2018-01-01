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
      <TouchableOpacity
        style={styles.deck}
        onPress={() => this.handleDeckSelection(item.key, item.title)}>
        <Text style={styles.deckTitle}>{item.title}</Text>
        <Text>{_.size(item.questions)} cards</Text>
      </TouchableOpacity>
    );
  };

  render() {
    if (!this.state.ready) {
      return <Text>loading...</Text>;
    }
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.decks}
          renderItem={this.renderDeck}
          keyExtractor={item => item.key}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
  },
  deckTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  deck: {
    height: 120,
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dddddd',
  },
});

const mapStateToProps = state => {
  let decks = _.map(state, (value, key) => {
    return { key, ...value };
  });
  decks = _.sortBy(decks, ['title']);
  return { decks };
};

export default connect(mapStateToProps, { receiveDecks })(Decks);
