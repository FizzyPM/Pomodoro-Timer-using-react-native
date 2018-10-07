import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {vibrate} from './utils'

class Count extends React.Component {
	// shouldComponentUpdate(){
	// 	// console.log('updating?');
	// }																							
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
			min : '25',
			sec : '00',
		}
	}
	componentDidMount(){
		this.interval = setInterval(this.dec, 1000)
	}
	// componentWillUnmount() {
	// 	clearInterval(this.interval)
	// }
	dec = () => {
		if(this.state.sec > 0){
			this.setState(prevState => ({ sec : String(parseInt(prevState.sec) - 1) }))
			if(parseInt(this.state.sec) < 10){
				this.setState({ sec : '0' + String(this.state.sec)  })
			}
		}
		else{
			this.setState(prevState => ({ min : String(parseInt(prevState.min) - 1), sec : '59' }))
			if(parseInt(this.state.min) < 10){
				this.setState({ min : '0' + String(this.state.min)  })
			}
		}
		if(parseInt(this.state.min) == '00' && parseInt(this.state.sec) == '00' ){
			clearInterval(this.interval)
			vibrate()
		}
	}
	render() {
		return (
			<View style={styles.container}>
				<Count min={this.state.min} sec={this.state.sec}/>
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
