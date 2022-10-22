import { useState } from 'react'
import { Container, Grid, Stack, Button, Box, Paper, TextField, Dialog, Slide, DialogTitle, DialogContentText, DialogContent, DialogActions, IconButton, Icon } from "@mui/material"
import { useDispatch, useSelector } from 'react-redux'
import { addNote, notesSlice } from "../redux/notes/notesSlice"

import CheckIcon from '@mui/icons-material/Check';

function NotesMain({ close }) {
    const dispatch = useDispatch();
    const [note, setNote] = useState({
        title: "",
        content: ""
    })
    const [color, setColor] = useState("red");

    const handleAdd = () => {

        dispatch(addNote(
            {
                title: note.title,
                content: note.content
            }
        ))
        close();
    }

    return (
        <Grid >
            <Paper className='px-6 py-4 bg-cover' >
                <Stack spacing={1} className="bg-cover" >
                    <TextField
                        variant='standard'
                        error={false}
                        helperText={false && "Incorrect entry."}
                        name='title'
                        label="Title"
                        value={note.title}
                        onChange={(e) => setNote({ ...note, title: e.target.value })}
                    />
                    <TextField
                        variant='standard'
                        name='content'
                        label="Content"
                        multiline
                        minRows={5}
                        maxRows={8}
                        value={note.content}
                        onChange={(e) => setNote({ ...note, content: e.target.value })}
                    />
                </Stack>
                <Stack className="pt-3" >
                    <Grid container >
                        <Grid item xs={6}>
                            <IconButton variant="text" size="small" onClick={() => { setColor("red") }} >
                                {(color === "red") ? <CheckIcon className='rounded-full p-1 bg-red-500' /> : <Icon className='rounded-full p-1 bg-red-500' />}
                            </IconButton>
                            <IconButton variant="text" size="small" onClick={() => setColor("blue")}>
                                {(color === "blue")
                                    ?
                                    <CheckIcon className='rounded-full p-1 bg-blue-500' />
                                    :
                                    <Icon className='rounded-full p-1 bg-blue-500' />}
                            </IconButton>
                            <IconButton variant="text" size="small" onClick={() => setColor("yellow")}>
                                {(color === "yellow")
                                    ?
                                    <CheckIcon className='rounded-full p-1 bg-yellow-500' />
                                    :
                                    <Icon className='rounded-full p-1 bg-yellow-500' />}
                            </IconButton>
                            <IconButton variant="text" size="small" onClick={() => setColor("green")}>
                                {(color === "green")
                                    ?
                                    <CheckIcon className='rounded-full p-1 bg-green-500' />
                                    :
                                    <Icon className='rounded-full p-1 bg-green-500' />}
                            </IconButton>

                        </Grid>
                        <Grid container item xs={6} justifyContent="flex-end">
                            <Button variant='contained' onClick={handleAdd} >ADD</Button>
                        </Grid>
                    </Grid>

                </Stack>
            </Paper>
        </Grid>
    )
}

export default NotesMain

// sx={{backgroundImage:"url('https://i.pinimg.com/originals/bb/6c/91/bb6c9177860b8c41f84c9b56f5e6e93c.jpg')"}}