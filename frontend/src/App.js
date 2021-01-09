import './App.css';
import Footer from './component/Footer';
import Button from '@material-ui/core/Button';
import React, { useEffect, useState } from 'react';
import Todo from './component/Todo';
import db from './firebase';
import firebase from 'firebase'

function App() {
  const [todos, setTodos] = useState([]);
  const [input,setInput] = useState('');

  // Here i need something that will run everytime the firebase database changes
  useEffect(
    ()=>{ 
      db.collection('todos').orderBy('timestamp','desc').onSnapshot(snapshot=>{
        setTodos(snapshot.docs.map(doc =>
          ({id:doc.id,todo:doc.data().todo})
        ))
      })
    },[]
  );


  const addTodo = (event) =>{
    //this will fire off when we will click on the button
    event.preventDefault();

    db.collection('todos').add(
      {
        todo:input,
        timestamp:firebase.firestore.FieldValue.serverTimestamp()
      }
    )
    setTodos([...todos,input]);
    setInput('');
  }
  return (
    <div className="App">
    <main>
     <h1>Todo App🤠</h1>
     <form>
     <input value={input} onChange={event => setInput(event.target.value)} />&nbsp; &nbsp;
     <Button type="submit" onClick={addTodo} variant="contained" color="primary" disabled={!input}>Add</Button>
     </form>
      <ul>
     {todos.map(todo=>(
       <Todo todo={todo}/>
     ))}
     </ul>
    </main>
     <Footer/>
    </div>
  );
}

export default App;
