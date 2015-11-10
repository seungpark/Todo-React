var TodosList = React.createClass({

  getInitialState: function() {
    return {todos: TodoStore.all()};
  },

  todosChanged: function() {
    this.setState({todos: TodoStore.all()});
  },

  componentDidMount: function() {
    TodoStore.addChangeHandler(this.todosChanged);
    TodoStore.fetch();
  },

  componentWillUnmount: function() {
    TodoStore.removeChangeHandler(this.todosChanged);
  },

  //line 27 instead of making li, make each todo (within map) a TodoListItem
  render: function() {
    return (
      <div>
      <div>
        <ul>
        {
          this.state.todos.map(function(todo) {
            return <TodoListItem key={todo.id} title={todo.title} body={todo.body}/>;
          })
        }
        </ul>
      </div>
      <div>
        <TodoForm/>
      </div>
      </div>
    );
  }

});


var TodoListItem = React.createClass({

  render: function() {
    return (
      <li>
        <div>
          <div className="title">{this.props.title}</div>
          <div className="body">{this.props.body}</div>
        </div>
      </li>
    );
  }

});


var TodoForm = React.createClass({
  getInitialState: function() {
    return {title: "", body: ""};
  },

  updateTitle: function(e) {
    this.setState({title: e.currentTarget.value});
  },

  updateBody: function(e) {
    this.setState({body: e.currentTarget.value});
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var todo = {title: this.state.title, body: this.state.body, done: false};
    TodoStore.create(todo);
    this.setState({title: "", body: ""});
  },

  render: function() {
    return (
      <form>
        <input type="text" className="inputTitle" onChange={this.updateTitle} value={this.state.title} />
        <input type="text" className="inputBody" onChange={this.updateBody} value={this.state.body} />
        <button onClick={this.handleSubmit}>Submit</button>
      </form>
    )
  }

});
