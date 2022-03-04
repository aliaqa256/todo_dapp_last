


import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Campaign from '../ethereum/campaign';
import web3 from "../ethereum/web3";
import { Router } from "../routes";
import { useRouter } from 'next/router'

const Detail = ( props ) =>
{
    const router = useRouter()
    const { address } = router.query;

    const [ count, setCount ] = useState( 0 )
    const [ allTodos, setAllTodos ] = useState( [] )
    const [ text, setText ] = useState( "" )

    useEffect( async () =>
    {
        const TodoContract = Campaign( address );
        const countOfTodo = await TodoContract.methods.getTodoCount().call();
        setCount( countOfTodo )
        const final_arr = []
        for ( let i = 0; i < countOfTodo; i++ )
        {

            const todo = await TodoContract.methods.getTodoWithStatus( parseInt( i ) ).call();
            final_arr.push( todo )
        }
        setAllTodos( final_arr )



    }, [] );

    const completeTODO = async ( index ) =>
    {
        const accounts = await web3.eth.getAccounts();
        const TodoContract = Campaign( address );
        const countOfTodo = await TodoContract.methods.completeTodo( index ).send( {
            from: accounts[ 0 ],
        } );
        Router.push( "/" )
    }

    const onSubmit = async ( event ) =>
    {
        event.preventDefault();
        const accounts = await web3.eth.getAccounts();
        const TodoContract = Campaign( address );
        await TodoContract.methods.createTodo( text ).send( {
            from: accounts[ 0 ],
        } );
        Router.push( "/" )
    }


    return ( <div>

        <form onSubmit={ onSubmit }>
            <input type="text" onChange={ ( t ) => { setText( t.target.value ) } } />
            <input type="submit" value="create" />
        </form>




        <h1>{ address }</h1>
        <p>This is the detail page</p>
        <br />
        <h3>Todo List</h3>
        <hr />

        { allTodos.map( ( todo, index ) =>
        {
            const state = "not done"
            if ( todo[ 1 ] )
            {
                state = "done"
            }

            return ( <div key={ index }>
                <p>{ todo[ 0 ] }</p>
                <p>      { state }    </p>
                { !todo[ 1 ] && <button onClick={ () => { completeTODO( index ) } }> complete it  </button> }
                <hr />
            </div> )





        } ) }



    </div> );
}


export default Detail;
