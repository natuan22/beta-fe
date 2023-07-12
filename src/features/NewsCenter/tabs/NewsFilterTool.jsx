import React, { useState } from 'react'
import ModalFilter from '../components/NewsFilterTool/ModalFilter';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const NewsFilterTool = () => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Bộ lọc tin tức
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
            </Button>
            <Dialog
                maxWidth='2000px'
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"

            >
                <DialogTitle>{"Bộ lọc tin tức"}</DialogTitle>
                <DialogContent  >
                    <ModalFilter />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Đóng</Button>
                    <Button onClick={handleClose}>Áp dụng bộ lọc</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default NewsFilterTool