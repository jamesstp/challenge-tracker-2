import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import '../src/index.css'

const DATA = [
    {id: "todo-0", name: "HTML, CSS, and Git: Code Refactor", completed: true},
    {id: "todo-1", name: "Advanced CSS: Portfolio", completed: false },
    {id: "todo-2", name: "JavaScript: Password Generator", completed: false },
];
console.log(DATA)
ReactDOM.render(<App tasks={DATA} />, document.getElementById('root'));