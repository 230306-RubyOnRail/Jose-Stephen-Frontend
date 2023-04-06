import React from 'react'
import { User } from './models/user'
import { Reimbursement } from './models/reimbursements'

interface IReimbursementsProps{
    currentUser: User | undefined,
    reimbursements: Reimbursement | undefined,
    setReimbursements: (nextReimbursements: Reimbursement) => void
}

export default function Reimbursements(props: IReimbursementsProps) {
    // props.currentUser?.user_role ? :


  return (
    props.currentUser?.user_role == true
    ?
    <>
    Manager
    </>
    :
    <>
    Employee
    </>
    
  )
}
