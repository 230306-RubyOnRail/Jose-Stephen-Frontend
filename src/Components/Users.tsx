import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { User } from "./models/user"
import axios from "axios"
import { users } from "./models/users"
import { Table, TableContainer, Paper, TableHead, TableCell, TableBody, TableRow } from "@mui/material"
import DangerousIcon from '@mui/icons-material/Dangerous';
import CheckIcon from '@mui/icons-material/Check';

interface IPropsUsers {
    currentUser: User | undefined
}


export default function Users(props:IPropsUsers) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${props.currentUser?.token}`
      }

      const API_URL = 'http://localhost:3000'
      const [users, setUsers] = useState<users>()

        //Changes the status of the Reimbursement to denied
  const remove = async (id: number) => {
    try {
      const resp = await fetch(`${API_URL}/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${props.currentUser?.token}`
        }
      })
      if(resp.status === 204) {
        fetchUsers()
      }
    } catch (err) {
      console.log(err)
    }
  }

  function fetchUsers() {
    axios.get(`${API_URL}/users`, {
      headers: headers
    })
    .then((response) => {
      setUsers(response.data)
})
  }

      useEffect(() => {
        fetchUsers()
        }, [])
      
      
        

  return (
    props.currentUser?
    props.currentUser.user_role === true
    ?
    <>
          <div className='header'>Users</div>
          <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>User Name</TableCell>
            <TableCell>Manager</TableCell>
            <TableCell>Delete Account</TableCell>
          </TableHead>
          <TableBody>
             {users?.user.map((user) => (
              <TableRow key={user.id}>
                 <TableCell>{user.first_name}</TableCell>
                 <TableCell>{user.last_name}</TableCell>
                 <TableCell>{user.email}</TableCell>
                 <TableCell>{user.user_name}</TableCell>
                 <TableCell>{user.role? <CheckIcon style={{ color: 'green' }}/>:<div></div>}</TableCell>
                 <TableCell><DangerousIcon className='icon-hover' style={{ color: 'red' }} onClick={() => remove(user.id)}>Reject</DangerousIcon></TableCell>
              </TableRow>
             ))}
             </TableBody>
             </Table>
             </TableContainer>
    </>
    :
    <Navigate to="/reimbursements" />
    :
    <>
        <Navigate to="/login" />
    </>
  )
}

