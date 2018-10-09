import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {vibrate} from './utils'

class Count extends React.Component {
	shouldComponentUpdate(){
		return !this.props.comp
	}																							
	render() {
		return (
			<Text style={{ fontSize: 70 }}>{this.props.min}:{this.props.sec}</Text>
		);
	}
}

export default class App extends React.Component {
	constructor(){
		super();
		this.state={
			min : '00',
			prevmin : '00',
			sec : '00',
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
		this.setState(prevState => ({ min : prevState.prevmin, sec : '00' }))
		this.setState({ completed : false })
		this.setState({ isOn : false })
	}
	handlePlay = () => {
		this.setState({ isOn : true })
		// console.log(this.state.isOn);
	}
	handlePause = () => {
		this.setState({ isOn : false })
	}
	setPomodoro = () => {
		this.setState({ min: '25', sec: '00', prevmin: '25', completed : false, isOn : false })
	}
	setShortbr = () => {
		this.setState({ min: '05', sec: '00', prevmin: '05', completed : false, isOn : false })
	}
	setLongbr = () => {
		this.setState({ min: '15', sec: '00', prevmin: '15', completed : false, isOn : false })
	}
	render() {
		return (
			<View style={styles.container}>
				<View style={{ alignItems: 'center', bottom: '25%' }}>
					<Count min={this.state.min} sec={this.state.sec} comp={this.state.completed}/>
				</View>
				<View style={{ justifyContent: 'space-around', flexDirection: 'row', bottom: '30%' }}>
					<Button title='Reset' onPress={this.handleReset} />
					<Button title='Play' onPress={this.handlePlay} />
					<Button title='Pause' onPress={this.handlePause} />
				</View>
				<View style={{ flexDirection: 'row', justifyContent: 'space-around', bottom: '20%' }}>
					<Button title='Pomodoro' onPress={this.setPomodoro} />
					<Button title='Short-break' onPress={this.setShortbr} />
					<Button title='Long-break' onPress={this.setLongbr} />
				</View>

			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'center',
	},
});
