// import Navbar from "react-bootstrap/Navbar"
// import Container  from "react-bootstrap/Container"
// import Nav from "react-bootstrap/Nav"
import React, { useState, useEffect } from 'react';
import { AddTodos } from './component/addTodos';
import { Footer } from "./component/footer"
import Header from "./component/header";
import { Todos } from "./component/todos";
import { BrowserRouter, Route } from "react-router-dom";
import { About } from './component/about';

function App() {
  let initTodo;
  if (localStorage.getItem("todos") === null) {
    initTodo = [];
  }
  else {
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }
  const onDelete = (todo) => {
    console.log("Deleted", todo);

    setTodos(todos.filter((e) => {
      return e !== todo;
    }));
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  const addTodos = (title, desc) => {
    console.log("I am adding this todo", title, desc)
    let sno;
    if (todos.length === 0) {
      sno = 0;
    }
    else {
      sno = todos[todos.length - 1].sno + 1;
    }
    const myTodo = {
      sno: sno,
      title: title,
      desc: desc,
    }
    setTodos([...todos, myTodo])
    console.log(myTodo);
  }

  const [todos, setTodos] = useState(initTodo);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])

  return (
    <>
      <BrowserRouter>
        <Header title="My Todos List" searchBar={false} />
        <Route exact path="/" render={() => {
          return (
            <>
              <AddTodos addTodos={addTodos} />
              <Todos todos={todos} onDelete={onDelete} />
            </>)
        }}>
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
