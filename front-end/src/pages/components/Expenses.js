import React from 'react';
import Axios from 'axios';

class Expenses extends React.Component{
	constructor(props){
		super(props);
		this.state = {exps:[], onErr: 'none'};
	}

	componentDidMount(){
		fetch('/expenses/report')
		.then(res => res.json())
		.then(exps => this.setState({exps}));
	}

	deleteExpense(Id){
		Axios.delete(`expenses/${Id}`)
		.then(res=>console.log(res))
		.catch(err=>this.setState({onErr:'inline'}));
	}

	render(){
		const forbStyle = {
			color: '#f00',
			fontWeight: 'bolder',
			fontSize: '12px',
			marginLeft: '20px',
			display: this.state.onErr
		};

		return(
			<div className='regView__content__expenses'>
				<table>
					<tbody>
						<tr>
							<th>Uscite giustificate</th>
							<th>Tipo/tag</th>
						</tr>
						{this.state.exps.map(exp=>(							
							<tr>
								<td><strong>{exp.expenses}€</strong> {exp.name} <button onClick={()=>this.deleteExpense(exp._id)}>Elimina</button>
								<p style={forbStyle}>NON AUTORIZZATO</p>
								</td>
								{(()=>{
									switch(exp.tag){
										case "ordinaria": return <td className='tag tag--low'>{exp.tag}</td>;
										case "straordinaria": return <td className='tag tag--mid'>{exp.tag}</td>;
										case "imperativa": return <td className='tag tag--high'>{exp.tag}</td>;
										default: return "invalid";
									}
								})()}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		)
	};
}

export default Expenses;