"use client"
import { useState } from 'react'
import main from './../../data-fetch-script'
 
export default function Home() {
 const [searchText, setSearchText] = useState("");

  const fetchDatas = async() => {
    const resultArray = main(searchText);
    console.log(resultArray);
  }

  return (
    <>
      <h1>Book stock search</h1>
      <h2>Search Book stock</h2>
      <div>
        <input 
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          placeholder='Input the book name you want to'
          />
      </div>
      <button onClick={fetchDatas}>
        <img 
          width={16}
          height={16}
          decoding='async'
        />
      </button>
    </>
  );
}
