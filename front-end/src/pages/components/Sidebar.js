import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

class Sidebar extends React.Component{
	constructor(props){
		super(props);
		this.state = {dat:[], onErr: "none", isOpen: true};
		this.abortAction = this.abortAction.bind(this);
		this.popUpHandler = this.popUpHandler.bind(this);
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

	popUpHandler(){
		this.props.isOpen(this.state.isOpen);
	}

	render(){
		const forbStyle = {
			color: '#f00',
			fontWeight: 'bolder',
			fontSize: '1.5rem',
			display: this.state.onErr,
			position: 'absolute',
			bottom: '10rem',
			left:0
		};
		return(
			<div className="regView__content__sidebar">
				<div className='regView__content__sidebar__wrapper'>
					<h1>Capitale corrente<br />{
						this.state.dat.corrente
					}€</h1>
					<Link to='/not'><button className='btn-default btn-sidebar'>NOTIFICA SPESA</button></Link><br/>
					<Link to='/rep'><button className='btn-default btn-sidebar'>RESOCONTO VELOCE</button></Link><br/>
					<button className='btn-default btn-sidebar' onClick={this.popUpHandler}>AUTORIZZAZIONE ADMIN</button><br/>
					<p style={forbStyle}>ABORT <br/>NON AUTORIZZATO!</p>
					<button className='btn-default btn-default--abort' onClick={this.abortAction}>ABORTIRE REGISTRO</button>
				</div>
			</div>
		)
	};
}
export default Sidebar;