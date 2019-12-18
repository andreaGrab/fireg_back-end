import React from 'react';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

class Report extends React.Component {
	constructor(props){
		super(props);
		this.state = {exps:[], reportData:[]};
		this.printPage = this.printPage.bind(this);
		this.pdfPage = this.pdfPage.bind(this);
	}

	componentDidMount(){
		fetch('/expenses/report')
		.then(res => res.json())
		.then(exps => this.setState({exps}));

		fetch('/report')
		.then(res => res.json())
		.then(reportData => this.setState({reportData}));
	}

 	printPage(){
	 	window.print();
	}

	pdfPage(){
		let reportView = document.querySelector('.reportView');
		window.scrollTo(0, 0);
		reportView.style.width = '794px';
		html2canvas(reportView, {scale:1}).then(canvas=>{
			let pdf = new jsPDF('p', 'mm', 'a4');
			pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 0, 0);
			pdf.save('report.pdf');
		});
		reportView.style.width = 'initial';
	}

	render(){
		return (
			<div className='reportView'>
				<div className='reportView__header'>
					<h1>RESOCONTO VELOCE</h1>
				</div>
				<div className='reportView__content'>
					<div className='reportView__content__data'>
						<div className='reportView__content__data__box'>
							<p>Capitale iniziale</p><br /><p>{this.state.reportData.capitale} EUR</p>
						</div>
						<div className='reportView__content__data__box'>
							<p>Capitale corrente</p><br /><p>{this.state.reportData.corrente} EUR</p>
						</div>
						<div className='reportView__content__data__box'>
							<p>Bilancio spesa</p><br /><p>{this.state.reportData.bilancio} EUR</p>
						</div>
						<div className='reportView__content__data__box'>
							<p>Riserva in</p><br /><p>{this.state.reportData.riserva}</p>
						</div>
					</div>
					<div className='reportView__content__expenses'>
						<table>
							<tbody>
								<tr>
									<th>Uscite giustificate</th>
									<th>Tipo/tag</th>
								</tr>
								{this.state.exps.map(exp=>(							
									<tr>
										<td><strong>{exp.expenses}</strong> {exp.name}</td>
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
				</div>
				<div className='reportView__footer' data-html2canvas-ignore='true'>
					<button className='btn-default' onClick={this.pdfPage}>SALVA PDF</button>
					<button className='btn-default' onClick={this.printPage}>STAMPA</button>
					<Link className='btn-default' to='/reg'>ESCI</Link>
				</div>
			</div>
		);
	}
}

export default Report;