import './App.css';
import React, { useEffect, useState } from 'react'
import {  Link } from 'react-router-dom';
// import CharacterSingle from './SingleCharacter';

function AllCharacters() {
  const [profiles, setProfiles] = useState(undefined);
  const [loading, toggleLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [prevURL, setPrevURL] = useState('');
  const [nextURL, setNextURL] = useState('');

  const searchParams = new URLSearchParams(window.location.search);
  const pageParam = searchParams.get("page");
  const TargetURL = (pageParam > 0) ? `https://swapi.dev/api/people/?page=${pageParam}` : 'https://swapi.dev/api/people';

  useEffect(() => {
    fetch(TargetURL)
      .then(response => response.json())
      .then(
        (data) => {
          setProfiles(data);
          setPrevURL(data.previous);
          setNextURL(data.next);

          toggleLoading(false);

        },
        (error) => {
          console.log(error)
          toggleLoading(false);
          setHasError(true);
        })
  }, [TargetURL])

  if (loading) {
    return <p>loading...</p>
  }

  if (hasError) {
    return <p>Error!</p>
  }

  const handlePrevClick = () => {
    if (prevURL != null) {
      handleReloadClick(prevURL.split('=')[1]);
    }
  };

  const handleNextClick = () => {
    if (nextURL != null) {
      handleReloadClick(nextURL.split('=')[1]);
    }
  };

  const getId = (urlString) =>{
    //https://swapi.dev/api/people/1/
     return urlString.split('/')[5];
  }

  const handleReloadClick = (page) => {
    const searchParams = new URLSearchParams();
    searchParams.set("page", page);
    window.location.href = `${window.location.origin}${window.location.pathname}?${searchParams.toString()}`;
  };

  const characterLinks = profiles.results.map((c, index) => (
   

    <li key={getId(c.url)}><Link to={`characterDetail/${getId(c.url)}`}>{c.name}       
    </Link></li>    
  ))

  return (
    <>
      <h1>List of Star War characters</h1>
      <div>
        <ul>
          {characterLinks}        
        </ul>

      </div>
      <div className="button-container">
        <button className="prev-button" onClick={handlePrevClick}>
          Previous
        </button>
        <button className="next-button" onClick={handleNextClick}>
          Next
        </button>
      </div>
    </>
  )
}

export default AllCharacters;
