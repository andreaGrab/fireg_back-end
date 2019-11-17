import React from 'react';

class Sidebar extends React.Component{
	constructor(props){
		super(props);
		this.state = {dat:[]};
	}

	componentDidMount(){
		fetch('/report')
		.then(res => res.json())
		.then(dat => {
			this.setState({dat})
		});
	}

	render(){
		return(
			<div className="regView__content__sidebar">
				<div className='regView__content__sidebar__wrapper'>
					<h1>Capitale corrente<br />{
						this.state.dat.corrente
					}€</h1>
					<button className='btn-default btn-sidebar'>NOTIFICA SPESA</button>
					<button className='btn-default btn-sidebar'>RESOCONTO VELOCE</button>
					<button className='btn-default btn-default--abort'>ABORTIRE REGISTRO</button>
				</div>
			</div>
		)
	};
}
export default Sidebar;