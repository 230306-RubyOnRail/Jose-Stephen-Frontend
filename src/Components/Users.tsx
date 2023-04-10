
import { Navigate } from "react-router-dom"
import { User } from "./models/user"
import axios from "axios"

interface IPropsUsers {
    currentUser: User | undefined
}


export default function Users(props:IPropsUsers) {
    // const headers = {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${props.currentUser?.token}`
    //   }

    // componentDidMount() {
    //     axios.get('localhost:3000/users' {
    //         headers: headers
    //       })
    //       .then((response) => {
            
    // })}
      
      
        

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
function componentDidMount() {
    throw new Error('Function not implemented.');
}

