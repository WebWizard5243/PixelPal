import React from 'react';
import"@/app/page.module.css";
import Image from "next/image"

interface ArtCardProps {
  id: number;
  image: string;
  title: string;
  width : number;
  height : number;
}


export default function ArtCard({ title , image, id, width, height } : ArtCardProps) {
  return (
    <div className="art-card">
      <a href = {`/art/${id}`}  ><Image src={image} width={width} height={height} alt={title} unoptimized priority className="art-image" /></a>
    </div>
  );
}
