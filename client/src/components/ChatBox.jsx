import {Dialog, withStyles, Box, makeStyles} from '@material-ui/core';
import Menu from './menu/Menu';
import Chat from './chat/Chat';
import { useContext } from 'react';
import { UserContext } from '../context/UserProvider';
import  EmptyChat  from './chat/EmptyChat';

const useStyles = makeStyles({
    component:{
        display : 'flex'

    },
    leftComponent:{
        minWidth : 380

    },
    rightComponent:{
        borderLeft : `1px solid rgba(0,0,0,014)`,
        width : '80%'

    }
})
const style = {
    dialogPaper :{
        height : '95%',
        width : '91%',
        maxHeight : '100%',
        maxWidth : '100%'
        
    }
}

const ChatBox = ({classes}) => {

    const {person} = useContext(UserContext);
    const classname = useStyles();
    return (
        <Dialog
            open = {true}
            classes ={{paper : classes.dialogPaper}}
        >
            <Box className = {classname.component}>
                <Box className = {classname.leftComponent}>
                    <Menu/>
                </Box>
                <Box className = {classname.rightComponent}>
                    {
                        Object.keys(person).length ? <Chat/> : <EmptyChat/>
                    }
                </Box>
            </Box>
        </Dialog>
    )
}

export default withStyles(style) (ChatBox);