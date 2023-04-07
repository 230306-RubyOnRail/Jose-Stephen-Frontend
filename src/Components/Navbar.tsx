import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { User } from './models/user';
import { Link } from 'react-router-dom';
import Login from './Login';

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
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {props.currentUser ? <div>{props.currentUser.user_first_name}</div>: "Reimbursements" }
          </Typography>

          {!props.currentUser ?
            <div>
                <Button color="secondary"><Link to="/register">Register</Link>
                </Button> <Button color="inherit"><Link to="/login">Login</Link></Button></div>
            :
            props.currentUser.user_role ? 
            <div>
                <Button color="inherit"><Link to="/users">Users</Link></Button>
                <Button color="inherit"><Link to="/manager/reimbursements">Reimbursements</Link></Button>
                <Button onClick={logout} color="inherit">Logout</Button>
            </div>
            :
            <div>
                <Button color="inherit"><Link to="/reimbursements">Reimbursements</Link></Button>
                <Button onClick={logout} color="inherit">Logout</Button>
            </div>
}
        </Toolbar>
      </AppBar>
    </Box>
    )
}