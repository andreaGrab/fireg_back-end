import React from 'react';
import {
	Switch,
    Redirect} from 'react-router-dom';

class OnLoading extends React.Component {
    constructor(props){
        super(props);
        this.redirectTo = this.redirectTo.bind(this);
    }
    redirectTo(){
        if(this.props.mainData){
            return this.props.mainData.data.length !==0 ? <Redirect to='/reg' /> : <Redirect to='/init' />
        }
    }
	render(){
        let styling = {
            textAlign: 'center',
            paddingTop: '200px'
        };
		return (
            <div>
                <h1 style={styling}>Loading...</h1>
                <Switch>
                    {this.redirectTo()}
                </Switch>
            </div>
		);
	}
}

export default OnLoading;