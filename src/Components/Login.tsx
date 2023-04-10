import { SyntheticEvent, useState } from "react";
import { User } from "./models/user";
import { Navigate } from "react-router-dom";

interface ILoginProps{
    currentUser: User | undefined,
    setCurrentUser: (nextUser: User) => void
}

export default function Login(props: ILoginProps) {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // useState => [value, setter]; 

    let updateEmail = (e: SyntheticEvent) => {
        setEmail((e.target as HTMLInputElement).value); // e.target could be any element, cast as HTMLInput to retrieve the value
        // console.log(`email is: ${email}`);
    }

    let login = async (e: SyntheticEvent) => {
        if(email && password){
            setErrorMessage('');

            try{
                let response = await fetch('http://localhost:3000/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type' : 'application/json'
                    }, 
                    body: JSON.stringify({email, password})
                });

                if(response.status === 201){
                    props.setCurrentUser(await response.json())
                } else {
                    console.log('unable to reach API');
                }
            } catch (err){
                console.log(err);
            }
        } else {
           setErrorMessage('Invalid input for email/password.');
           console.log(errorMessage);
        }
    }

    return (
        props.currentUser ? // if
        <>
        <Navigate to='/reimbursements'/>
        </>
        : // else
        <>
            <p>Login</p>
            <div>
                <input type="text" id="login-email" placeholder="Enter your email" onChange={updateEmail}/>
                <br /><br />
                <input type="password" id="login-password" placeholder="Enter your password" onChange={(e) => {
                    setPassword(e.target.value);
                    }}/>
                <br /><br />
                <button id="login-button" onClick={login}>Login</button>                
            </div>
            <div>
                {errorMessage}
            </div>
        </>
    );
}