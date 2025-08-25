"use client"
import SearchBar from '@/components/searchBar'
import React, { use, useEffect, useState} from 'react'
import axios from 'axios';
import FetchApi from '@/helper/fetchApi';
import ArtCard from '@/components/artCard';
import "@/app/styles/artPage.css";

export default function Page({params}: any) {


  interface Image {
  id: number;
  webformatURL: string;
  tags: string;
  }

  const unwrapParams : any = use(params);
    const [term, setTerm] = useState("");
    const [mainImages, setMainImages] = useState<Image[]>([]);
    const [image, setImages] = useState<Image[]>([]);
    const [suggestion, setSuggestion] = useState("");

    


    useEffect(() => {
  async function loadDetails() {
    const response = await axios.post("/api/art", { id: unwrapParams.id });
    setMainImages(response.data.hits);
    setSuggestion(response.data.hits[0].tags);
     console.log(response.data.hits[0].tags); // Update tags AFTER fetching
  }
  loadDetails();
}, [unwrapParams.id]);

// EFFECT TO FETCH SUGGESTIONS BASED ON TAGS
useEffect(() => {
  if (!suggestion) return; // Don't fetch if tags are not set
  const tagsArray = suggestion.split(",").map(tag => tag.trim());
  const mainTag = tagsArray[0];

  FetchApi(mainTag).then(data => setImages(data.hits));
}, [suggestion]); // Only run when suggestion changes



  return (
    <div>
         <SearchBar value = {term} onSearch ={setTerm} />
         <div className='art-container'>
       {mainImages.map((img) => (
        <div className='left-side'key={img.id}>
    <img  src={img.webformatURL} alt={img.tags} />
    <h3></h3>
    </div>
  ))}
  <div className='right-side' >
  {image.map((img) => (
    
      <ArtCard key = {img.id}  id ={img.id}  image = {img.webformatURL} title = {img.tags}></ArtCard>

  ))}
    </div>
  </div>
    </div>
  )
}
