import React from 'react';
import Expenses from './components/Expenses';
import Sidebar from './components/Sidebar';

class Register extends React.Component {

	render(){
		return (
		<div className='regView'>
			<div className='regView__header'>
				<div className='regView__header__wrapper'>
					<div className='regView__header__wrapper__date'>
						<ul>
							<li><h1>GIORNO<br /><span>{this.props.day}</span></h1></li>
							<li><h1>MESE<br /><span>{this.props.month}</span></h1></li>
							<li><h1>ANNO<br /><span>{this.props.year}</span></h1></li>
						</ul>
					</div>
					<h1 className='regView__header__wrapper__title'>REGISTRO FINANZIARIO</h1>
				</div>
			</div>
			<div className='regView__content'>
				<Sidebar  isOpen={this.props.isOpen}/>
				<Expenses />
			</div>
		</div>
		);
	}
}

export default Register;