import { Box, makeStyles } from '@material-ui/core';
import { Chat } from '@material-ui/icons';
import { useContext, useState } from 'react';
import HeaderMenu from './HeaderMenu';
import Drawer from '../../drawer/InfoDrawer';
import TemplateProvider from '../../theme/TemplateProvider';

import { AccountContext } from '../../context/AccountProvider';


const useStyles = makeStyles({
    header: {
        height: 40,
        backgroundColor: '#ededed',
        padding: '15px 18px',
        display: 'flex',
        alighItems: 'center'
    },
    avatar: {
        height: 47,
        width: 47,
        borderRadius: '50%',
        cursor: 'pointer'
    },
    icons: {
        marginLeft: 'auto',
        '& > *': {
            marginLeft: '2px',
            padding: '8px'
        }
    }
})

const Header = () => {
    const classes = useStyles(false);

    const [open, setOpen] = useState(false);

    const toggleDrawer = () => {
        setOpen(true);

    }

    const { account } = useContext(AccountContext)

    return (
        <>
            <Box className={classes.header}>
                <img src={account.imageUrl} onClick={() => toggleDrawer()} alt="Display Picture" className={classes.avatar} />
                <Box className={classes.icons}>
                    <Chat />
                    <HeaderMenu />
                </Box>
            </Box>
            <Drawer open={open} setOpen={setOpen} />
        </>

    )
}

export default Header;