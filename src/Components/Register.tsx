import React, { SyntheticEvent, useState } from 'react'

export default function Register() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  let updateEmail = (e: SyntheticEvent) => {
    setEmail((e.target as HTMLInputElement).value); // e.target could be any element, cast as HTMLInput to retrieve the value
    // console.log(`email is: ${email}`);
  }

  let register = async (e: SyntheticEvent) => {
    console.log(`username = ${username}, password = ${password}, first_name = ${firstName}, last_name = ${lastName}, email = ${email}`);
  }
    
  return (
    <div>
      Register
    </div>
  )
}
