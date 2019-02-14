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
  <div id="todo-list">
    <button>Add new item</button>
    <form id="input-panel" onSubmit={props.handleInputSubmit}>
      <input type="text" onChange={props.handleInputChange} value={props.text} />
      <input type="submit" value="Add"/>
    </form>
    <div id="list">
      <ul>
         <li>Download windows 10</li>
         <li>Write a new blog post</li>
         <li>Go to the gim this Wenesday</li>
         <li>Write 1000 lines of code this month</li>
         {props.items.map((item)=> {
           return <li key={`${item.id}`}> {item.text} </li>
         })}
      </ul>
    </div>
  </div>
);


export default App;
