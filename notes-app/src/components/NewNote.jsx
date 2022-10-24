import { useState } from 'react'
import {  Grid, Stack, Button, Paper, TextField,  IconButton, Icon } from "@mui/material"
import { useDispatch, useSelector } from 'react-redux'
import { addNote} from "../redux/notes/notesSlice"

import CheckIcon from '@mui/icons-material/Check';



function NewNote({ close }) {
    const dispatch = useDispatch();
    const colors = useSelector((state) => state.notes.colors)
    const [note, setNote] = useState({ title: "", content: "" })
    const [color, setColor] = useState(colors[0]);

    const [titleError, setTitleError] = useState(false);
    const [contentError, setContentError] = useState(false);


    const handleAdd = () => {

        if (note.title.length <= 0) return setTitleError(true);
        if (note.content.length <= 0) return setContentError(true);

        dispatch(addNote({
            title: note.title,
            content: note.content,
            color: color
        }))

        setNote({ title: "", content: "" })
        setTitleError(false);
        setContentError(false);

        close();
    }



    return (
        <Grid >
            <Paper className='px-6 py-4 bg-cover' sx={{backgroundImage:"url('https://images.unsplash.com/photo-1615980251529-f31d82558bf1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')"}} >
                <Stack spacing={1} className="bg-cover" >
                    <TextField
                        variant='standard'
                        error={titleError}
                        helperText={titleError && "Title is required"}
                        name='title'
                        label="Title"
                        value={note.title}
                        onChange={(e) => setNote({ ...note, title: e.target.value })}
                    />
                    <TextField
                        variant='standard'
                        error={contentError}
                        helperText={contentError && "Incorrect entry."}
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
                        <Grid item xs={8}>
                            {colors.map((rxColor,index) => {
                                return (
                                    <IconButton key={index} variant="text" size="small" onClick={() => setColor(rxColor)}>
                                        {(color === rxColor) ?
                                            <CheckIcon className='rounded-full p-1' sx={{ backgroundColor: rxColor }} />
                                            : <Icon className='rounded-full p-1' sx={{ backgroundColor: rxColor }} />}
                                    </IconButton>
                                )
                            })}
                        </Grid>
                        <Grid container item xs={4} justifyContent="flex-end">
                            <Button variant='contained' onClick={handleAdd} >ADD</Button>
                        </Grid>
                    </Grid>

                </Stack>
            </Paper>
        </Grid>
    )
}

export default NewNote

// sx={{backgroundImage:"url('https://i.pinimg.com/originals/bb/6c/91/bb6c9177860b8c41f84c9b56f5e6e93c.jpg')"}}