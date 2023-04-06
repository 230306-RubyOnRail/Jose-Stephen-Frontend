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
}

export default function NavbarComponent(props:INavbarComponent) {

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
          {props.currentUser ? 
          <div> 
          <Button color="inherit"><Link to="/login">Logout</Link></Button>
          </div>:
          <div><Button color="inherit"><Link to="/register">Register</Link>
          </Button> <Button color="inherit"><Link to="/login">Login</Link></Button> </div>}
          
        </Toolbar>
      </AppBar>
    </Box>
    )
}