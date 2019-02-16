import React, { Component } from 'react';

import './app.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      items: [],
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleInputSubmit = this.handleInputSubmit.bind(this)
  }

  handleInputChange(e) {
    this.setState({
      text: e.target.value
    })
  }

  handleInputSubmit(e) {
    event.preventDefault();
    const newItem = {
      text: this.state.text,
      id: Date.now()
    }

    // Reset input field
    this.setState(prevState => ({
      items: prevState.items.concat(newItem),
      text: ''
    }))

  }

  render() {
    const items = this.state.items
    return (
      <div>
        <TodoList
          handleInputChange={this.handleInputChange}
          handleInputSubmit={this.handleInputSubmit}
          text={this.state.text}
          items={items}
        />
      </div>
    );
  }
}

const TodoList = (props) => (
  <div className="container">
    <div className="row">

    </div>
  </div>
);


export default App;
