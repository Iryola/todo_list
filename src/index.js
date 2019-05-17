import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import TodoItem from "./todo-items";
import "./styles.css";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      todo: "",
      todos: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:5000/todos")
    .then(response => response.json())
    .then(data =>
      this.setState({
        todos: data
      }))
  }

  onChange = event => {
    this.setState({
      todo: event.target.value
    });
  };

  renderTodos = () => {
    return this.state.todos.map(item => {
      return (
      <TodoItem 
      key={item[0]}
      id={item[0]}
      title={item[1]}
      done={item[2]} 
      deleteItem={this.deleteItem}
      />
      );
    });
  };

  addTodo = event => {
    event.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:5000/add-todo",
      headers: { "content-type": "application/json" },
      data: {
        title: this.state.todo,
        done: false
      }
    })
    .then(data => {
      this.setState({
        todos: [...this.state.todos, data.data],
        todo: ""
      })
    })
    .catch(error => console.log(error));
  };

  deleteItem = id => {
    fetch(`http://localhost:5000/todo/${id}`, {
      method: "DELETE"
    })
    .then(this.setState({
      todos: this.state.todos.filter(item => {
        return item[0] !== id
      })
    }))
    .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="app">
        <h1>ToDo List</h1>
        <form className="add-todo" onSubmit={this.addTodo}>
          <input
            type="text"
            placeholder="Add ToDo"
            onChange={this.onChange}
            value={this.state.todo}
          />

          <button type="submit">Add</button>
        </form>
        {this.renderTodos()}
      </div>
    );
  }
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
