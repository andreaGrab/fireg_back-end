import React from 'react';
import Expenses from './components/Expenses';
import Sidebar from './components/Sidebar';

class Register extends React.Component {

	getTheDate(dType){
		let now = new Date();
		let day = now.getDay();
		let month = now.getMonth();
		let year = now.getFullYear();

		if(dType === "d"){
			return day;
		}else if(dType === "m"){
			return month;
		}else if(dType === "y"){
			return year;
		}
	}

	render(){
		return (
		<div className='regView'>
			<div className='regView__header'>
				<div className='regView__header__wrapper'>
					<div className='regView__header__wrapper__date'>
						<ul>
							<li><h1>GIORNO<br /><span>{this.getTheDate("d")}</span></h1></li>
							<li><h1>MESE<br /><span>{this.getTheDate("m")}</span></h1></li>
							<li><h1>ANNO<br /><span>{this.getTheDate("y")}</span></h1></li>
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
		);
	}
}

export default Register;