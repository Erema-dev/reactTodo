import TodoList from './Todo/TodoList'
//import AddTodo from './Todo/AddTodo'
import React, {useEffect} from 'react'
import Context from './context'
import Loader from './loader'

const AddTodo = React.lazy(() => import('./Todo/AddTodo'))


function App() {
  const [todos, setTodos] = React.useState([
    {id: 1, completed:true, title:'Проснуться утром'},
    {id: 2, completed:true, title:'Написать ТУДУ'},
    {id: 3, completed:false, title:'Выебнуться перед тимлидом'}
  ]);
  const [loading, setLoading] = React.useState(true)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos/?_limit=10')
    .then(response => response.json())
    .then(list => setTimeout(()=> {
     console.log(list)
      setLoading(false)
    }, 2000))  
  },[])

  function toggleTodo(id) {
    setTodos(todos.map(todo => {
      if(todo.id === id) {
       todo.completed = !todo.completed;
      }
      return todo;
    })
    )
  }

  function removeTodo(id){
    setTodos(todos.filter(todo => {
      return todo.id !== id
    })
    )
  }

  function addTodo(title){
    setTodos(todos.concat([{
      title,
      id: Date.now(),
      completed: false
    }]
    ))
  }

  return (
    <Context.Provider value={{removeTodo}}>
      <div className="wrapper">
        <h1> Special for teamlead </h1> 
        <React.Suspense fallback={<p>...loading</p>}>
           <AddTodo onCreate={addTodo}/>
        </React.Suspense>
       
        {loading && <Loader/> }
        { todos.length ? (<TodoList todos={todos} onToggle={toggleTodo} />) 
        : loading ? null: (
        <h3>'No tasks'</h3>
        ) }
      </div>
    </Context.Provider>
  )
}

export default App;
