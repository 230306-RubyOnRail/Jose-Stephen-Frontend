import { useEffect } from 'react'
import { User } from './models/user'
import { Reimbursement } from './models/reimbursements'
import axios from 'axios'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Navigate, useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import DangerousIcon from '@mui/icons-material/Dangerous';
import  '../styles/reimbursements.css'
import  '../styles/global.css'

interface IReimbursementsProps {
  currentUser: User | undefined,
  reimbursements: Reimbursement | undefined,
  setReimbursements: (nextReimbursements: Reimbursement) => void
  count: number
}

export default function Reimbursements(props: IReimbursementsProps) {

  const API_URL = 'ec2-3-21-55-187.us-east-2.compute.amazonaws.com/3000'
  const navigate = useNavigate()

  // Gets reimbursements from the database
  const fetchReimbursements = async () => {
    try {
      let response = await axios.get(`${API_URL}/reimbursements`, {
        headers: {
          Authorization: `Bearer ${props.currentUser?.token}`
        }
      })
      props.setReimbursements(response.data)
    } catch (err) {
      console.log(err)
    }
  }


  //Turns the number into a dollar amount
  function toMoney(x: number) {
    return `$${x}` 
  }


  //Changes the status of the Reimbursement to approved
  const approve = async (id: number) => {
    console.log("called")
    try {
      const resp = await fetch(`${API_URL}/reimbursements/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${props.currentUser?.token}`
        },
        body: JSON.stringify({
          reimbursement: {
            status: 'Approved',
          }
        })
      })
      if(resp.status === 204) {
        fetchReimbursements();
      }
    } catch (err) {
      console.log(err)
    }
  }

  //Changes the status of the Reimbursement to denied
  const deny = async (id: number) => {
    try {
      const resp = await fetch(`${API_URL}/reimbursements/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${props.currentUser?.token}`
        },
        body: JSON.stringify({
          reimbursement: {
            status: 'Denied',
          }
        })
      })
      if(resp.status === 204) {
        fetchReimbursements();
      }
    } catch (err) {
      console.log(err)
    }
  }


  //deletes reimbursement
  const remove = async (id:number) => {
    try {
       await fetch(`${API_URL}/reimbursements/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${props.currentUser?.token}`
        }
      }).then(resp => {fetchReimbursements()})
    } catch (err) {
      console.log(err)
    }
  }

  const edit = (id: number) => {
    navigate(`/reimbursement/${id}/edit`)
  }


  //Use Effect for getting reimbursements
  useEffect(() => {
    const fetchReimbursements = async () => {
      try {
        let response = await axios.get(`${API_URL}/reimbursements`, {
          headers: {
            Authorization: `Bearer ${props.currentUser?.token}`
          }
        })
        props.setReimbursements(response.data)
      } catch (err) {
        console.log(err)
      }
    }

    fetchReimbursements()
    console.log(props)
  }, [props.count])


  return (
    props.currentUser
      ?
      props.currentUser?.user_role === true
        ?
        props.reimbursements?.reimbursements[0] ?
          <>
          <div className='header'>Reimbursements</div>
          <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableCell>Id</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Deny</TableCell>
            <TableCell>Approve</TableCell>
            <TableCell>Delete</TableCell>
          </TableHead>
          <TableBody>
             {props.reimbursements.reimbursements.map((item) => (
              <TableRow key={item.id}>
                 <TableCell>{item.id}</TableCell>
                 <TableCell>{item.description}</TableCell>
                 <TableCell>{toMoney(item.amount)}</TableCell>
                 <TableCell>{item.status}</TableCell>
                 <TableCell><DangerousIcon className='icon-hover' style={{ color: 'red' }} onClick={() => deny(item.id)}>Reject</DangerousIcon></TableCell>
                 <TableCell><CheckIcon className='icon-hover' style={{ color: 'green' }} onClick={() => approve(item.id)}></CheckIcon></TableCell>
                 <TableCell><DeleteIcon className='icon-hover' style={{ color: 'grey' }} onClick={() => remove(item.id)}></DeleteIcon></TableCell>
              </TableRow>
             ))}
             </TableBody>
             </Table>
             </TableContainer>
          </>
          :
          <div>{"No reimbursements"}</div>
        :
        <>
        <div className='header'>Reimbursements</div>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
        <TableCell>Id</TableCell>
        <TableCell>Description</TableCell>
        <TableCell>Amount</TableCell>
        <TableCell>Status</TableCell>
        <TableCell>Edit</TableCell>
        <TableCell>Delete</TableCell>
        </TableHead>
        <TableBody>
          {props.reimbursements?.reimbursements.filter((id) => (
             id.user_id === props.currentUser?.user_id
          )
          ).map((item) => (
            <TableRow key={item.id}>
            <TableCell>{item.id}</TableCell>
             <TableCell>{item.description}</TableCell>
             <TableCell>{toMoney(item.amount)}</TableCell>
             <TableCell>{item.status}</TableCell>
             <TableCell><EditIcon className='icon-hover' style={{ color: 'gold'}} onClick={() => edit(item.id)}></EditIcon></TableCell>
             <TableCell><DeleteIcon className='icon-hover' style={{ color: 'grey' }} onClick={() => remove(item.id)}></DeleteIcon></TableCell>
          </TableRow>
         ))}
         </TableBody>
         </Table>
         </TableContainer>
        </>
      :
      <>
        <Navigate to='/login'/>
      </>

  )
}
