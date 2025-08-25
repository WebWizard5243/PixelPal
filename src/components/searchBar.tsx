"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';

export default function SearchBar({value ,onSearch} : any) {
  const router = useRouter();
  const [search, setSearch] = useState(value || "");
  function onChange(e :any){
    setSearch(e.target.value);
  }

 async function handleSubmit(e  : any){
e.preventDefault();
onSearch(search);
  router.push(`/?search=${(search)}`);
 }

  return (
    <div className='search-container'>
      <h1 className='logo'>PixelPal</h1>
        <form onSubmit={handleSubmit}>
        <input className='searchBar' type="text" placeholder='search' onChange={onChange} value={search} />
        <button className='searchButton'type='submit' >🔍</button>
        </form>
    </div>
  )
}
