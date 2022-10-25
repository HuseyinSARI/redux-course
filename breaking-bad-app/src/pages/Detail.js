import React,{useState} from 'react'
import { useEffect } from 'react';
import {useParams} from "react-router-dom"


function Detail() {

    const [char, setChar] = useState(null)
    const {char_id} = useParams();

    useEffect(()=>{
        
    },[])

  return (
    <div>Detail {char_id}</div>
  )
}

export default Detail