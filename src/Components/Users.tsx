import React, { useEffect } from "react"
import { Navigate } from "react-router-dom"
import { User } from "./models/user"
import axios from "axios"

interface IPropsUsers {
    currentUser: User | undefined
}


export default function Users(props:IPropsUsers) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${props.currentUser?.token}`
      }

      const API_URL = 'http://localhost:3000'

      useEffect(() => {
        axios.get(`${API_URL}/users`, {
            headers: headers
          })
          .then((response) => {
            console.log(response.data)
    })})
      
      
        

  return (
    props.currentUser?.user_role ?
    <>\
        Users
    </>
    :
    <>
        <Navigate to="/login" />
    </>
  )
}

