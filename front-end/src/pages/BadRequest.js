import React from 'react';
import { Link } from 'react-router-dom';

class BadRequest extends React.Component {
    constructor(props){
        super(props);
        this.state = {errType:null}
    }

    render() {
        /* JSON.stringify(decodeURIComponent(window.sessionStorage.split('badReq=')))*/
        let errorStyle = {
            backgroundColor: '#f00',
            color:'white',
            margin: 'auto',
            textAlign: 'center',
            maxWidth: '960px',
            padding: '5rem',
            borderRadius: '15px',
            marginTop: '10%'
        };

        let btnErrStyle={
            backgroundColor:'white', 
            padding: '1rem', 
            borderRadius: '3px', 
            textDecoration: 'none', 
            fontWeight: 'bold'
        }

        let errorLogStyle={
            marginTop: '3rem', 
            backgroundColor: 'silver', 
            padding: '1rem', 
            fontWeight: 'bold', 
            color: 'black', 
            textAlign: 'left',
            borderRadius: '3px',
            whiteSpace: 'pre-wrap'
        }
      return (
          <div style={errorStyle}>
              <h1>Errore: 400 (Bad Request)</h1>
              <h3 style={{marginBottom: '5rem'}}>Contattare il servizio tecnico o il fornitore del software.</h3>
              <Link to='/' style={btnErrStyle}>ESCI</Link>
              <pre style={errorLogStyle}><p>Error Log: {decodeURIComponent(document.cookie.split('badReq='))}</p></pre>
          </div>
      );
    }
  }

  export default BadRequest;