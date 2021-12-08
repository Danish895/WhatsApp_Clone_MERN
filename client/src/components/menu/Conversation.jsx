import { Box, Typography, makeStyles } from '@material-ui/core';
import { AccountContext } from '../../context/AccountProvider';
import { useContext, useEffect, useState } from 'react';
import { getConversation, setConversation } from '../../service/api';

import { UserContext } from '../../context/UserProvider';

const useStyles = makeStyles({
    displayPicture: {
        height: 50,
        width: 50,
        borderRadius: '50%',
        padding: '0 13px'

    },
    component: {
        display: 'flex',
        height: 40,
        padding: '13px 0',
        cursor: 'pointer'

    },
    container: {
        display: 'flex'
    },
    timestamp: {
        fontSize: 12,
        marginLeft: 'auto',
        color: '#00000099',
        marginRight: 20
    },
    text: {
        display: 'block',
        color: 'rgba(0, 0, 0, 0.6)',
        fontSize: 14
    }
})

const Conversation = ({ user }) => {
    const classes = useStyles();
    const URL = user.imageUrl;
    const {account, newMessageFlag } = useContext(AccountContext);
    const {setPerson} = useContext(UserContext);

    const[ message, setMessage] = useState({});
    
    useEffect(() => {
        const getConversationMessage = async() => {
            const data = await getConversation({ sender: account.googleId, receiver: user.googleId })
            setMessage({ text: data.message, timestamp: data.updatedAt });
        }
        getConversationMessage();
    }, [newMessageFlag]);

    const setUser = async() =>{
        setPerson(user);
        await setConversation({ senderId : account.googleId, receiverId : user.googleId})
    }
    const getTime = (time) => {
        return time < 10 ? '0' + time : time; 
    } 
    return (
        <Box className={classes.component} onClick = {() => setUser()}>
            <Box >
                <img src={URL} alt="dp" className={classes.displayPicture} />
            </Box>
            <Box style={{width: '100%'}}>
                <Box className={classes.container}>
                    <Typography>
                        {user.name}
                    </Typography>
                    { 
                        message.text && 
                        <Typography className={classes.timestamp}>
                            {getTime(new Date(message.timestamp).getHours())}:{getTime(new Date(message.timestamp).getMinutes())}
                        </Typography>        
                    }
                </Box>
                    <Box>
                        <Typography className={classes.text}>{message.text}</Typography>
                    </Box>
            </Box>
        </Box>
    )
}

export default Conversation;