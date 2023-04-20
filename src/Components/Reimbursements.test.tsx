import * as React from 'react'
import Reimbursements from "./Reimbursements";
import axios from "axios";
import { render } from "@testing-library/react";
import { Reimbursement } from './models/reimbursements';

jest.mock('axios')

describe("View reimbursements", () => {
    test("Renders view reimbursements page",() => {
        render(<Reimbursements currentUser={undefined} reimbursements={undefined} setReimbursements={function (nextReimbursements: Reimbursement): void {
            throw new Error('Function not implemented.');
        } }/>)
    })
})