import React from 'react';

class Init extends React.Component {
	render(){
		return (
        <div className='setUpReg'>
			<div className='setUpReg__header'>
				<h1>REGISTRO FINANZIARIO</h1>
				<h1><span>DATA CORRENTE</span><br />{this.props.day} {this.props.month} {this.props.year}</h1>
			</div>

			<form className='setUpReg__form' action='/main-data' method='post'>
				<label>
					<p>INSERIRE IL CAPITALE</p><br />
					<input type="text" name="capital" />
				</label>
				<label>
					<p>INSERIRE RISERVA FONDO</p><br />
					<input type="text" name="reserve" />
				</label><br />
				<input className='btn-default' type="submit" name="submitBtn" value='CONFERMA' />
			</form>
		</div>
		);
	}
}

export default Init;