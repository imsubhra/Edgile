import React from 'react';
import './App.css';
import { Button } from '@material-ui/core';


export default class App extends React.Component {
  onNavigateSignup = () => {
    this.props.history.push('/signup');
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Edgile</h1>
          <Button onClick={this.onNavigateSignup} variant="outlined" color="dark">
            Register Your Department
          </Button>
        </header>
      </div>
    )
  }

}
