import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { User } from './models/user';
import { Link } from 'react-router-dom';
import '../styles/nav.css'


interface INavbarComponent {
    currentUser: User | undefined,
    setCurrentUser: (nextUser: User | undefined) => void
}

export default function NavbarComponent(props:INavbarComponent) {
    function logout() {
        props.setCurrentUser(undefined);
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {props.currentUser ? <div>{props.currentUser.user_first_name} {props.currentUser.user_role ? '(M)' : '(E)'}</div>: "Reimbursements" }
          </Typography>

          {!props.currentUser ?
            <div>
               <Button><Link className='nav-title hover-large' to="/login">Log</Link></Button>
               <div>hello</div>
            </div>
            :
            props.currentUser.user_role ? 
            <div>
                <Button ><Link className='nav-title hover-large' to="/users">Users</Link></Button>
                <Button ><Link className='nav-title hover-large' to="/register">Register</Link></Button>
                <Button ><Link className='nav-title hover-large' to="/reimbursements">All</Link></Button>
                <Button className="hover-large" onClick={logout} color="inherit">Logout</Button>
            </div>
            :
            <div>
                <Button color="inherit"><Link className='nav-title hover-large' to="/submit">Submit</Link></Button>
                <Button color="inherit"><Link className='nav-title hover-large' to="/reimbursements">All</Link></Button>
                <Button onClick={logout} color="inherit">Logout</Button>
            </div>
}
        </Toolbar>
      </AppBar>
    </Box>
    )
}