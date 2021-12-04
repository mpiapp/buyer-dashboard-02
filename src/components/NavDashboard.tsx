/* istanbul ignore file */
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import HomeIcon from '@mui/icons-material/Home';
import ReorderIcon from '@mui/icons-material/Reorder';
import ViewListIcon from '@mui/icons-material/ViewList';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ForumIcon from '@mui/icons-material/Forum';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import ChromeReaderModeIcon from '@mui/icons-material/ChromeReaderMode';
import ListAltIcon from '@mui/icons-material/ListAlt';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import logo from '../assets/img/logo.png'

const drawerWidth = 240;

interface Props {
    window?: () => Window;
  }

const NavDashboard = (props: Props) => {
    const auth = useSelector((state : RootState) => state.login )
    
    const history = useHistory()
    const { window } = props

    const [mobileOpen, setMobileOpen] = React.useState(false);
        
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const [openDialog, setOpenDialog] = React.useState(false);
    const handleOpenDialog = () => {
        setOpenDialog(true);
      };
    
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    // dropdown menu 
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event : any) => {
        setAnchorEl(event.currentTarget);
    };

    /* istanbul ignore next */
    const handleClose = () => {
        setAnchorEl(null);
    };
    
    const open = Boolean(anchorEl);
    /* istanbul ignore next */
    const id = 2 ? 'simple-popover' : undefined;

    /* istanbul ignore next */
    const onClickSignOut = () : void => {
        localStorage.clear()
        history.go(0)
    }

  const drawer = (
    <div>   
        <Toolbar sx={{ backgroundColor: '#39d059' }}>
            <div className="logo-mpi">
                <a href="/dashboard">
                    <img 
                        alt="logo mpi dashboard" 
                        src={logo}
                    />
                </a>
            </div>
        </Toolbar>
        <Divider />

        <div className="sidebar-navbar">
            <NavLink exact to="/dashboard" activeClassName="active-link">
                <ul>
                    <li className="navbar-list">
                        <div className="icon"><HomeIcon/></div>
                        <span>Dashboard</span>
                    </li>
                </ul>
            </NavLink>
            {/* <Divider /> */}
            <Divider />
            <NavLink exact to="/dashboard/purchase-requests" activeClassName="active-link">
                <ul>
                    <li className="navbar-list">
                        <div className="icon"><ReorderIcon/></div>
                        <span>Purchase Requests</span>
                    </li>
                </ul>
            </NavLink>
            <Divider />
            <NavLink exact to="/dashboard/templates" activeClassName="active-link" >
                <ul>
                    <li className="navbar-list">
                        <div className="icon"><ListAltIcon/></div>
                        <span>Templates</span>   
                    </li>
                </ul>
            </NavLink>
            <Divider />
            <NavLink exact to="/dashboard/purchase-orders" activeClassName="active-link" >
                <ul>
                    <li className="navbar-list">
                        <div className="icon"><ViewListIcon/></div>
                        <span>Purchase Orders</span>
                    </li>
                </ul>
            </NavLink>
            <Divider />
            <NavLink exact to="/dashboard/finance" activeClassName="active-link">
                <ul>
                    <li className="navbar-list">
                        <div className="icon"><MonetizationOnIcon/></div>
                        <span>Finance</span>   
                    </li>
                </ul>
            </NavLink>
            <Divider />
            <NavLink exact to="/dashboard/message" activeClassName="active-link">
                <ul>
                    <li className="navbar-list">
                        <div className="icon"><ForumIcon/></div>
                        <span>Message</span>   
                    </li>
                </ul>
            </NavLink>
            <Divider />
            <NavLink exact to="/dashboard/buyer-list" activeClassName="active-link">
                <ul>
                    <li className="navbar-list">
                        <div className="icon"><ChromeReaderModeIcon/></div>
                        <span>Vendor list</span>   
                    </li>
                </ul>
            </NavLink>
            <Divider />
            <NavLink exact to="/dashboard/teams" activeClassName="active-link">
                <ul>
                    <li className="navbar-list">
                        <div className="icon"><GroupAddIcon/></div>
                        <span>Teams</span>
                    </li>
                </ul>
            </NavLink>
            <Divider />
            <NavLink exact to="/dashboard/custom-role" activeClassName="active-link">
                <ul>
                    <li className="navbar-list">
                        <div className="icon"><ReorderIcon/></div>
                        <span>Custom Role</span>
                    </li>
                </ul>
            </NavLink>
            <Divider />
            <NavLink exact to="/dashboard/profile" activeClassName="active-link">
                <ul>
                    <li className="navbar-list">
                        <div className="icon"><LocationCityIcon/></div>
                        <span>Profile Company</span>
                    </li>
                </ul>
            </NavLink>
            <Divider />
            <Divider />
            <NavLink exact to="/dashboard/account" activeClassName="active-link">
                <ul>
                    <li className="navbar-list">
                        <div className="icon"><AccountBoxIcon/></div>
                        <span>Account</span>
                    </li>
                </ul>
            </NavLink>

        </div>

        <div className="floating-button">
            <Box sx={{ '& > :not(style)': { m: 1 } }}>
                <Fab variant="extended" onClick={() => handleOpenDialog()}>
                    <NavigationIcon sx={{ mr: 1, color: '#39d059' }} />
                    Feedback
                </Fab>
            </Box>
        </div>

        <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Feedback</DialogTitle>
            <DialogContent>
            <DialogContentText>
                Give Feedback to us to make this platform much more better!
            </DialogContentText>
            <TextField
                autoFocus
                margin="normal"
                id="name"
                label="Enter your feedback"
                multiline
                rows={5}
                fullWidth
                variant="outlined"
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={handleCloseDialog} color="error">Cancel</Button>
            <Button onClick={handleCloseDialog} variant="contained">Submit</Button>
            </DialogActions>
        </Dialog>

    </div>
  );

    /* istanbul ignore next */
  const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    backgroundColor: '#39d059'
                }} 
            >
                <Toolbar>
                    <IconButton
                        data-testid="menuButton"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' }, color: '#000' }}
                    >
                        <MenuIcon />
                    </IconButton> 
                    <div style={{flexGrow: 1}} />
                    <Box>
                        <div 
                            className="right-navbar"  
                            data-testid="dropdownButton"
                            onClick={handleClick}
                        >
                            <Box> <AccountCircleIcon/>  </Box>
                            <Box pl={1}> {auth?.data?.fullname}</Box>
                            <Box pl={1}> <ArrowDropDownIcon/></Box>
                        </div>
                        {/* Dropdown Menu */}
                        <Popover
                            data-testid="dropdown"
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            className="popper-style"
                        >
                        <Box>
                            <div style={{ width: 150 }}>
                            <List component="nav" aria-label="secondary mailbox folders">
                                <ListItem 
                                    button 
                                    onClick={() => {
                                        /* istanbul ignore next */
                                        onClickSignOut()
                                    }}>
                                    <ListItemText className="btn-navlist" primary="Sign Out" />
                                </ListItem>
                            </List>
                            </div>
                        </Box>
                        </Popover>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    data-testid="drawer"
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
        </div>
    )
}

export default NavDashboard;
