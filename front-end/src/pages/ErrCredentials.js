import React from 'react';
import { Link } from 'react-router-dom';

class ErrCredentials extends React.Component {

    render() {
        let errorStyle = {
            backgroundColor: '#f00',
            color:'white',
            margin: 'auto',
            textAlign: 'center',
            maxWidth: '960px',
            padding: '5rem',
            borderRadius: '15px',
           // border: '5px solid #c10e6a',
            marginTop: '10%'
        };

        let btnErrStyle={
            backgroundColor:'white', 
            padding: '1rem', 
            borderRadius: '3px', 
            textDecoration: 'none', 
            fontWeight: 'bold'
        }
      return (
          <div style={errorStyle}>
              <h1>Errore: 400 (Bad Request) - credenziali errate!</h1>
              <h3 style={{marginBottom: '5rem'}}>Nome utente o password sono errati</h3>
              <Link to='/reg' style={btnErrStyle}>TORNA AL REGISTRO</Link>
          </div>
      );
    }
  }

  export default ErrCredentials;