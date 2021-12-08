import {Dialog, withStyles, Box, Typography, makeStyles,List, ListItem } from '@material-ui/core'
import {GoogleLogin} from 'react-google-login'
import { useContext } from 'react'
import { AccountContext } from '../../context/AccountProvider';
import { clientId } from '../../constants/data';

import { addUser } from '../../service/api.js';

const useStyles = makeStyles({
    component : {
        display : 'flex'

    },
    leftComponent:{
        padding : '36px 0 36px 36px',
        marginTop : 55
    },
    qrCode :{
        marginTop : 55
    },
    title :{
        fontSize : 20,
        marginBottom : 25
    }
})

const style = {
    dialogPaper :{
        height : '100%',
        width : '100%'
        
    }
}

const Login = ({classes}) => {
    const classname = useStyles();
    const qrurl = 'https://www.ginifab.com/feeds/qr_code/img/qrcode.jpg';
    
    
    const { account, setAccount} = useContext(AccountContext);

    const onLoginSuccess = async(res) => {
        console.log('login successfull', res.profileObj);
        setAccount(res.profileObj);
        await addUser(res.profileObj)

    }

    const onLoginFailure = () => {
        console.log('login failed')
    }
    
    return (
        <Dialog
        open = {true}
        classes ={{paper : classes.dialogPaper}}
        BackdropProps = {{style: {backgroundColor : ' unset'}}}
        >
            <Box className = {classname.component}>
                <Box className = {classname.leftComponent}>
                    <Typography className = {classname.title}> "Don't sell your Data to Zuckerberg" - Danish</Typography>
                    <List>
                        <ListItem>1. Open WhatsApp</ListItem>
                        <ListItem>2. Tap on Google to register </ListItem>
                        <ListItem>3. Made primarily for Desktop </ListItem>
                    </List>
                </Box>
                <Box style = {{position : 'relative'}} className = {classname.qrCode}>
                    <img src = {qrurl} alt = 'QR' className = {classes.qrCode} />
                    <Box style = {{ position : 'absolute', left : '20%', bottom : '50%'}}>
                        <GoogleLogin
                        clientId = {clientId}
                        isSignedIn = {true}
                        onSuccess={onLoginSuccess}
                        onFailure={onLoginFailure}
                        cookiePolicy={'single_host_origin'}
                        />
                    </Box>
                </Box>
            </Box>
        </Dialog>
    )
}

export default withStyles(style)(Login);