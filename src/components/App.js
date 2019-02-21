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
    this.handleCheckChange = this.handleCheckChange.bind(this)
    this.handleInputSubmit = this.handleInputSubmit.bind(this)
    this.removeTodoItem = this.removeTodoItem.bind(this)
    this.clearTodoList = this.clearTodoList.bind(this)
  }

  handleInputChange(e) {
    this.setState({
      text: e.target.value
    })
  }

  handleCheckChange(e) {
    let span = e.target.nextElementSibling
    let cancel = e.target.parentNode.nextElementSibling
    const todoList = this.getTodoList()

    if (e.target.checked) {
      span.style.textDecoration = "line-through";
      span.style.color = "#ccc";
      cancel.classList = "show"
      todoList.map((item, index) => {
        if (span.innerHTML === item.text)
          item.completed = true
      })
      // Store update
      localStorage.setItem("to-do", JSON.stringify(todoList))

    } else {
      span.style.textDecoration = "none";
      span.style.color = "#3c3a3acc";
      cancel.classList = "hide"
      todoList.map((item, index) => {
        if (span.innerHTML === item.text)
          item.completed = false
      })
      // Store update
      localStorage.setItem("to-do", JSON.stringify(todoList))

    }
  }

  getTodoList() {
    const todoList = localStorage.getItem('to-do');
    if (!todoList) {
      return []
    } else {
      return JSON.parse(todoList)
    }
  }

  storeTodoList(newItem) {
    const todoList = this.getTodoList()
    todoList.push(newItem)
    localStorage.setItem("to-do", JSON.stringify(todoList))
  }

  removeTodoItem(e) {
    const todoList = this.state.items
    const text = e.target.parentNode.previousElementSibling.childNodes[1].textContent
    const li = e.target.parentNode.parentNode.parentNode
    todoList.map((item, index)=> {
      if(text == item.text) {
        li.classList = "animate-remove";
        setTimeout(() => {li.style.display = "none"}, 500)
        todoList.splice(index, 1)
      }
    })
    localStorage.setItem('to-do', JSON.stringify(todoList))
  }

  handleInputSubmit(e) {
    e.preventDefault();
    const newItem = {
      text: this.state.text,
      id: Date.now(),
      completed: false
    }
    if (newItem.text) {
      // Store to-do in localStorage
      this.storeTodoList(newItem)
      // Show newly added items
      this.setState(prevState => ({
        items: prevState.items.concat(newItem),
        text: ''
      }))
    }

  }

  clearTodoList() {
    localStorage.removeItem("to-do")
    const todoList = this.getTodoList()
    this.setState({
      items: todoList
    })
  }

  componentDidMount() {
    const todoList = this.getTodoList()
    this.setState({
      items: todoList
    })
  }

  render() {
    const items = this.state.items
    return (
        <TodoList
          handleInputChange={this.handleInputChange}
          handleCheckChange={this.handleCheckChange}
          handleInputSubmit={this.handleInputSubmit}
          removeTodoItem={this.removeTodoItem}
          clearTodoList={this.clearTodoList}
          text={this.state.text}
          items={items}
        />
    );
  }
}

const TodoList = (props) => (
  <div className="container">
    <h2 className="teal-text center">To-do List</h2>
    <div className="row">
      <div className="col s12 m8 offset-m2">
          <form onSubmit={props.handleInputSubmit}>
            <div className="input-field">
              <i className="material-icons prefix">create</i>
              <input
                type="text"
                placeholder="Remind me to..."
                value={props.text}
                onChange={props.handleInputChange}
                autoFocus
              />
            </div>
          </form>
      </div>
    </div>
    <div className="row">
      <div className="col s12 m8 offset-m2">
        <ul id="todo-list">
          {props.items.map((item) => {
            return (
              <li key={item.id}>
                  <div className="card">
                    <label>
                      <input
                        type="checkbox"
                        defaultChecked={item.completed ? true : false}
                        className="filled-in"
                        onChange={props.handleCheckChange}
                      />
                      <span style={item.completed ? {textDecoration: "line-through", color:"#ccc"} : null}>
                        {item.text}
                      </span>
                    </label>
                    <span className={item.completed ? "show" : "hide"} onClick={props.removeTodoItem} style={{cursor:"pointer"}}>
                      <i className="material-icons red-text darken-1 right">clear</i>
                    </span>
                  </div>
              </li>
            );
          })}
        </ul>
        <div className="row">
          <div className="col">
            <button className="btn waves-effect red lighten-2" onClick={props.clearTodoList}>
              <i className="material-icons left">clear</i>
              Clear List
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);


export default App;
