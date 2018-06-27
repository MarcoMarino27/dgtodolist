import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
//import { StackNavigator } from 'react-navigation';
StatusBar.setHidden(true);
import Swipeout from 'react-native-swipeout';

export default class Todo extends Component {
  /*state = {
    done: false,
    text: '',
    date: '',
    remind: false,
  };
  
  //Ciao

  componentWillMount() {
    this.setState({
      text: this.props.todo.text,
      done: this.props.todo.done,
      date: this.props.todo.date,
      remind: this.props.todo.remind,
    });
  }*/
  
  elimina = () => {
    Alert.alert('Vuoi eliminare questo elemento ?', 'Scegli un opzione', [
      { text: 'Si', onPress: () => this.props.onDel() },
      { text: 'No', onPress: () => null },
    ]);
  };
 
  render() {
    
    var swipeoutBtns = [
      {
        text: 'Eliminami',
        type: 'delete',
        onPress: this.elimina,
      },
    ];

    return (
      <Swipeout
        right={swipeoutBtns}
        backgroundColor="rgb(4,159,239)"
        close={true}>
        <View style={styles.box}>
          <TouchableOpacity onPress={this.props.onToggle}>
            {this.props.data.done ? (
              <MaterialIcons name="check-box" size={30} color="#2F4F4F" />
            ) : (
              <MaterialIcons
                name="check-box-outline-blank"
                size={30}
                color="#2F4F4F"
              />
            )}
          </TouchableOpacity>
          <Text style={styles.text}> {this.props.data.text} </Text>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('AddTodo', {
                onAdd: this.props.navigation.state.params.add,
                stato: this.props.data,
              })
            }
            onLongPress={this.elimina}>
            <Entypo name="chevron-right" size={30} color="#2F4F4F" />
          </TouchableOpacity>
        </View>
      </Swipeout>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    backgroundColor: '#B0C4DE',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
  },
  text: {
    fontSize: 28,
    color: '#1E90FF',
  },
});
