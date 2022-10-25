import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import CharacterCard from '../components/CharacterCard';
import Masonry from '@mui/lab/Masonry';
import Container from '@mui/material/Container';
import LoadingButton from '@mui/lab/LoadingButton';
import { fetchCharacters } from '../redux/charactersSlice';
import Loading from '../components/Loading';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

function Home() {

    const characters = useSelector(state => state.characters.items)
    const status = useSelector(state => state.characters.status)
    const nextPage = useSelector(state => state.characters.page)
    const hasNextPage = useSelector(state => state.characters.hasNextPage)
    const dispatch = useDispatch();

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchCharacters());
        }
    }, [dispatch, status])

    return (
        <div>
            <h1>characters</h1>
            <Masonry columns={4} spacing={4} sx={{ alignContent: "center" }}>
                {characters.map((character) => (
                    <CharacterCard character={character} key={character.char_id} />
                ))}
            </Masonry>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 35 }}>
                <LoadingButton
                    loading={status === "loading" ? true : false}
                    variant="contained"
                    loadingPosition="end"
                    disabled={!hasNextPage}
                    endIcon={<KeyboardDoubleArrowDownIcon />}
                    onClick={() => dispatch(fetchCharacters(nextPage))}
                >
                    {hasNextPage ? "Load More" : "No More Left"}
                </LoadingButton>
            </div>

        </div>
    )
}

export default Home