import { SyntheticEvent, useState } from 'react'
import { User } from './models/user'
import { Button } from 'react-bootstrap'
import { Navigate } from 'react-router-dom'

interface ISubmitProps {
  currentUser: User | undefined
}

export default function Submit(props: ISubmitProps) {

  const API_URL = 'http://localhost:3000'

  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')

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
    } catch (err) {
      console.log(err)
    }
  }

  return (
    props.currentUser?.user_id
    ?
    props.currentUser?.user_role === true
    ?
    <div>
      <div>Amount: <input type="text" placeholder='' onChange={updateAmount}/></div>
      <div>Description: <input type="text" onChange={updateDescription}/></div>
      <Button onClick={() => create()}>Submit</Button>
      </div>
      :
      <Navigate to='/reimbursements'/>
      :
      <Navigate to='/login'/>
  )
}