import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

class Sidebar extends React.Component{
	constructor(props){
		super(props);
		this.state = {dat:[], onErr: "none"};
		this.abortAction = this.abortAction.bind(this);
	}

	componentDidMount(){
		fetch('/report')
		.then(res => res.json())
		.then(dat => {
			this.setState({dat})
		});
	}

	abortAction(){
		Axios.delete('/abort')
		.then(res => res)
		.then(obj => console.log(obj.data))
		.then(()=>window.location.reload())
		.catch(err=>{
			this.setState({onErr: 'inline'});
		});
	}

	render(){
		const formStyle = {
			width: '345px',
			height: '55px',
			fontSize: '2rem',
			border: '3px solid lightgrey',
			borderRadius: '3px',
			backgroundColor: '#29374f',
			color: 'white',
			boxShadow: '1px 3px 5px 1px rgba(0,0,0, .5)'
		}

		const forbStyle = {
			color: '#f00',
			fontWeight: 'bolder',
			fontSize: '1.5rem',
			display: this.state.onErr
		};
		return(
			<div className="regView__content__sidebar">
				<div className='regView__content__sidebar__wrapper'>
					<h1>Capitale corrente<br />{
						this.state.dat.corrente
					}€</h1>
					<Link className='btn-default btn-sidebar' to='/not'>NOTIFICA SPESA</Link>
					<button className='btn-default btn-sidebar'><Link to='/rep'>RESOCONTO VELOCE</Link></button>
					<form style={{marginTop: '20px', textAlign: 'left'}} action='/login' method='post'>
						<h3 style={{textAlign: 'center'}}>Autorizzazione admin</h3>
						<label>
							<p>Name</p>
							<input type='text' name='name' />
						</label>
						<label>
							<p>Password</p>
							<input style={formStyle} type='password' name='password' />
						</label><br />
						<input type='submit' />
					</form>
					<p style={forbStyle}>ABORT <br/>NON AUTORIZZATO!</p>
					<button className='btn-default btn-default--abort' onClick={this.abortAction}>ABORTIRE REGISTRO</button>
				</div>
			</div>
		)
	};
}
export default Sidebar;