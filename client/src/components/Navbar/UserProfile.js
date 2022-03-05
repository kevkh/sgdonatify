import useStyles from "./styles";
import * as React from 'react';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import {  Link, useHistory, useLocation } from "react-router-dom";
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ButtonGroup from '@mui/material/ButtonGroup';
const UserProfile = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
  
    const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen);
    };
  
    const handleClose = (event) => {
      if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
      }
  
      setOpen(false);
    };
  
    function handleListKeyDown(event) {
      if (event.key === 'Tab') {
        event.preventDefault();
        setOpen(false);
      } else if (event.key === 'Escape') {
        setOpen(false);
      }
    }

    return(
        <Stack direction="row" spacing={2}>
                <ButtonGroup disableElevation variant="contained">
                  <Button 
                    variant="contained"
                    color = "primary"
                    className={classes.profileButton}>
                    SIGNUP
                  </Button>
                  <Button
                  ref={anchorRef}
                  id="composition-button"
                  aria-controls={open ? 'composition-menu' : undefined}
                  aria-expanded={open ? 'true' : undefined}
                  aria-haspopup="true"
                  onClick={handleToggle}
                  variant="outlined"
                  color = "primary"
                  className={classes.profileButton}
                  endIcon={<KeyboardArrowDownIcon />}>
                  LOGIN
                  </Button>
                </ButtonGroup>
                <Popper open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-start"
                transition>
                {({ TransitionProps, placement }) => (
                <Grow
                    {...TransitionProps}
                    style={{
                    transformOrigin:
                        placement === 'bottom-start' ? 'left top' : 'left bottom',
                    }}
                >
                        <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                            <MenuList
                            autoFocusItem={open}
                            id="composition-menu"
                            aria-labelledby="composition-button"
                            onKeyDown={handleListKeyDown}
                            >
                            <MenuItem component={Link} to ="/donor">Donor Login</MenuItem>
                            <MenuItem component={Link} to ="/donatee">Donatee Login</MenuItem>
                            </MenuList>
                        </ClickAwayListener>
                        </Paper>
                    </Grow>
                    )}
                </Popper>
           
        </Stack>
    );
}

export default UserProfile;