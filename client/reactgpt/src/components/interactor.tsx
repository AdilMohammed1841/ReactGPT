import React from 'react';
import { chatWithAI } from '../utils/utils';
import Typewriter from 'typewriter-effect';

const Interactor = () => {
    const [ input, setInput ] = React.useState('');
    const [ resp, setResp ] = React.useState('');
    const [ showTyper, setShowTyper ] = React.useState(false);
    const [ clicked, setClicked ] = React.useState(false);

    const formHandler = async (event: any = null ) => {
        if(event) {
            setClicked(false)
            event.preventDefault();
            setInput(event.target.value);   
        } else {
            if(input){
            setClicked(true)

           const data = await chatWithAI(input);
           if(data){
                setResp(data.data.data.content);
           }}
        }
    };
        
    React.useEffect(() => {
        if(input && resp && clicked ){
            setShowTyper(true);
        } else {
            setShowTyper(false);
        };
    },[input, resp, clicked]);

  return (
    <div>
        <input type="text" placeholder="wanna talk to me.....?" onChange={formHandler} />
        <button onClick={()=>{formHandler(null)}} > Ask </button>
        <button onClick={()=>setInput('')} > Cancel </button>
        {
            showTyper && 
                <Typewriter
                        options={{
                        strings: [
                            resp
                        ],
                        autoStart: true,
                        loop: true,
                        deleteSpeed: 50,
                        }}
                />
        }
    </div>
  )
}

export default Interactor