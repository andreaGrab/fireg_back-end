import React from 'react';

class Expenses extends React.Component{
	constructor(props){
		super(props);
		this.state = {exps:[]};
	}

	componentDidMount(){
		fetch('/expenses/report')
		.then(res => res.json())
		.then(exps => this.setState({exps}));
	}

	render(){
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
								<td><strong>{exp.expenses}€</strong> {exp.name}</td>
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