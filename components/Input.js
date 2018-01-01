import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

const Input = ({ label, value, onChangeText }) => (
  <View style={styles.group}>
    <Text style={styles.label}>{label}</Text>
    <TextInput style={styles.input} value={value} onChangeText={onChangeText} />
  </View>
);

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: 8,
    margin: 3,
  },
  group: {
    marginBottom: 15,
  },
  label: {
    textAlign: 'center',
    marginBottom: 5,
  },
});

export default Input;
