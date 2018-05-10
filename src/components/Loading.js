// eslint-disable-next-line
import React, { Component } from 'react';
import './css/loading.css';


/* Create the class component */
class Loading extends Component {

  /* Constructor */
  constructor(props){
    super(props);
  }

  /* Render */
  render(){
    if(this.props.loading){
      return (
        <div className="loadingDiv">
          <div>
            <h1> Loading </h1>
            <div className="spinner">
              <div className="bounce1"></div>
              <div className="bounce2"></div>
              <div className="bounce3"></div>
            </div>
          </div>
        </div>
      )
    } else {
      return null;
    }
  }
}


export default Loading;
