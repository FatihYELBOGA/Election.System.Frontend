import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Img from '../../iyte_logo.jpg'
import './Navbar.css'
import { useNavigate } from 'react-router-dom';



function NavBar(props) 
{
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const {setUserId,role} = props;
  var menuNames = [];
  if(role === "STUDENT"){
    menuNames = ["HOME","VOTING","CANDIDACY APPLICATION","ELECTION RESULT"]
  }else if(role === "STUDENT_AFFAIR"){
    menuNames = ["ANNOUNCEMENTS","PROCESSES","CANDIDACY APPLICATIONS","USERS"]
  }
  
  
  

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
      setUserId(0);
      navigate("/");
      setAnchorElUser(null);
  };

  const handleProfileUserMenu = () => {
    navigate("/profile")
    setAnchorElUser(null);
  };

  return (
    <AppBar className='app-bar' position="static" sx={{backgroundColor: "#B61815", height:100}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box className='logo' sx={{marginTop: 2}}>
            <img src={Img} alt='IYTE Logo' width='100' height='75'></img>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' }, 
              }}
            >
              <MenuItem onClick={handleCloseNavMenu} >
                <Typography textAlign="center">Home</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu} >
                <Typography textAlign="center">Voting</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu} >
                <Typography textAlign="center">Candidacy Application</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu} >
                <Typography textAlign="center">Election Result</Typography>
              </MenuItem>  
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
           IYTE
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {menuNames.map((menu) =>(
            menu = menu.replace(" ","-"),
            <Button
              onClick={e => navigate("/"+menu.toLowerCase())}
              sx={{ my: 2, color: 'white', display: 'block',ml:5 }}
            >
              {menu.replace("-"," ")}
            </Button>

            ))}
            
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={e => { setAnchorElUser(null); } }
            >
                <MenuItem onClick={handleProfileUserMenu}>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>

                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">LogOut</Typography>
                </MenuItem>
              
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;