import React from "react";
import ReactDOM from "react-dom";

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

  onChange = event => {
    this.setState({
      todo: event.target.value
    });
  };

  renderTodos = () => {
    return this.state.todos.map(item => {
      return <TodoItem title={item} />;
    });
  };

  addTodo = event => {
    event.preventDefault();
    this.setState({
      todos: [...this.state.todos, this.state.todo],
      todo: ""
    });
  };
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
