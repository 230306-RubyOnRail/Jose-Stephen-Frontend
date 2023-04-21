import {useEffect, useState } from 'react'
import { User } from './models/user';
import { Checkbox } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface IRegisterProps {
  currentUser: User | undefined
}

export default function Register(props: IRegisterProps) {

  const API_URL = 'ec2-3-21-55-187.us-east-2.compute.amazonaws.com/3000'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('false')
  const navigate = useNavigate()

function changeValue() {
  if (role === 'false')
    setRole('true')
  else if (role === 'true') {
    setRole('false')
  }
  console.log(role)
}

  const create  = async () => {
    try {
      fetch(`${API_URL}/users/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${props.currentUser?.token}`
        },
        body: JSON.stringify({
            user_name: `${username}`,
            email: `${email}`,
            password: `${password}`,
            first_name: `${firstName}`,
            last_name: `${lastName}`,
            role: `${role}`
        })
      }).then(resp => {navigate('/users')})
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
      setRole('false')
  },[])
    
  return (
    <div>
      <h1>Register Users</h1>
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
      <div>Manager: <Checkbox value={'false'} onChange={() => changeValue()}/></div>
      <button type="submit" onClick={() => create()}>Register</button>
    </div>
  )
}
