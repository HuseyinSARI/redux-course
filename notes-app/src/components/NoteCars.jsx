import { Stack, IconButton, Typography, } from "@mui/material"

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDispatch} from "react-redux"
import { deleteNote } from "../redux/notes/notesSlice"

function NoteCars({ item }) {

    const dispatch = useDispatch();

    const handleDelete = (id) => {
        dispatch(deleteNote(id));
    }

    return (
        <Stack spacing={2} className={`relative flex justify-start flex-col p-3 m-2 rounded-xl `} sx={{ backgroundColor: item.color }}>
            <IconButton onClick={() => handleDelete(item.id)} size="small" sx={{ position: "absolute" }} className=' right-1 top-1 rounded-full '>
                <DeleteForeverIcon />
            </IconButton>
            <Typography variant="h6">{item.title} </Typography>
            <Typography variant="body1">{item.content} </Typography>
        </Stack>
    )
}

export default NoteCars