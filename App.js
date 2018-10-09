import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {vibrate} from './utils'

class Count extends React.Component {
	shouldComponentUpdate(){
		return !this.props.comp
	}																							
	render() {
		return (
			<Text style={{ fontSize: 50 }}>{this.props.min}:{this.props.sec}</Text>
		);
	}
}

export default class App extends React.Component {
	constructor(){
		super();
		this.state={
			min : '00',
			sec : '10',
			isOn : false,
			completed : false,
		}
	}
	componentDidMount(){
			this.interval = setInterval(this.dec, 1000)
	}
	// componentWillUnmount() {
	// 	clearInterval(this.interval)
	// }
	dec = () => {
		// console.log(this.state.isOn & !this.state.completed)
		if(this.state.isOn & !this.state.completed){	
			if(this.state.sec > 0){
				this.setState(prevState => ({ sec : String(parseInt(prevState.sec) - 1) }))
				if(parseInt(this.state.sec) < 10){
					this.setState({ sec : '0' + String(this.state.sec)  })
				}
			}
			else{
				this.setState(prevState => ({ min : String(parseInt(prevState.min) - 1), sec : '59' }))
				if(parseInt(this.state.min) < 10){
					this.setState({ min : '0' + String(this.state.min) })
				}
			}
			if(parseInt(this.state.min) == '00' && parseInt(this.state.sec) == '00' ){
				this.setState({ completed : true })
				this.setState({ isOn : false })
				// clearInterval(this.interval)
				vibrate()
			}
		}
	}
	handleReset = () => {
		this.setState({ min : '00', sec : '10' })
		this.setState({ completed : false })
		this.setState({ isOn : false })
	}
	toggleisOn = () => {
		this.setState(prevState =>({ isOn : !prevState.isOn }))
		// console.log(this.state.isOn);
	}
	render() {
		return (
			<View style={styles.container}>
				<Count min={this.state.min} sec={this.state.sec} comp={this.state.completed}/>
				<View style={{flexDirection: "row"}}>
				<Button title='Reset' onPress={this.handleReset} />
				<Button title='Play' onPress={this.toggleisOn} />
				<Button title='Pause' onPress={this.toggleisOn} />
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
