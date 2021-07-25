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
			exps:[],
			mainData:null,
			showPopup: false,
			reportData: null
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
		// get all expenses
		fetch('/api/expenses/report')
		.then(res => res.json())
		.then(exps => {exps.reverse(); this.setState({exps})});

		// calculate report
		fetch('/api/main-data')
		.then(res => res.json())
		.then(mData => {
			this.setState({mainData: mData});
			let speseCifre = [];
			if(this.state.exps){
				this.state.exps.forEach((spesa)=>{
					speseCifre.push(spesa.expenses);
				});
			}else{
				speseCifre=0;
			}
			if(this.state.mainData.data.length){
				const bilancio = speseCifre.length ? Math.round((speseCifre.reduce((a,c)=>a+c))*100)/100 : 0;
				const cCorrente = Math.round((mData['data'][0].capital - bilancio)*100)/100;
				const cRiserva = Math.round((cCorrente - mData['data'][0].reserve)*100)/100;
				const media = speseCifre.length ? Math.round(bilancio / speseCifre.length * 100)/100 : 0;

				const resoconto = [];
				resoconto["resoconto"] = {
						capitale: mData['data'][0].capital,
						corrente: cCorrente,
						bilancio: bilancio,
						riserva: cRiserva,
						media: media	
					};
				this.setState({reportData:resoconto['resoconto']});
			}
		});
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
					return this.state.mainData.data.length !==0 ? <Route path={route}><Register reportData={this.state.reportData} exps={this.state.exps} day={this.getTheDate('d')} month={this.getTheDate('m')} year={this.getTheDate('y')} isOpen={this.openPopup}/></Route> : <Redirect to='/init' />;
				case '/not':
					return this.state.mainData.data.length !==0 ? <Route path={route}><Notification day={this.getTheDate('d')} month={this.getTheDate('m')} year={this.getTheDate('y')} /></Route> : <Redirect to='/init' />;
				case '/rep':
					return this.state.mainData.data.length !==0 ? <Route path={route}><Report reportData={this.state.reportData} exps={this.state.exps} day={this.getTheDate('d')} month={this.getTheDate('m')} year={this.getTheDate('y')} /></Route> : <Redirect to='/init' />;
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