import React, {useContext} from 'react';
import { AppBar, Toolbar, makeStyles, Box} from '@material-ui/core'
import { AccountContext } from '../context/AccountProvider';

import Login from './account/Login';

import ChatBox from './ChatBox';

const useStyles = makeStyles({
    header:{
        height : 200,
        background : '#128c7e',
        boxShadow : 'none'

    },
    loginHeader:{
        height : 200,
        background : '#00bfa5',
        boxShadow : 'none'
    }
})


const Messenger = () =>{
    const classes = useStyles();
    const {account} = useContext(AccountContext);
    return (
        <Box>
        <AppBar className = {account ? classes.header: classes.loginHeader}>
            <Toolbar>

            </Toolbar>
        </AppBar>
        { account ? <ChatBox/> : <Login/>}
        </Box>
    )
}

export default Messenger;