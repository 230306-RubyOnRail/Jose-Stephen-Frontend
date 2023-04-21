import { SyntheticEvent, useState } from 'react'
import { User } from './models/user'
import { Button } from 'react-bootstrap'
import { Navigate, useNavigate } from 'react-router-dom'
import '../styles/global.css'

interface ISubmitProps {
  currentUser: User | undefined
}

export default function Submit(props: ISubmitProps) {

  const API_URL = 'ec2-3-21-55-187.us-east-2.compute.amazonaws.com/3000'

  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const navigate = useNavigate()

  let updateAmount = (e: SyntheticEvent) => {
    setAmount((e.target as HTMLInputElement).value);
    console.log(props.currentUser)
  }

  let updateDescription = (e: SyntheticEvent) => {
    setDescription((e.target as HTMLInputElement).value);
  }

  const create  = async () => {
    try {
      fetch(`${API_URL}/reimbursements/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${props.currentUser?.token}`
        },
        body: JSON.stringify({
          reimbursement: {
            amount: `${amount}`,
            description: `${description}`,
            status: 'Received',
            user_id: `${props.currentUser?.user_id}`
          }
        })
      })
      .then(data => {navigate("/reimbursements")})
    } catch (err) {
      console.log(err)
    }
  }

  return (
    props.currentUser?.user_id
    ?
    props.currentUser?.user_role === false
    ?
    <div>
      <div className='header'>Submit</div>
      <div className='container'>
      <div>Amount: <input type="text" placeholder='' onChange={updateAmount}/></div>
      <div>Description: <input type="text" onChange={updateDescription}/></div>
      </div>
      <Button onClick={() => create()}>Submit</Button>
      </div>
      :
      <Navigate to='/reimbursements'/>
      :
      <Navigate to='/login'/>
  )
}