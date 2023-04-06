import React, { SyntheticEvent, useState } from 'react'

export default function Register() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const role = false;

  let updateEmail = (e: SyntheticEvent) => {
    setEmail((e.target as HTMLInputElement).value); // e.target could be any element, cast as HTMLInput to retrieve the value
    // console.log(`email is: ${email}`);
  }

  let register = async (e: SyntheticEvent) => {
    console.log(`username = ${username}, password = ${password}, first_name = ${firstName}, last_name = ${lastName}, email = ${email}, role = ${role}`);
  }
    
  return (
    <div>
      <h1>Register works? Register works!</h1>
      <input type="text" name="register-username" id="register-username" placeholder='Username' onChange={(e) => {setUsername(e.target.value)}}/>
      <br />
      <input type="password" name="register-password" id="register-password" placeholder='Password' onChange={(e) => 
        { setPassword(e.target.value); }}/>
      <br />
      <input type="text" name="register-firstName" id="register-firstName" placeholder='First name' onChange={(e) => {setFirstName(e.target.value)}}/>
      <br />
      <input type="text" name="register-lastName" id="register-lastName" placeholder='Last name' onChange={(e) => {setLastName(e.target.value)}}/>
      <br />
      <input type="email" name="register-email" id="register-email" placeholder='Email address' onChange={(e) => {setEmail(e.target.value)}}/>
      <br />
      <button type="submit" onClick={register}>Register</button>
    </div>
  )
}
