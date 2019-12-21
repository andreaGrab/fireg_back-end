import React from 'react';
import './App.css';
import Register from './pages/Register';
import Notification from './pages/Notification';
import Report from './pages/Report';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from 'react-router-dom';

class App extends React.Component {
	constructor(props){
		super(props);
		this.getTheDate = this.getTheDate.bind(this);
	}

	getTheDate(dType){
		let months = [
			'GENNAIO',
			'FEBBRAIO',
			'MARZO',
			'APRILE',
			'MAGGIO',
			'GIUGNO',
			'LUGLIO',
			'AGOSTO',
			'SETTEMBRE',
			'OTTOBRE',
			'NOVEMBRE',
			'DICEMBRE'
		];
		let now = new Date();
		let day = now.getDate();
		let month = now.getMonth();
		let year = now.getFullYear();

		if(dType === "d"){
			return day;
		}else if(dType === "m"){
			return months[month];
		}else if(dType === "y"){
			return year;
		}
	}

	render(){
		return (
			<Router>
			    <div className="App">
			    <Switch>
					<Route exact path='/'>
						<h1>Fallback</h1>
						<Link to='/reg'>Go to register view</Link>
					</Route>
					<Route path='/reg'>
						<Register day={this.getTheDate('d')} month={this.getTheDate('m')} year={this.getTheDate('y')} />
					</Route>
					<Route path='/not'>
						<Notification day={this.getTheDate('d')} month={this.getTheDate('m')} year={this.getTheDate('y')} />
					</Route>
					<Route path='/rep'>
						<Report day={this.getTheDate('d')} month={this.getTheDate('m')} year={this.getTheDate('y')}/>
					</Route>
				</Switch>
			    </div>
		    </Router>
		);
	}
}

export default App;