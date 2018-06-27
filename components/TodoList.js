import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import {ButtonGroup} from 'react-native-elements';
import Todo from './Todo';
import { Octicons } from '@expo/vector-icons';
/*
const ALL = 0;
const COMPLETED = 1;
const ACTIVE = 2;
*/
export default class Home extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Home',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'rgb(4,159,239)',
      },
      headerTitleStyle: {
        fontSize: 26,
      },
      headerRight: (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('AddTodo', {
              onAdd: navigation.state.params.add,
            })
          }>
          <Text style={{ color: 'white', fontSize: 34, paddingRight: 8 }}>
            +
          </Text>
        </TouchableOpacity>
      ),
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.state.params.clear()}>
          <Octicons
            name="trashcan"
            size={30}
            color="white"
            style={{ paddingLeft: 4 }}
          />
        </TouchableOpacity>
      ),
    };
  };

  state = {
    todolist: [],
  };

  _clear = async () => {
    await AsyncStorage.clear();
    this.setState({ todolist: [] });
    //this.forceUpdate();
  };

  async componentDidMount() {
    this.props.navigation.setParams({ add: this._add, clear: this._clear });
    await AsyncStorage.getItem('todolist').then(response =>
      this.setState({ todolist: JSON.parse(response) || this.state.todolist })
    );
    //this.forceUpdate();
  }

  _add = (todo, index) => {
    try {
      let newList = [];
      if (index == 0) {
        newList = [...this.state.todolist, todo];
        //this.forceUpdate();
      } else {
        newList = this.state.todolist.map(
          currentTodo =>
            currentTodo.id == todo.id ?  todo  : currentTodo
        );
      }
      this.setState({ todolist: newList });
      AsyncStorage.setItem('todolist', JSON.stringify(newList));
    } catch (error) {
      alert('Errore nel salvataggio della todo');
    }
  };

  _toggle = item => {
    let newTodolist = this.state.todolist.map(
      currentTodo =>
        currentTodo == item
          ? { ...currentTodo, done: !currentTodo.done }
          : currentTodo
    );
    this.setState({ todolist: newTodolist });
    AsyncStorage.setItem('todolist', JSON.stringify(newTodolist));
  };
  
  _del = item => {
    let newTodolist = this.state.todolist.filter(currentTodo => currentTodo != item);
    this.setState({ todolist: newTodolist });
    AsyncStorage.setItem('todolist', JSON.stringify(newTodolist));
  }
  
  
  _keyExtractor = (item, index) => {
    item.id = index;
    return String(index);
  };

  _renderItem = ({ item }) => (
    <Todo
      navigation={this.props.navigation}
      onToggle={() => this._toggle(item)}
      onDel={() => this._del(item)}
      data={item}
    />
  ); //text è il nome della props
 /* 
 filterTodolist = (visibility) => {
   this.setState({selectedIndex:visibility});
  switch (visibility) {
    case ACTIVE:
      this.setState({todolist2 :this.state.todolist.filter(item => item.done)});
      break;
    case COMPLETED:
        this.setState({todolist2 :this.state.todolist.filter(item => !item.done)});
       break;
    default:
      this.state.todolist;
      break;
  }
};
<ButtonGroup
            buttons={['ALL', 'COMPLETED', 'ACTIVE']}
            selectedIndex={this.state.selectedIndex}
            selectedBackgroundColor={'rgb(4,159,239)'}
            selectedTextStyle={{ color: 'white' }}
            onPress={index => this.filterTodolist(index)}
          />

*/

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.todolist}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
