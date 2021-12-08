


import { Box, InputBase, makeStyles } from '@material-ui/core';
import { EmojiEmotions } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  component: {
    background: '#ededed',
    height: '55px',
    display: 'flex',
    alignItems: 'center',
  },
  search: {
    position: 'relative',
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    margin: '0 13px',
    width: '100%'
  },
  emoji: {
    color: '#919191',
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer'
  },
  inputRoot: {
    width: '100%'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: 65,
    fontSize: 14,
    height: 35,
    width: '100%'
  }
}));

const ChatFooter = ({ sendText, value, setValue}) => {
  const classes = useStyles();

  return (
    <Box className={classes.component}>
      <Box className={classes.search}>
        <Box className={classes.emoji}>
          <EmojiEmotions fontSize="small" />
        </Box>
        <InputBase
          placeholder="Type a new message"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
          onKeyPress = {(e) => sendText(e)}
          onChange={(e) => setValue(e.target.value)}
          value= {value} 
        />
      </Box>
    </Box>
  )
}

export default ChatFooter;