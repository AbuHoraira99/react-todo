import { useState, useEffect, use } from 'react'
import Navbar from './components/Navbar'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';
 

function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showFinish, setshowFinish] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
       settodos(todos)
    }
  }, [])
  
  // const saveTodoLS = () => {
  //   localStorage.setItem("todos", JSON.stringify(todos))  
  // }

  const toggleFinish = (e) => {
    setshowFinish(!showFinish)
    
  }
  
  
  
  const handleEdite = (e, id)=>{
    let t = todos.filter(i=>i.id === id)
    settodo(t[0].todo)
    let updateTodos = todos.filter(item=>{
      return item.id!==id
    });
    // settodos(newTodos)
    settodos(updateTodos)
    localStorage.setItem("todos", JSON.stringify(updateTodos))
    // saveTodoLS()
  }

  const handleDelete = (e, id)=>{
    let updateTodos = todos.filter(item=>{
      return item.id!==id
    });
    // settodos(newTodos)
    
    settodos(updateTodos)
    localStorage.setItem("todos", JSON.stringify(updateTodos))
    // saveTodoLS()
  }

  const handleAdd = ()=>{
    if(todo.trim() === "") return;
    let newTodo = {id: uuidv4(), todo, isCompleted: false}
    let updateTodos = [...todos, newTodo]
    settodos(updateTodos)
    localStorage.setItem("todos", JSON.stringify(updateTodos))
    settodo("")
    // settodos([...todos, {id: uuidv4(), todo, isCompleted: false}] )
    // settodo("")
    // console.log(todos)
    // saveTodoLS()
  }

  const handleChange = (e)=>{
    settodo(e.target.value)
  }

  const handleChackBox = (e) => {
    let id = e.target.name;
    // console.log(`this id is ${id}`)
    let index = todos.findIndex(item=>{
      return item.id === id;
    })
    // console.log(index)
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    // settodos(newTodos)
    settodos(newTodos)
    localStorage.setItem("todos", JSON.stringify(newTodos))
    // // console.log(newTodos)
    // saveTodoLS()
  }
  
  return (
    <>
    <Navbar/>
      <div className="md:container mx-5 md:mx-auto rounded-xl min-h-[80vh] md:w-1/2 bg-violet-100 my-5 p-5">
      <h1 className='font-bold text-center text-3xl my-4'>iTask - Manage your todos at one place</h1>
        <div className="add-todo">
          <h2 className='font-bold text-lg'>Add Your Todo</h2>
          <div className='flex gap-4'>
          <input onChange={handleChange} value={todo}  type="text"  className='border-[1px] border-black w-full rounded-full px-3 py-1.5'/>
          <button onClick={handleAdd} className='bg-violet-800 hover:bg-violet-950 text-white cursor-pointer font-bold text-sm p-3 px-4 py-2 rounded-full'>Save</button>
          </div>
        </div>
        <input type="checkbox" onChange={toggleFinish} checked={showFinish} className='px-2 my-3' /> <span className='font-bold text-lg ml-1'>show Finish</span>
        <div className='h-[1px] bg-black opacity-30 my-4'></div>
        <h2 className='text-lg font-bold'>Your Todo</h2>
        <div className="todos">
          {todos.length === 0 && (<div className='m-3 font-bold'>NO todos to display</div>) }
          {todos.map(item=>{ return (showFinish || !item.isCompleted) && <div key={item.id} className="todo flex md:w-3/4 justify-between">
            <div className='flex items-center'>
            <input onChange={handleChackBox} type="checkbox" checked={item.isCompleted} className='mr-3' name={item.id} id="" />
            <div className={item.isCompleted?"line-through": ""}>{item.todo}</div>
            </div>
            <div className='button flex h-full'>
            <button onClick={(e)=>handleEdite(e, item.id)} className='bg-violet-800 hover:bg-violet-950 text-white cursor-pointer font-bold text-sm p-1 px-3 mx-1 rounded-md mb-3'><FaEdit /></button>
            <button onClick={(e)=>{handleDelete(e, item.id)}} className='bg-violet-800 hover:bg-violet-950 text-white cursor-pointer font-bold text-sm p-1 px-3 mx-1 rounded-md mb-3'><MdDelete /></button>
            </div>
          </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
