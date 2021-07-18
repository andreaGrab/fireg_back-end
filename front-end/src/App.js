import React from 'react';
import OnLoading from "./pages/OnLoading";
import Init from "./pages/init";
import Register from './pages/Register';
import Notification from './pages/Notification';
import Report from './pages/Report';
import Popup from './pages/components/PopUp.js';
import ErrCredentials from './pages/ErrCredentials';
import BadRequest from './pages/BadRequest';
import NotAuth from './pages/NotAuth';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';

class App extends React.Component {
	constructor(props){
		super(props);
		this.getTheDate = this.getTheDate.bind(this);
		this.openPopup = this.openPopup.bind(this);
		this.state = {
			mainData:null,
			showPopup: false
		};
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

	componentDidMount(){
		fetch('/api/main-data')
		.then(res => res.json())
		.then(mainData => this.setState({mainData}));
	}

	togglePopup(){
		this.setState({
			showPopup: !this.state.showPopup
		});
	}

	openPopup(value){
		this.setState({
			showPopup: value
		});
	}
	// protecting routes if register is not configured yet
	isProtected(route){
		if(this.state.mainData){
			switch(route){
				case '/reg':
					return this.state.mainData.data.length !==0 ? <Route path={route}><Register day={this.getTheDate('d')} month={this.getTheDate('m')} year={this.getTheDate('y')} isOpen={this.openPopup}/></Route> : <Redirect to='/init' />;
				case '/not':
					return this.state.mainData.data.length !==0 ? <Route path={route}><Notification day={this.getTheDate('d')} month={this.getTheDate('m')} year={this.getTheDate('y')} /></Route> : <Redirect to='/init' />;
				case '/rep':
					return this.state.mainData.data.length !==0 ? <Route path={route}><Report day={this.getTheDate('d')} month={this.getTheDate('m')} year={this.getTheDate('y')} /></Route> : <Redirect to='/init' />;
				default:
					console.log('Route ' + route + ' not valid!');
			}
		}
	}

	render(){
		return (
			<Router>
			    <div className="App">
			    <Switch>
					<Route exact path='/'>
						<OnLoading mainData={this.state.mainData}/>
					</Route>
					<Route path='/ercred'>
						<ErrCredentials/>
					</Route>
					<Route path='/badreq'>
						<BadRequest/>
					</Route>
					<Route path='/notauth'>
						<NotAuth/>
					</Route>
					<Route path='/init'>
						<Init day={this.getTheDate('d')} month={this.getTheDate('m')} year={this.getTheDate('y')}/>
					</Route>
					{this.isProtected('/reg')}
					{this.isProtected('/not')}
					{this.isProtected('/rep')}
				</Switch>
				{this.state.showPopup ? <Popup closePopup={this.togglePopup.bind(this)}/> : null}
			    </div>
		    </Router>
		);
	}
}

export default App;