// a next js hello world page 


import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import factory from '../ethereum/factory';
import web3 from "../ethereum/web3";
import { Router } from "../routes";

const Index = () =>
{
   
   const  onSubmit = async ( event ) =>
    {
       event.preventDefault();

       try
       {
           
           const accounts = await web3.eth.getAccounts();
           await  factory.methods
               .createTodoList( )
               .send( {
                   from: accounts[ 0 ],
               } );
           Router.push("/")
       } catch ( err )
       {
           console.log( err);;
       }
    };


    return (
        <div>

         
            <form  onSubmit={onSubmit}>
                <input type="submit"  value="create"/>
            </form>
                    

        </div>
    );
}


export default Index;
