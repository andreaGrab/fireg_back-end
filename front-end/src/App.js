import React from 'react';
import './App.css';
import Expenses from './components/Expenses';
import Sidebar from './components/Sidebar';

class App extends React.Component {

	render(){
		return (
		    <div className="App">
				<div className='regView'>
					<div className='regView__header'>
						<div className='regView__header__wrapper'>
							<div className='regView__header__wrapper__date'>
								<ul>
									<li><h1>GIORNO<br /><span>1</span></h1></li>
									<li><h1>MESE<br /><span>GENNAIO</span></h1></li>
									<li><h1>ANNO<br /><span>2019</span></h1></li>
								</ul>
							</div>
							<h1 className='regView__header__wrapper__title'>REGISTRO FINANZIARIO</h1>
						</div>
					</div>
					<div className='regView__content'>
						<Sidebar />
						<Expenses />
					</div>
				</div>
		    </div>
		);
	}
}

export default App;
