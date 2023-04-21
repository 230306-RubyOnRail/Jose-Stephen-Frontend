import { useState} from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NavbarComponent from "./Components/Navbar";
import {User} from "./Components/models/user"
import Login from './Components/Login';
import Register from './Components/Register';
import Reimbursements from './Components/Reimbursements';
import { Reimbursement } from './Components/models/reimbursements';
import Users from './Components/Users';
import Submit from './Components/Submit';
import EditReimbursements from './Components/EditReimbursements';


function App() {
  const [principal, setPrincipal] = useState<User>();
  const [reimbursements, setReimbursements] = useState<Reimbursement>();
  const [count, setCount] = useState(1)

  return (
    <div className="App">
      <BrowserRouter>
      <NavbarComponent currentUser={principal} setCurrentUser={setPrincipal}/>
      <Routes>
        {/* <TestComponent/> */}
        <Route path ="login" element={<Login currentUser={principal} setCurrentUser={setPrincipal}/>}/>
        <Route path='register' element={<Register currentUser={principal}/>}/>
        <Route path='submit' element={<Submit currentUser={principal}/>}/>
        <Route path="users" element={<Users count={count} currentUser={principal}/>}/>
        <Route path='reimbursement/:id/edit' element={<EditReimbursements count={count} currentUser={principal} reimbursements={reimbursements} setReimbursements={setReimbursements}/>}/>
        <Route path='reimbursements' element={<Reimbursements currentUser={principal} reimbursements={reimbursements} setReimbursements={setReimbursements} count={count} />}/>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
