import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Reactjs"
    }
  }

  render() {
    return (
      <div>
        <h1>Welcome to {this.state.title}</h1>
      </div>
    );
  }
}


export default App;
