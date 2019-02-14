import React, { Component } from 'react';

import './app.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      items: [],
      toggleForm: true
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleInputSubmit = this.handleInputSubmit.bind(this)
    this.toggleInputButton = this.toggleInputButton.bind(this)
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

  toggleInputButton(e) {
    e.preventDefault();
    this.setState({
      toggleForm: !this.state.toggleForm
    })
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
          toggleForm={this.state.toggleForm}
          toggleInputButton={this.toggleInputButton}
        />
      </div>
    );
  }
}

const TodoList = (props) => (
  <div className="container">
    <div className="row">
      <div className="col s12 m6 offset-m3">
        <div className="card" id="my-card">
          <div className="card-content">
            <div className="row">
              <div className="col s8">
                <h1 id="lg-heading">Thursday, 14th</h1>
                <h2 id="sm-heading">Febuary</h2>
              </div>
              <div className="col s2" id="right-head">
                <button onClick={props.toggleInputButton} className={!props.toggleForm ? 'hide' : 'btn-floating btn-large waves-effect waves-light red'}>
                  <i className="material-icons">add</i>
                </button>
              </div>
            </div>
            <form id="input-panel" onSubmit={props.handleInputSubmit} className={!props.toggleForm ? 'show' : 'hide'}>
              <input
                type="text"
                placeholder="Add new to-do"
                className="input-field"
                onChange={props.handleInputChange}
                value={props.text}
              />
            </form>
            <a href="#" id="cancel" className={!props.toggleForm ? 'show' : 'hide'} onClick={props.toggleInputButton}>
              <i className="material-icons">cancel</i>
            </a>
            <div>
            <ul id="list">
              <li>
                <label>
                  <input type="checkbox" className="filled-in" />
                  <span>Go to the gim</span>
                </label>
                <span className="right">7:00AM</span>
              </li>
              <li>
                <label>
                  <input type="checkbox" className="filled-in" />
                  <span>Dinner with Racheal</span>
                </label>
                <span className="right">8:00AM</span>
              </li>
              <li>
                <label>
                  <input type="checkbox" className="filled-in" />
                  <span>Appointment with the dentist</span>
                </label>
                <span className="right">10:00AM</span>
              </li>
              {props.items.map((item)=> {
                return (
                  <li>
                    <label>
                      <input type="checkbox" className="filled-in" />
                      <span key={item.id}>{item.text}</span>
                    </label>
                    <span className="right">1:00PM</span>
                  </li>
                );
              })}
            </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);


export default App;
