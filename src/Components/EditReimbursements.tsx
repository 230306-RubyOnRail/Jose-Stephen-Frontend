import { SyntheticEvent, useEffect, useState } from "react"
import { Reimbursement } from "./models/reimbursements"
import { User } from "./models/user"
import { Button } from "react-bootstrap"
import { useNavigate, Navigate, useParams } from "react-router-dom"
import axios from "axios"
import { SingleReimbursement } from "./models/reimbursement"



interface IEditReimbursementsProps {
    currentUser: User | undefined,
    reimbursements: Reimbursement | undefined,
    setReimbursements: (nextReimbursements: Reimbursement) => void
    count:number
  }
  

export default function EditReimbursements(props: IEditReimbursementsProps) {
    const API_URL = 'http://localhost:3000'
    const {id} = useParams()

    const [amount, setAmount] = useState('')
    const [description, setDescription] = useState('')
    const [thisReimbursement, setThisReimbursement] = useState<SingleReimbursement>()
    const navigate = useNavigate()
  
    // Update Amount function
    let updateAmount = (e: SyntheticEvent) => {
      setAmount((e.target as HTMLInputElement).value);
      console.log(thisReimbursement)
    }
    
    // Update Description function
    let updateDescription = (e: SyntheticEvent) => {
      setDescription((e.target as HTMLInputElement).value);
      console.log(thisReimbursement)
    }


    const fetchThisReimbursements = async () => {
            try {
                let resp = await axios.get(`${API_URL}/reimbursements/${id}`, {
                  headers: {
                    Authorization: `Bearer ${props.currentUser?.token}`
                  }
                })
                if(resp.status === 200) {
                    setThisReimbursement(resp.data)
                    }
                
          } catch (err) {
            console.log(err)
          }
                }
      
  

    // EDIT Function
    const edit = async () => {
      try {
        fetch(`${API_URL}/reimbursements/${id}`, {
          method: 'PUT',
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

    useEffect(() => {
      let fetchThisReimbursements = async () => {
        try {
            let resp = await axios.get(`${API_URL}/reimbursements/${id}`, {
              headers: {
                Authorization: `Bearer ${props.currentUser?.token}`
              }
            })
            if(resp.status === 200) {
                setThisReimbursement(resp.data)
                }
            
      } catch (err) {
        console.log(err)
      }
            }

        fetchThisReimbursements()
    },[props.count])
  
    return (
      props.currentUser?.user_id
      ?
      <div>
        <div>Previous Amount: {thisReimbursement?.amount}</div>
        <div>New Amount: <input type="text" placeholder='' onChange={updateAmount}/></div>
        <br/>
        <div>Previous Amount: {thisReimbursement?.description}</div>
        <div>Description: <input type="text" onChange={updateDescription}/></div>
        <Button onClick={() => edit()}>Submit</Button>
        </div>
        :
        <Navigate to='/login'/>
    )
}
