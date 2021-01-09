import React from 'react'
import {List,ListItem,ListItemText} from '@material-ui/core';
import db from '../firebase'
import DeleteIcon from '@material-ui/icons/Delete';

const Todo = (props) => {
    return (
        <div>
        <List className="todo_list">
            <ListItem>
            <ListItemText  primary={props.todo.todo}/>
            <DeleteIcon onClick= {event => db.collection('todos').doc(props.todo.id).delete()}></DeleteIcon>
            </ListItem>
          </List>
         
        </div>
    )
}

export default Todo

// <Chip
//          style={{margin:10}}
//          size="small"
//          label={props.todo.todo}
//          onDelete={event => db.collection('todos').doc(props.todo.id).delete()}
//          variant="outlined"
//          deleteIcon={<DeleteIcon />}
//        />