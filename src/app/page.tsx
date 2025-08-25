"use client"

import React, { useEffect, useState } from 'react';
import SearchBar from '../components/searchBar';
import ArtCard from '@/components/artCard';
import "./globals.css";
import FetchApi from '@/helper/fetchApi';
import"./page.module.css";
import { useSearchParams, useRouter } from 'next/navigation';
import InfiniteScroll from "react-infinite-scroll-component";
import { motion } from 'framer-motion';





export default function page() {

  const searchParams  = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("search");

  interface Image {
  id: number;
  webformatURL: string;
  tags: string;
}


  const [images, setImages] = useState<Image[]>([]);
  const [term, setTerm] = useState(query ? query : "");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);


const fetchImage = async () => {
  try {
     const response = await FetchApi(term, page); // pass page here!
    const data = response.hits;
    if (data.length === 0) {
      setHasMore(false); // stop when no more results
      return;
    }

    setImages((prev) => {
  const newOnes = data.filter((img: any) => !prev.some((p) => p.id === img.id));
  return [...prev, ...newOnes];
});
    setPage((p) => p + 1);
  } catch (error :  any) {
    console.log(error.message);
    setHasMore(false);
  }
   
  };


  useEffect(() => {
    if (query) {
      setTerm(query);
    }
  }, [query]);



   useEffect(() => {
    setImages([]);
    setPage(1);
    setHasMore(true);
    fetchImage();
  }, [term]);

useEffect(() => {
  if (term) {
    fetchImage();
  }
}, [page, term]);


  return (
    <div>
      <div> 
        <SearchBar value = {term} onSearch ={setTerm} />
      </div>
     <InfiniteScroll
     hasMore = {hasMore}
     dataLength={images.length}
     next={fetchImage}
     loader = {<p>loading more...</p>}
     endMessage = {<p style = {{textAlign : 'center'}} > No More Results</p>}
     >
      <motion.div
  className="masonry"
  initial="hidden"
  animate="show"
  variants={{
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08, // delay between cards
      },
    },
  }}
>
     {images.map((art) => (
      <motion.div 
      className='masonry-item' 
      key = {art.id}
      initial = {{opacity : 0, y : 30}}
      animate = {{opacity : 1, y: 0}}
      transition = {{duration : 0.4, ease : "easeOut"}}
      >
      <ArtCard id ={art.id} image = {art.webformatURL} title = {art.tags} />
      </motion.div>
     ))}
     </motion.div>
     </InfiniteScroll>
    </div>
  )
}
