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

interface IReimbursementsProps {
  currentUser: User | undefined,
  reimbursements: Reimbursement | undefined,
  setReimbursements: (nextReimbursements: Reimbursement) => void
}

export default function Reimbursements(props: IReimbursementsProps) {
  // const[] 
  // /users/props.currentUser.id/reimbursements
  // /reimbursements

  const fetchReimbursements = async () => {
    try {
      let response = await axios.get('http://localhost:3000/reimbursements', {
        headers: {
          Authorization: `Bearer ${props.currentUser?.token}`
        }
      })
      props.setReimbursements(response.data)
      console.log(props.reimbursements)
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
      props.currentUser?.user_role == true
        ?
        props.reimbursements?.reimbursements[0] ?
          <>
          <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
          <TableCell></TableCell>
          
          <TableCell>Description</TableCell>
          <TableCell>Status</TableCell>
          </TableHead>
          <TableBody>
             {props.reimbursements.reimbursements.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                 <TableCell>{item.description}</TableCell>
                 <TableCell>{item.status}</TableCell>
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
          {"Not a Manager"}
        </>
      :
      <>
        {"Navigate to login"}
      </>

  )
}
