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
						<Register />
					</Route>
					<Route path='/not'>
						<Notification />
					</Route>
					<Route path='/rep'>
						<Report />
					</Route>
				</Switch>
			    </div>
		    </Router>
		);
	}
}

export default App;