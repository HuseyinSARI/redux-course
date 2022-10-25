import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import CharacterCard from '../components/CharacterCard';
import Masonry from '@mui/lab/Masonry';
import Container from '@mui/material/Container';




import { fetchCharacters } from '../redux/charactersSlice';
import Loading from '../components/Loading';
function Home() {

    const characters = useSelector(state => state.characters.items)
    const isLoading = useSelector(state => state.characters.isLoading)

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchCharacters());
    }, [dispatch])

    return (
        <div>
            <h1>characters</h1>

            <Container maxWidth="xl" >
                <Masonry columns={4} spacing={4} sx={{ alignContent: "center" }}>
                    {isLoading ? <Loading />
                        : characters.map((character) => (
                            <CharacterCard character={character} key={character.charID} />
                        ))
                    }
                </Masonry>
            </Container>
            
        </div>
    )
}

export default Home