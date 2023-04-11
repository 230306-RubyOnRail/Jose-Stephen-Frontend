import React, { useEffect } from 'react'
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
import { Button } from '@mui/material';
import { Navigate } from 'react-router-dom';

interface IReimbursementsProps {
  currentUser: User | undefined,
  reimbursements: Reimbursement | undefined,
  setReimbursements: (nextReimbursements: Reimbursement) => void
}

export default function Reimbursements(props: IReimbursementsProps) {
  // const[] 
  // /users/props.currentUser.id/reimbursements
  // /reimbursements

  const API_URL = 'http://localhost:3000'

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

  function toMoney(x: number) {
    return `$${x}` 
  }

  const approve = async (id: number) => {
    console.log("called")
    try {
        await axios.patch(`${API_URL}/reimbursements/${id}`, {reimbursement_status: 'approved'}, {
        headers: {
          Authorization: `Bearer ${props.currentUser?.token}`
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  const deny = async (id: number) => {
    try {
      await axios.patch(`${API_URL}/reimbursements/${id}`, {status: 'deny'}, {
      headers: {
        Authorization: `Bearer ${props.currentUser?.token}`
      }
    })
  } catch (err) {
    console.log(err)
  }
  }

  useEffect(() => {
    fetchReimbursements()
  }, [])


  return (
    props.currentUser
      ?
      props.currentUser?.user_role === true
        ?
        props.reimbursements?.reimbursements[0] ?
          <>
          <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableCell>Id</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Status</TableCell>
          </TableHead>
          <TableBody>
             {props.reimbursements.reimbursements.map((item) => (
              <TableRow key={item.id}>
                 <TableCell>{item.id}</TableCell>
                 <TableCell>{item.description}</TableCell>
                 <TableCell>{toMoney(item.amount)}</TableCell>
                 <TableCell>{item.status}</TableCell>
                 <TableCell><Button onClick={() => deny(item.id)}>Reject</Button></TableCell>
                 <TableCell><Button onClick={() => approve(item.id)}>Accept</Button></TableCell>
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
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
        <TableCell>Id</TableCell>
        <TableCell>Description</TableCell>
        <TableCell>Amount</TableCell>
        <TableCell>Status</TableCell>
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
