import { motion } from 'framer-motion';
import { useState } from 'react';
import type { ArtistProfile } from './artistsParser';

type ArtistCardProps = {
  artist: ArtistProfile;
  buttonLabel: string;
};

export const ArtistCard = ({ artist, buttonLabel }: ArtistCardProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.article
      className="artist-card"
      whileHover={{ y: -10, scale: 1.01 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      aria-labelledby={`artist-title-${artist.id}`}
    >
      <div className="artist-content artist-content--compact">
        <h3 id={`artist-title-${artist.id}`}>{artist.artistName}</h3>
        {expanded && <p>{artist.description}</p>}
      </div>

      {expanded && (
        <div className="artist-artwork" aria-hidden="true">
          <img
            src={artist.artworkUrl}
            alt={artist.artworkName}
            className="artist-artwork-image"
            loading="lazy"
          />
          <div className="artwork-overlay">
            <span>{artist.artworkName}</span>
          </div>
        </div>
      )}

      <motion.button
        type="button"
        className="artist-button"
        whileHover={{ y: -2, scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        aria-expanded={expanded}
        aria-label={expanded ? `Collapse details for ${artist.artistName}` : `Show details for ${artist.artistName}`}
        onClick={() => setExpanded((state) => !state)}
      >
        <span>{expanded ? 'Yopish' : buttonLabel}</span>
      </motion.button>
    </motion.article>
  );
};
