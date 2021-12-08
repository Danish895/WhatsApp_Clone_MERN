import { useEffect, useState } from "react";
import { useContext } from "react";

import { AccountContext, socket, setActiveUsers } from "../../context/AccountProvider.jsx";


import { getUsers } from "../../service/api.js";
import { Box, makeStyles } from '@material-ui/core';
import Conversation from "./Conversation.jsx";

const useStyles = makeStyles({
    component: {
        height: '81vh',
        overflow: 'overlay'
    }
})

const Conversations = ({ text }) => {
    const classes = useStyles();
    const [users, setUsers] = useState([]);
    const { account, socket, setActiveUsers} = useContext(AccountContext);

    useEffect(() => {
        const fetchdata = async () => {
            const data = await getUsers();
            const filteredData = data.filter(user => user.name.toLowerCase().includes(text.toLowerCase()))
            setUsers(filteredData);
        }
        fetchdata();
    }, [text])

    useEffect(() => {
        socket.current.emit('adduser', account.googleId);
        socket.current.on('getUsers', users => {
            setActiveUsers(users);

        })
    }, [account])

    return (
        <Box className={classes.component}>
            {
                users.map(user => (
                    user.googleId !== account.googleId &&
                    <Conversation user={user} />
                ))
            }
        </Box>
    )
}

export default Conversations;