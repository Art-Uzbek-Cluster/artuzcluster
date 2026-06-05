import { motion } from 'framer-motion';
import type { ArtistProfile } from './artistsParser';

type ArtistCardProps = {
  artist: ArtistProfile;
  onDetailsClick: () => void;
};

export const ArtistCard = ({ artist, onDetailsClick }: ArtistCardProps) => {
  return (
    <motion.div
      className="artist-portrait-card"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <div className="artist-portrait-image-wrapper">
        <img
          src={artist.portraitUrl}
          alt={artist.artistName}
          className="artist-portrait-image"
          loading="lazy"
        />
        <div className="artist-portrait-overlay" />
      </div>
      
      <motion.button
        type="button"
        className="artist-portrait-button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onDetailsClick}
        aria-label={`View details for ${artist.artistName}`}
      >
        Batafsil
      </motion.button>

      <div className="artist-portrait-caption">
        <strong>{artist.artistName}</strong>
      </div>
    </motion.div>
  );
};
