// a next js hello world page 


import React,{useEffect,useState} from 'react';
import ReactDOM from 'react-dom';
import factory from '../ethereum/factory';
import { Link } from "../routes";

const Index = () =>
{
    const [todoLists,setTodoLists]=useState([]);
    useEffect(async () =>
    {
        const deployedTodos = await factory.methods.getDeployedTodoLists().call();
        setTodoLists(deployedTodos);


     }, [] );


    return (
        <div>

            <h1>Todo Lists</h1>
            {
                todoLists.map( (todoList) =>
                {
                    return ( <div>  { todoList }  <Link href={ { pathname: 'detail', query: { address: `${todoList}` } } } >goto </Link>  </div> );
                }  )

            }
            <br />
            
            <Link route={ `/new` }>
                <a>new todo list</a>
            </Link>

            
        </div>
    );
}
    

export default Index;
