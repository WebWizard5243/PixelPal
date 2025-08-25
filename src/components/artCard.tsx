import React from 'react';
import"@/app/page.module.css";

interface ArtCardProps {
  id: number;
  image: string;
  title: string;
}


export default function ArtCard({ title , image, id } : ArtCardProps) {
  return (
    <div className="art-card">
      <a href = {`/art/${id}`}  ><img src={image} alt={title} className="art-image" /></a>
    </div>
  );
}
