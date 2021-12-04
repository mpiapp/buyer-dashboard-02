import * as React from 'react';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';

const MenuPopOver = ({
    name, color
}: any ) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
    <Button 
        aria-describedby={id} 
        variant="contained" 
        onClick={handleClick}
        color={color}
    >
        {name}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        className="menu-pop-over"
      >
       <div className="box-menu">
           <ul>
               <li>Template A</li>
               <li>Template B</li>
               <li>Template C</li>
           </ul>
       </div>
      </Popover>
    </div>
  );
}


export default MenuPopOver;