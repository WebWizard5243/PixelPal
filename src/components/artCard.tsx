import React from 'react';
import"@/app/page.module.css";
import Image from "next/image"

interface ArtCardProps {
  id: number;
  image: string;
  title: string;
}


export default function ArtCard({ title , image, id } : ArtCardProps) {
  return (
    <div className="art-card">
      <a href = {`/art/${id}`}  ><Image src={image} alt={title} className="art-image" /></a>
    </div>
  );
}
