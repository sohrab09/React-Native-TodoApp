import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Alert, TouchableWithoutFeedback, Keyboard, Text } from 'react-native';
import Header from './Components/header';
import TodoItem from './Components/todoItem';
import AddTodo from './Components/addTodo';
import moment from 'moment';

export default function App() {
  const [todos, setTodos] = useState([
    { text: 'Learn, React Native.', key: '1' },
    { text: 'Learn, How React Native Works.', key: '2' },
    { text: 'Learn, How to call an API.', key: '3' },
    { text: 'Learn, How to build an Android File.', key: '4' },
    { text: 'Learn, How to build an IOS File.', key: '5' },
  ]);

  const [date, setDate] = useState(new Date());

  const pressHandler = (key) => {
    setTodos(prevTodos => {
      return prevTodos.filter(todo => todo.key != key);
    });
  };

  const submitHandler = (text) => {
    if (text.length > 3) {
      setTodos(prevTodos => {
        return [
          { text, key: Math.random().toString() },
          ...prevTodos
        ];
      });
    } else {
      Alert.alert('OOPS', 'Todo must be over 3 characters long', [
        { text: 'Understood', onPress: () => console.log('alert closed') }
      ]);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
    }}>
      <View style={styles.container}>
        <Header />
        <View style={styles.content}>
          <View>
            <Text style={styles.date}>Today: {moment(date).format('DD-MM-YYYY')}</Text>
          </View>
          <AddTodo submitHandler={submitHandler} />
          <View style={styles.list}>
            <FlatList
              data={todos}
              renderItem={({ item }) => (
                <TodoItem item={item} pressHandler={pressHandler} />
              )}
            />
          </View>
        </View>
        <View>
          <Text style={styles.design}>Design and Develop by Sohrab</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  date: {
    textAlign: 'center',
    color: '#ededed',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  content: {
    padding: 20,
    flex: 1,
  },
  list: {
    marginTop: 10,
    flex: 1,
  },

  design: {
    color: '#33ccff',
    textAlign: 'center',
    fontSize: 12,
  }

});