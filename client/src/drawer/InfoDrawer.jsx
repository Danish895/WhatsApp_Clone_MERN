import { Drawer, Box, Typography, makeStyles } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';

import Profile from './Profile';

const useStyles = makeStyles({
  header: {
    background : '#00bfa5',
    height : 177,
    color : '#fff',
    display : 'flex',
    '&>*':{
      marginTop : 'auto',
      padding : 15,
      fontWeight : 600
    }    
  },
  component :{
    background : '#ededed',
    height : '80%'
  },
  arrow:{
    cursor: 'pointer'
  }
})

const InfoDrawer = ({ open, setOpen }) => {
  const classes = useStyles();


  const handleClose = () => {
    setOpen(false);
  }

  return (
    <Drawer
      open={open}
      onClose={handleClose}
    >
      <Box className = { classes.header}>
        <ArrowBack onClick = {() => handleClose()} className = {classes.arrow}/>
        <Typography> Profile </Typography>
      </Box>
      <Box className = {classes.component}>
        <Profile/>
      </Box>
    </Drawer>
  )
}

export default InfoDrawer;