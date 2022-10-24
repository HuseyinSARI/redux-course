import { useState, useEffect, forwardRef } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Container, Grid, Button, TextField, Dialog, Slide, } from "@mui/material"
import NewNote from './NewNote';
import NoteCars from './NoteCars';
import { searchNotes } from "../redux/notes/notesSlice"
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="right" ref={ref} {...props} />;
});


function Main() {
    const items = useSelector((state) => state.notes.filteredItems)
    const baseItems = useSelector((state) => state.notes.items)
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const [keyword, setKeyword] = useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        dispatch(searchNotes(keyword));
    }, [keyword, dispatch, baseItems])

    return (
        <Container maxWidth="lg" sx={{
            minHeight: "100vh",
            backgroundRepeat: 'no-repeat',
            backgroundSize: "cover",
            backgroundImage: "url('https://images.unsplash.com/photo-1598063183638-4ffe7c5f0f8d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')"
        }} >
            <Grid container spacing={3} >
                <Grid sx={{marginTop:3}} item container justifyContent="center" alignItems="center">
                    <Grid item md={3} justifyContent="flex-end">
                        <Button  startIcon={<AddToPhotosIcon />} variant="contained" onClick={handleClickOpen}>
                            Add New Note
                        </Button>
                    </Grid>
                    <Grid item md={3} justifyContent="flex-start">
                        <TextField
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            placeholder="Search"
                            size='small'
                            className="rounded-md"
                            fullWidth
                            sx={{ padding:"6px"}}
                        />
                    </Grid>
                </Grid>
                <Grid item container xs={12}>
                    {items.map((item, index) => {
                        return (
                            <Grid key={index} item xs={6} md={4} lg={3}>
                                <NoteCars item={item} />
                            </Grid>
                        )
                    })}
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
                <NewNote close={handleClose} />
            </Dialog>
        </Container>
    )
}

export default Main