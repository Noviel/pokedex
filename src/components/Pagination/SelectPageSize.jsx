import React from 'react';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Tooltip from '@material-ui/core/Tooltip';

import { useStore } from '../StoreContext';

const SelectPageSize = () => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const store = useStore();
  const options = store.pagination.sizes;
  const selectedIndex = store.pagination.sizeIndex;

  function handleMenuItemClick(event, index) {
    setOpen(false);
    store.setPageSize(index);
  }

  function handleToggle() {
    setOpen(prevOpen => !prevOpen);
  }

  function handleClose(event) {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  }

  return (
    <>
      <ButtonGroup
        variant="contained"
        color="primary"
        ref={anchorRef}
        aria-label="Split button"
      >
        <Tooltip title="Pokemons per page">
          <Button>{options[selectedIndex]}</Button>
        </Tooltip>
        <Tooltip title="Select pokemons per page count">
        <Button
          color="primary"
          variant="contained"
          size="small"
          aria-owns={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
        </Tooltip>
      </ButtonGroup>
      <Popper open={open} anchorEl={anchorRef.current} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper id="menu-list-grow">
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      selected={index === selectedIndex}
                      onClick={event => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

SelectPageSize.propTypes = {};

export { SelectPageSize };
