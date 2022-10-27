import React, { useState } from 'react'
import { useEffect } from 'react';
import { useParams } from "react-router-dom"
import axios from "axios";
import Loading from "../components/Loading"
import Button from '@mui/material/Button';
import QuotesBar from '../components/QuotesBar';
import SpoilerBar from '../components/SpoilerBar';
import UndoIcon from '@mui/icons-material/Undo';
import { useNavigate } from "react-router-dom"

function Detail() {
    const { char_id } = useParams();
    const [char, setChar] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios(`${process.env.REACT_APP_API_BASE_ENDPOINT}/characters/${char_id}`)
            .then((res) => res.data[0])
            .then((data) => setChar(data))
            .finally(() => setLoading(false))
    }, [char_id])


    if (loading) return <Loading className="ml-0 mr-auto" />

    return (
        <div className="relative rounded-3xl mt-3 pb-1 bg-gradient-to-r from-emerald-500 to-lime-600"  >
            <div className="flex">
                <div className="w-2/6]">
                    <img className='max-w-md p-5 rounded-3xl' alt={char.name} src={char.img}></img>
                </div>
                <div className='w-4/6 p-5 flex flex-col gap-y-2' >
                    <div >
                        <div className='font-bold text-lg'> Name </div>
                        <div className='pl-2'>{char.name}</div>
                    </div>
                    <div>
                        <div className='font-bold text-lg'> Birthday </div>
                        <div className='pl-2'>{char.birthday}</div>
                    </div>
                    <div>
                        <div className='font-bold text-lg'> Occupation </div>
                        <div className='pl-2'> {char.occupation.map((op, index) => (<div key={index}>{op}</div>))} </div>
                    </div>
                    <div>
                        <div className='font-bold text-lg'> Nickname </div>
                        <div className='pl-2'> {char.nickname}</div>
                    </div>
                    <div>
                        <div className='font-bold text-lg'> Portrayed </div>
                        <div className='pl-2'> {char.portrayed}</div>
                    </div>
                    <div>
                        <div className='font-bold text-lg'> Season played in </div>
                        <div className='pl-2'> {char.appearance.map((ap, index) => (<span key={index}> {ap} </span>))}</div>
                    </div>

                    <SpoilerBar char={char}  />

                </div>
            </div>

            <QuotesBar name={char.name} />

            <Button
                color='success'
                variant='contained'
                startIcon={<UndoIcon />}
                sx={{ position: "absolute", top: 15, right: 20 }}
                onClick={() => navigate(-1)}
            >
                Back
            </Button>
        </div >
    )
}

export default Detail