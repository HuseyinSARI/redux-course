import React, { useState, useEffect } from 'react'
import { Button, styled, Collapse, IconButton } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { useSelector, useDispatch } from "react-redux"
import {
    fetchDeaths,
    deathsSelector,
    deathsStatusSelector,
    deathsErrorSelector
} from "../redux/deathsSlice"

import { toast } from "react-toastify"
import Loading from './Loading';

function SpoilerBar({ char }) {

    const dispatch = useDispatch();
    const death = useSelector(deathsSelector);
    const status = useSelector(deathsStatusSelector);
    const error = useSelector(deathsErrorSelector);
    const [spoilerExpanded, setSpoilerExpanded] = useState(false);

    useEffect(() => {
        dispatch(fetchDeaths(char.name))
    }, [dispatch, char.name])

    if (error) {
        toast.error(`Spoiler Error : ${error}`)
        console.log(error);
    }

    if (status === "loading") return <Loading size={80} />

    return (
        <div className='rounded-3xl bg-gradient-to-r from-red-200 to-red-600'  >
            <div className='w-full'>
                <Button fullWidth onClick={() => setSpoilerExpanded(!spoilerExpanded)}>
                    <span className='text-black text-lg font-bold'>Spoiler</span>
                    <ExpandMore
                        expand={spoilerExpanded}  >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </Button>

            </div>
            <Collapse className=' p-2' in={spoilerExpanded} timeout="auto" unmountOnExit>
                <div>
                    <div className='font-bold text-lg'> Last Known State </div>
                    <div className='pl-2'> {char.status}</div>
                </div>
                {!death ? "  " :
                    <>
                        <div>
                            <div className='font-bold text-lg'> Cause of Dead</div>
                            <div className='pl-2'> {death.cause}</div>
                        </div>
                        <div>
                            <div className='font-bold text-lg'> Responsible for Death </div>
                            <div className='pl-2'> {death.responsible}</div>
                        </div>
                        <div>
                            <div className='font-bold text-lg'> Episode of dead </div>
                            <div className='pl-2'>Season : {death.season} Episode : {death.episode}</div>
                        </div>
                        <div>
                            <div className='font-bold text-lg'> Last Words </div>
                            <div className='pl-2'> {death.last_words}</div>
                        </div>
                    </>
                }
            </Collapse>
        </div>
    )
}

export default SpoilerBar


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));
