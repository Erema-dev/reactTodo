import React from 'react'
import propTypes from 'prop-types'
import Context from '../context'
import {useContext} from 'react'

const styles = {
    li: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: `.5rem 1rem`,
        border: '1px solid #ccc',
        borderRadius: '15px',
        marginBottom: '.5rem'
    },
    input: {
        marginRigth:'1rem'
    },
}

function TodoItem( { todo, index, onChange } ) {
    const classes = []
    const {removeTodo} = useContext(Context)
    if(todo.completed){
        classes.push('done');
    }

    return (
        <li style={styles.li}>
            <span className={classes.join(' ')}>
                <input type="checkbox" 
                style={styles.input} 
                checked={todo.completed}
                onChange={() => onChange(todo.id)} />
                <strong>{index+1}: </strong>
                {todo.title}
            </span>
            <button className="rm" onClick={() => removeTodo(todo.id)}>&times;</button>
        </li>
    )
}

TodoItem.propTypes = {
    todo: propTypes.object.isRequired,
    index: propTypes.number.isRequired,
    onChange: propTypes.func.isRequired,
}

export default TodoItem