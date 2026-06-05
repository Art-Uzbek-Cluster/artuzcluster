import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ArtistProfile } from './artistsParser';

type ArtistModalProps = {
  artist: ArtistProfile | null;
  isOpen: boolean;
  onClose: () => void;
};

export const ArtistModal = ({ artist, isOpen, onClose }: ArtistModalProps) => {
  const [selectedWork, setSelectedWork] = useState<number>(0);

  if (!artist) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="artist-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            role="presentation"
          />
          <motion.div
            className="artist-modal"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="artist-modal-title"
          >
            <button
              type="button"
              className="artist-modal-close"
              onClick={onClose}
              aria-label="Close modal"
            >
              ×
            </button>

            <div className="artist-modal-content">
              {/* Header with portrait */}
              <div className="artist-modal-header">
                <img
                  src={artist.portraitUrl}
                  alt={artist.artistName}
                  className="artist-modal-portrait"
                />
                <div className="artist-modal-info">
                  <h2 id="artist-modal-title">{artist.artistName}</h2>
                  <p className="artist-modal-description">{artist.description}</p>
                </div>
              </div>

              {/* Works gallery */}
              {artist.works.length > 0 && (
                <div className="artist-modal-gallery">
                  <h3>Asarlar</h3>
                  <div className="artist-modal-featured-work">
                    <img
                      src={artist.works[selectedWork].url}
                      alt={artist.works[selectedWork].name}
                      className="artist-modal-work-image"
                    />
                  </div>

                  <div className="artist-modal-thumbnails">
                    {artist.works.map((work, index) => (
                      <button
                        key={`${work.name}-${index}`}
                        type="button"
                        className={`artist-modal-thumbnail ${
                          selectedWork === index ? 'active' : ''
                        }`}
                        onClick={() => setSelectedWork(index)}
                        aria-label={`View ${work.name}`}
                        aria-pressed={selectedWork === index}
                      >
                        <img src={work.url} alt={work.name} />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
