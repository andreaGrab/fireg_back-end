import React from 'react';
import FormNotify from './components/FormNotify';

class Notification extends React.Component {
	render(){
		return(
			<div className='notifyExp'>
				<div className='notifyExp__header'>
					<h1>NOTIFICA SPESA</h1>
				</div>
				<FormNotify day={this.props.day} month={this.props.month} year={this.props.year}/>
			</div>
		);
	}
}

export default Notification;