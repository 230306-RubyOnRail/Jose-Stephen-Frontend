import { Navigate } from "react-router-dom"
import { User } from "./models/user"

interface IPropsUsers {
    currentUser: User | undefined
}


export default function Users(props:IPropsUsers) {
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
