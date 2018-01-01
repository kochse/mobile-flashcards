import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

const Button = ({ title, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    padding: 8,
    margin: 3,
    backgroundColor: '#ccc',
  },
  text: {
    textAlign: 'center',
  },
});

export default Button;
