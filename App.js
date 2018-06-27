import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { StackNavigator } from 'react-navigation';
import TodoList from './components/TodoList';
import Todo from './components/Todo';
import AddTodo from './components/AddTodo';

const App = StackNavigator(
  {
    TodoList: TodoList,
    Todo: Todo,
    AddTodo: AddTodo,
  },
  {
    initialRouteName: 'TodoList',
  }
);

export default App;
