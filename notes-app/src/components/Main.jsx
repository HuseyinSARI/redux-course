import React from 'react'

import { Container, Grid, Stack, Button, Box, Paper, TextField, Dialog, Slide, DialogTitle, DialogContentText, DialogContent, DialogActions } from "@mui/material"
import NotesMain from './NotesMain';
import { useSelector } from "react-redux";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


function Main() {
    const items = useSelector((state) => state.notes.items)
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Container maxWidth="lg" sx={{ height: "100vh" }}>            
            <Grid container>
                <Grid item container>
                    {items.map((item) => {
                        return (
                            <Grid key={item.id} item xs={3}>
                                {item.title} <br />
                                {item.content}
                            </Grid>
                        )
                    })}
                </Grid>
                <Grid position="fixed" bottom={50} right={0} left={0} >
                    <Button variant="contained" onClick={handleClickOpen}>
                        Add New Note
                    </Button>
                </Grid>
            </Grid>

            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                maxWidth="xs"
                fullWidth
            >
                <NotesMain close={handleClose} />
            </Dialog>
        </Container>
    )
}

export default Main