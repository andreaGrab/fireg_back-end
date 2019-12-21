import React from 'react';
import { Link } from 'react-router-dom';

class FromNotify extends React.Component {
	render(){
		return(
			<form action='/expenses' method='post'>
				<label>
					<p>SOMMA EUR</p>
					<input type="text" name="expenses" />
				</label>
				<label>
					<p>GIUSTIFICAZIONE</p>
					<input type="text" name="name" />
				</label>
				<label>
					<p>TIPO DI SPESA/TAG</p>
					<select name='tag'>
						<option value="ordinaria">ORDINARIA</option>
						<option value="straordinaria">STRAORDINARIA</option>
						<option value="imperativa">IMPERATIVA</option>
					</select>
				</label>
				<p className='date'>IN DATA <strong>{this.props.day} {this.props.month} {this.props.year}</strong></p>
				<input className='btn-default btn-default--confirm' type="submit" name="submit-exp" value='CONFERMA' />
				<button className='btn-default btn-default--reject' onClick={(e)=>e.preventDefault()}><Link to='/reg'>CANCELLA</Link></button>
			</form>
		);
	}
}

export default FromNotify;