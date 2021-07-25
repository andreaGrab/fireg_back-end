import React from 'react';
import { Link} from 'react-router-dom';
import Axios from 'axios';

class Sidebar extends React.Component{
	constructor(props){
		super(props);
		this.state = {dat:[], onErr: "none", isOpen: true};
		this.abortAction = this.abortAction.bind(this);
		this.popUpHandler = this.popUpHandler.bind(this);
	}

	abortAction(){
		Axios.delete('/api/abort')
		.then(res => res)
		.then(obj => console.log(obj.data))
		.then(()=>window.location.reload())
		.catch(err=>{
			window.location.href = '/notauth';
			console.log(err);
		});
	}

	popUpHandler(){
		this.props.isOpen(this.state.isOpen);
	}

	render(){
		return(
			<div className="regView__content__sidebar">
				<div className='regView__content__sidebar__wrapper'>
					<h1>Capitale corrente<br />{
						!this.props.reportData ? 'loading' : this.props.reportData.corrente
					}€</h1>
					<Link to='/not'><button className='btn-default btn-sidebar'>NOTIFICA SPESA</button></Link><br/>
					<Link to='/rep'><button className='btn-default btn-sidebar'>RESOCONTO VELOCE</button></Link><br/>
					<button className='btn-default btn-sidebar' onClick={this.popUpHandler}>AUTORIZZAZIONE ADMIN</button><br/>
					<button className='btn-default btn-default--abort' onClick={this.abortAction}>ABORTIRE REGISTRO</button>
				</div>
			</div>
		)
	};
}
export default Sidebar;