'use client'
import { useState, useEffect } from 'react';
import './MemesGallery.css'; // Import the CSS file for styling

function MemesGallery() {
  const [memes, setMemes] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://www.reddit.com/r/memes.json');
        const data = await res.json();

        if (data && data.data && data.data.children) {
          const memeData = data.data.children
            .filter((child) => child.data.post_hint === 'image')
            .map((child) => ({
              title: child.data.title,
              thumbnail: child.data.thumbnail,
              fullResolution: child.data.url_overridden_by_dest,
            }));
          setMemes(memeData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleImageHover = (index) => {
    setHoveredIndex(index);
  };

  const handleImageLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <div>
      <h1>Memes Gallery</h1>
      <div className="memes-container">
        {memes.map((meme, index) => (
          <div
            key={index}
            className={`meme-item ${hoveredIndex === index ? 'hovered' : ''}`}
            onMouseEnter={() => handleImageHover(index)}
            onMouseLeave={handleImageLeave}
          >
            <h4>{meme.title}</h4>
            <img src={meme.thumbnail} alt={meme.title} />
            {hoveredIndex === index && (
              <div className="full-resolution-overlay">
                <img src={meme.fullResolution} alt={meme.title} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MemesGallery;
