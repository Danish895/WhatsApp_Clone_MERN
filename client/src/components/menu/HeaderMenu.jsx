import { MoreVert } from '@material-ui/icons';
import { useState, useContext } from 'react';
import {Menu, MenuItem, makeStyles} from '@material-ui/core';
import { GoogleLogout } from 'react-google-login';
import { clientId } from '../../constants/data';
import { AccountContext } from '../../context/AccountProvider';
import Drawer from '../../drawer/InfoDrawer'

const useStyles = makeStyles({
    menuItems :{

    }
})

const HeaderMenu = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false)
    const [openDrawer, setOpenDrawer] = useState(false)
    const { setAccount} = useContext(AccountContext);

    const handleClose = () => {
        setOpen(false);
    }

    const handleClick = (event) => {
        setOpen(event.currentTarget);
    }
    
    const onLogoutSuccess = () => {
        alert("You have been logged out successfully");
        console.clear();
        setAccount('');  
    }

    const toggleDrawer = () => {
        setOpenDrawer(true);

    }

    return (
        <>
            <MoreVert onClick= {handleClick} />
            <Menu
                id="basic-menu"
                anchorEl={open}
                open={open}
                onClose={handleClose}
              
                getContentAnchorEl = {null}
                anchorOrigin= {{
                    vertical : 'bottom',
                    horizontal : 'center'
                }}
              
            >
                <MenuItem className = {classes.menuItems} onClick = {() => {handleClose(); toggleDrawer()}} >Profile</MenuItem>
                <MenuItem className = {classes.menuItems} onClick = {handleClose}>

                <GoogleLogout
                clientId = {clientId}           
                onLogoutSuccess={onLogoutSuccess}
                />
                </MenuItem>
            </Menu>
            <Drawer open={openDrawer} setOpen={setOpenDrawer} />
        </>
    )
}

export default HeaderMenu;