import {Box} from '@material-ui/core';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../context/UserProvider';
import { AccountContext } from '../../context/AccountProvider';

import { getConversation } from '../../service/api';
import ChatMessages from "./ChatMessages";
import ChatHeader from "./ChatHeader";





const Chat = () => {

    const {person} = useContext(UserContext);
    const {account} = useContext(AccountContext);
    const [conversation, setConversation] = useState({});

    useEffect(() =>{
        const getConversationDetail = async() =>{
            let data = await getConversation({ sender: account.googleId, receiver : person.googleId});
            setConversation(data);
        }
        getConversationDetail();
    },[person.googleId])

        return (
            <Box>
            <ChatHeader/>
            <ChatMessages conversation = {conversation} person = {person}/>
            
            </Box>
        )

}

export default Chat;