import React from "react";

class TodoItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      done: props.item.done
    };
  }

  toggleDone = () => {
    fetch(`http://localhost:5000/todo/${this.props.item.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: this.props.item.title,
        done: !this.state.done
      })
    })
    .then(this.setState({
      done: !this.state.done
    }))
    .catch(error => console.log(error))
  }

  render() {
    return (
      <div className="todo-item">
        <input
          type="checkbox"
          onClick={this.toggleDone}
          defaultChecked={this.state.done}
        />
        <p className={this.state.done ? "done" : null}>{this.props.item.title}</p>
        <button onClick={() => this.props.deleteItem(this.props.item.id)}>del</button>
      </div>
    );
  }
}

export default TodoItem;
