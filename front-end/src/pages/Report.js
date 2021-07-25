import React from 'react';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

class Report extends React.Component {
	constructor(props){
		super(props);
		this.state = {exps:[], mData:[]};
		this.printPage = this.printPage.bind(this);
		this.pdfPage = this.pdfPage.bind(this);
	}

 	printPage(){
	 	window.print();
	}

	pdfPage(){
		let reportView = document.querySelector('.reportView');
		window.scrollTo(0, 0);// top scroll position of browser window
		reportView.style.width = '794px';// a4 width for pdf creation
		// creating the sceenshot
		html2canvas(reportView, {scale:1}).then(canvas=>{
			let pdf = new jsPDF('p', 'mm', 'a4');// new jspdf instace
			// converting screen to png & adding to new pdf doc
			pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 2, 210, 0);
			// if the image is taller than a4 canvas make new page & put
			//- the other parts of the image
			if(canvas.height > 1133){
				let shiftImg = -293;
				for(let a4H = 1133; a4H<canvas.height; a4H+=1133){
					pdf.addPage();
					pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, shiftImg, 210, 0);
					shiftImg-=295;
				}
			}
			pdf.save('report.pdf');
		});
		reportView.style.width = 'initial';
	}

	render(){
		return (
			<div className='reportView'>
				<div className='reportView__header'>
					<h1>RESOCONTO VELOCE</h1>
					<p className='date'>IN DATA <strong>{this.props.day} {this.props.month} {this.props.year}</strong></p>
				</div>
				<div className='reportView__content'>
					<div className='reportView__content__data'>
						<div className='reportView__content__data__box'>
							<p>Capitale iniziale</p><br /><p>{!this.props.reportData ? 'loading...' : this.props.reportData.capitale} EUR</p>
						</div>
						<div className='reportView__content__data__box'>
							<p>Capitale corrente</p><br /><p>{!this.props.reportData ? 'loading...' : this.props.reportData.corrente} EUR</p>
						</div>
						<div className='reportView__content__data__box'>
							<p>Bilancio spesa</p><br /><p>{!this.props.reportData ? 'loading...' : this.props.reportData.bilancio} EUR</p>
						</div>
						<div className='reportView__content__data__box'>
							<p>Riserva in</p><br /><p>{!this.props.reportData ? 'loading...' : this.props.reportData.riserva}</p>
						</div>
						<div className='reportView__content__data__box'>
							<p>Scontrino medio</p><br /><p>{!this.props.reportData ? 'loading...' : this.props.reportData.media}</p>
						</div>
					</div>
					<div className='reportView__content__expenses'>
						<table>
							<tbody>
								<tr>
									<th>Uscite giustificate</th>
									<th>Tipo/tag</th>
								</tr>
								{this.props.exps.map(exp=>(							
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