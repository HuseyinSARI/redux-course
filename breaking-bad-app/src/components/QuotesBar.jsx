import React, { useState, useEffect } from 'react'
import { Button, styled, Collapse, IconButton } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelector, useDispatch } from "react-redux"
import {
    fetchQuotes,
    quotesSelector,
    quotesStatusSelector,
    quotesErrorSelector
} from "../redux/quotesSlice"

import { toast } from "react-toastify"
import Loading from './Loading';


function QuotesBar({ name }) {
    const dispatch = useDispatch();
    const quotes = useSelector(quotesSelector);
    const status = useSelector(quotesStatusSelector);
    const error = useSelector(quotesErrorSelector);

    const [quotesExpanded, setQuotesExpanded] = useState(true);

    if (error) {
        toast.error(`Quotes Error : ${error}`)
        console.log(error);
    }



    useEffect(() => {
        dispatch(fetchQuotes(name))
    }, [dispatch, name])

    if (status === "loading") return <Loading size={100} />

    return (
        <div className='mx-4 px-3 mb-2 pb-2 rounded-3xl bg-gradient-to-r from-sky-400 to-blue-500' >
            <div>
                <Button disabled={quotes?.length > 0 ? false : true} fullWidth onClick={() => setQuotesExpanded(!quotesExpanded)}>
                    <span className={`${quotes?.length > 0 ? "text-black" : "text-gray-600"} text-lg font-bold`}>{quotes?.length > 0 ? "Quotes" : "No Quote"} </span>
                    <ExpandMore
                        expand={quotesExpanded}  >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </Button>
            </div>

            <Collapse in={quotesExpanded} timeout="auto" unmountOnExit>
                {!quotes
                    ?
                    " "
                    :
                    quotes.map((quo, index) => <li className="pb-1" key={index}>{quo.quote}</li>)}
            </Collapse>
        </div>
    )
}

export default QuotesBar


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
