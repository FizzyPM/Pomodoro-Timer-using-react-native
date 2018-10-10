import React from "react";
import {View, Text, Button, ScrollView, Switch, TextInput, Alert} from "react-native";
// import {Constants} from 'expo'

let id = 0;
const Todo = props => (
	<View style={{ flexDirection: 'row', alignItems: 'center', flex:1, justifyContent:'space-between' }}>
    	<Switch value={props.todo.checked} onValueChange={props.onPressed} />
		<Text>{props.todo.text}</Text>
		<Button onPress={props.onDelete} title="delete" />
	</View>
);

export default class App extends React.Component {
	constructor() {
		super();
		this.state = {
			todos: [] ,
			text : ''
		};
	}
	addTodo() {
		if(this.state.text == ''){
			Alert.alert('Please enter something!');
			return
		}
		this.textInput.clear()
		this.setState({
			todos: [...this.state.todos, { id: id++, text: this.state.text, checked: false }]
		});
		this.setState({ text:'' })
	}
	deleteTodo(id) {
		this.setState({ todos: this.state.todos.filter(todo => todo.id !== id) });
	}
	toggleTodo(id) {
		this.setState({
			todos: this.state.todos.map(todo => {
				if (todo.id !== id) return todo;
				return {
					id: todo.id,
					text: todo.text,
					checked: !todo.checked
				};
			})
		});
	}
	render() {
		return (
			<View  style={{ flex: 1 }}>
				<Text>Total Todos: {this.state.todos.length} </Text>
				<Text>
					Unchecked Todos:{this.state.todos.filter(todo => todo.checked === false).length}
				</Text>
				<TextInput
					style={{height: 40}}
					placeholder=""
					ref={input => { this.textInput = input }}
					onChangeText={(text) => this.setState({text})}
        		/>
				<Button onPress={() => this.addTodo()} title="Add Todo" />
				<ScrollView style={{ flex:1 }}>
					{this.state.todos.map(todo => (
						<Todo
							todo={todo}
							onDelete={() => this.deleteTodo(todo.id)}
							onPressed={() => this.toggleTodo(todo.id)}
						/>
					))}
				</ScrollView>
			</View>
		);
	}
}

