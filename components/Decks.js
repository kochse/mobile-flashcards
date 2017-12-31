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

  handleDeckSelection = () => {
    this.props.navigation.navigate("DeckDetail");
  };

  renderDeck = ({item}) => {
    return (
      <TouchableOpacity style={styles.deck} onPress={this.handleDeckSelection}>
        <Text>{item.title}</Text>
        <Text>{_.size(item.questions)} cards</Text>
      </TouchableOpacity>
    );
  };

  render() {
    console.log(this.props.decks);
    if(!this.state.ready) {
      return <Text>loading...</Text>;
    }
    return (
      <View style={styles.container}>
        <FlatList
          data={_.values(this.props.decks)}
          renderItem={this.renderDeck}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  deck: {
    height: 120,
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

const mapStateToProps = state => ({
  decks: state,
});

export default connect(mapStateToProps, { receiveDecks })(Decks);