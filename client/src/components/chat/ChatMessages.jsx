import { Box, makeStyles } from '@material-ui/core';
import ChatFooter from "./ChatFooter";
import { useContext, useState, useRef } from 'react';
import { AccountContext, socket } from '../../context/AccountProvider';
import { newMessage } from '../../service/api';
import { useEffect } from 'react';
import { getMessages } from '../../service/api';
import Message from './Message';

const useStyles = makeStyles({
    wrapper: {
        backgroundImage: `url(${'https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png'})`,

    },
    component: {
        height: '80vh',
        overflowY : 'scroll'
    },
    container: {
        padding: '1px 80px'
    }

})

const ChatMessages = ({ person, conversation }) => {
    const classes = useStyles();

    const [value, setValue] = useState();
    const { account, socket , newMessageFlag, setnewMessageFlag} = useContext(AccountContext);
    const [messages, setMessages] = useState([]);
    const [incomingMessage, setIncomingMessage] = useState(null);

    const scrollRef = useRef();

    useEffect(() => {
        socket.current.on('getMessage', data => {
            setIncomingMessage({
                sender : data.senderId,
                text : data.text,
                createdAt : Date.now()
            })
        })
    }, [newMessageFlag])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({transition : 'smooth'})
    })

    useEffect(() => {
        incomingMessage && conversation?.members?.includes(incomingMessage.sender) && 
        setMessages(prev => [...prev, incomingMessage] )
    },[incomingMessage, conversation])


    useEffect(() => {
        const getMessageDetails = async () => {
            let response = await getMessages(conversation._id);
            setMessages(response.data)
        }
        getMessageDetails();

    }, [conversation?._id, person._id, newMessageFlag])


    const receiverId = conversation?.members?.find(member => member !== account.googleId);

    const sendText = async (e) => {
        let code = e.keycode || e.which
        if (!value) return;
        if (code === 13) {
            let message = {
                sender: account.googleId,
                conversationId: conversation._id,
                text: value
            }
            
            socket.current.emit('sendMessage', {
                senderId : account.googleId,
                receiverId,
                text : value
            })

            await newMessage(message);
            setValue('');
            setnewMessageFlag(prev => !prev);
        }
    }
    return (
        <Box className={classes.wrapper}>
            <Box className={classes.component}>
                {
                    messages && messages.map(message => (
                        <Box className={classes.container} ref = {scrollRef}>
                            <Message message={message} />
                        </Box>
                    )) 
                }
            </Box>
            <ChatFooter sendText={sendText} setValue={setValue} value={value} />
        </Box>
    )
}

export default ChatMessages;