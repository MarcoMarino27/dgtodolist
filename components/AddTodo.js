import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  Switch,
  DatePickerIOS,
  Platform,
  DatePickerAndroid,
  Button,
} from 'react-native';
import {
  FormLabel,
  FormInput,
} from 'react-native-elements';
import { StackNavigator } from 'react-navigation';

StatusBar.setHidden(true);

export default class AddTodo extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Aggiungi una Todo',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'rgb(4,159,239)',
      },
      headerTitleStyle: {
        fontSize: 20,
      },
    };
  };

  state = {
    text: '',
    done: false,
    remind: false,
    chosenDate:new Date(),
    id:0,
  };

  componentWillMount() {
    const { navigation } = this.props;
    const stato = navigation.getParam('stato');
    if (stato){
      console.log(stato)
      this.setState({
        text: stato.text,
        chosenDate: stato.date,
        remind: stato.remind,
        done:stato.done,
        id:stato.id,
      });
    }
  }

  _onAdd = () => {
    const todo = {
      done: this.state.done,
      text: this.state.text,
      date: this.state.chosenDate,
      remind: this.state.remind,
      id:this.state.id,
    };
    const { navigation } = this.props;
    const stato = navigation.getParam('stato');
    let index = 0;
    if (stato) index=1;
    else index=0;
    const onAdd = this.props.navigation.state.params.onAdd;
    onAdd(todo,index);
    this.props.navigation.goBack();
  };

  setDate = newDate => {
    this.setState({ chosenDate: newDate });
  };

  DueDateAndroid = async () => {
    if (!this.state.remind) {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: new Date(),
      });
      if (action === DatePickerAndroid.dateSetAction) {
        this.setState({ chosenDate: new Date(year, month, day) });
      } else this.setState({ remind: !this.state.remind });
    }
  };

  DueDate = () => {
    this.setState({ remind: !this.state.remind });
    Platform.OS == 'ios' ? null : this.DueDateAndroid();
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <View>
          <FormLabel labelStyle={{ fontSize: 28 }}>Nome</FormLabel>
          <FormInput
            value={this.state.text}
            inputStyle={{ fontSize: 28 }}
            onChangeText={value => this.setState({ text: value })}
            placeholder="Metti il nome della todo"
            onSubmitEditing={this._onAdd}
          />
          <View style={styles.switch}>
            <FormLabel labelStyle={{ fontSize: 28 }}>
              Vuoi ricordarlo ?
            </FormLabel>
            <Switch
              onValueChange={this.DueDate}
              value={this.state.remind}
              style={{
                transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }],
                marginTop: 14,
              }}
              onTintColor={'rgb(4,159,239)'}
              tintColor={'lightgray'}
            />
          </View>
          {this.state.remind && Platform.OS == 'ios' ? (
            <DatePickerIOS
              date={this.state.chosenDate}
              onDateChange={this.setDate}
            />
          ) : null}
          {this.state.remind ? (
            <FormLabel labelStyle={{ fontSize: 24 }}>
              {this.state.chosenDate.toString()}
            </FormLabel>
          ) : (
            <FormLabel labelStyle={{ fontSize: 24 }}>Data non selezionata</FormLabel>
          )}
        </View>
        <Button title="Salva" onPress={this._onAdd} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  switch: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
