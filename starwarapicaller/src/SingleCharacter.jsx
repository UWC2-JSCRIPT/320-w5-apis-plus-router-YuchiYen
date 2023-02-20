import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom';
// import { Route, Routes, Link, useLocation, useParams } from 'react-router-dom';

export default function SingleCharacter() {
    const [data, setData] = useState({});
  
    const { charId } = useParams();
    
    useEffect(() => {
        fetch(`https://swapi.dev/api/people/${charId}/`)
            .then(response => response.json())
            .then(
                (data) => {
                    setData(data);
                },
                (error) => {
                    console.log(error);
                })
  
    }, [])
  
    return (
        <>
            <h1>{data.name}</h1>
            <div>
                height: {data.height} <br />
                mass: {data.mass} <br />
                hair color: {data.hair_color} <br />
                skin color: {data.skin_color} <br />
                eye color: {data.eye_color} <br />
                birth year: {data.birth_year} <br />
                gender: {data.gender}
                etc.
            </div>
        </>

    )
  }