import React, { Component, } from 'react';
import List from './List';
import TodoForm from './TodoForm';
import Footer from './Footer';


class App extends Component {
  state = {
    todos: [
      {Id: 1, name:"Peanut Butter", complete: true,},
      {Id: 2, name:"Milk", complete: false,},
      {Id: 3, name:"Jelly", complete: false,},
    ]
  };

  getUniqId = ()=> {
    //Note we are just using this as a helper function for id's since we aren't using a db yet
    return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
  };

  addItem = (name)=>{
    const {todos} = this.state;
  }

  renderTodos = () => {
    const {todos, } = this.state;
    return todos.map( todo =>
    <li key={todo.id}>{todo.name}</li>
      );
  };

  visibleItems = ()=>{
    const {todos, filter} = this.state;
    switch(filter){
      case 'Active':
        return todos.filter(t => !t.complete)
        case 'Complete':
          return todos.filter(t => t.complete)
          default:
            return todos;
    }
  }

  handleClick = (id) => {
    const {todos} = this.state;
    this.setState({
      todos: todos.map( todo =>{
        if(todo.id === id){
          return{
            ... todo,
            complete: !todo.complete
          };
        };
        return todo
      })
    });
  };

  setFilter = (filter)=> {
    this.setState({ filter})
  }

  render() {
    const {todos, filter} =this.state;
    return (
     <div> 
      <TodoForm addItem={this.addItem}></TodoForm>
      <Footer filter ={filter} setFilter={this.setFilter}/>
      <List name="Todo List" items={this.visibleItems()} todoClick={this.handleClick}/>
        <ul>
          {this.renderTodos()}
        </ul>
      </div>
    );
  };
};

export default App;
