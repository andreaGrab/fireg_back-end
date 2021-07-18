import React from 'react';
import { Link } from 'react-router-dom';

class NotAuth extends React.Component {

    render() {
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
      return (
          <div style={errorStyle}>
              <h1>Errore: 401 (Not Authorized) - Non Autorizzato!</h1>
              <h3 style={{marginBottom: '5rem'}}>Azione protetta. Effettuare richiesta di autorizzazione nell'area "Autorizzazione Admin"</h3>
              <Link to='/reg' style={btnErrStyle}>TORNA AL REGISTRO</Link>
          </div>
      );
    }
  }

  export default NotAuth;