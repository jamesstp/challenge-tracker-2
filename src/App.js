import React, { useState } from 'react';
import Todo from "./components/Todo";
import Form from "./components/Form";
// A tiny, secure, URL-friendly, unique string ID generator for JavaScrip
import { nanoid } from "nanoid";
import FilterButton from './components/FilterButton';

// import logo from "./styles/lake_forest_gsm_logo.jpg";



function App(props) {

  const [tasks, setTasks] = useState(props.tasks);

  function addTask(name) {
    const newTask = {id: `todo-${nanoid()}`, name, completed: false};
    setTasks([...tasks, newTask]);
  }
  // const subject = props.subject;
  const taskList = tasks.map((task) => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id} />
  ));
  return (
    <div className="todoapp stack-large">
      <h1>Challenge Tracker</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        <FilterButton />
        <FilterButton />
        <FilterButton />
      </div>
      <h2 id="list-heading">3 challenges remaining</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {taskList}
      </ul>
    </div>
  );
}

export default App;