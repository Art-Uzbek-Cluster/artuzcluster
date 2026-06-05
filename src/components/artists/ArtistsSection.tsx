import { motion } from 'framer-motion';
import { useState } from 'react';
import { useLocale } from '../../i18n';
import { ArtistCard } from './ArtistCard';
import { ArtistModal } from './ArtistModal';
import { useArtists } from './artistsParser';
import type { ArtistProfile } from './artistsParser';

const artModules = import.meta.glob('../../../arts/*.{png,jpg,jpeg}', {
  query: '?url',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const artImages = Object.entries(artModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([_, url]) => url);

const containerVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export const ArtistsSection = () => {
  const { t } = useLocale();
  const { artists } = useArtists();
  const [selectedArtist, setSelectedArtist] = useState<ArtistProfile | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleArtistDetailsClick = (artist: ArtistProfile) => {
    setSelectedArtist(artist);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedArtist(null), 300);
  };

  return (
    <section className="section artists-section" id="hamjamiyat">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">{t.home.famousArtists?.eyebrow}</span>
          <h2>{t.home.famousArtists?.title}</h2>
        </div>

        {/* Art works mosaic */}
        <motion.div className="artists-mosaic" initial="hidden" animate="show" variants={containerVariants}>
          {artImages.map((url, index) => (
            <motion.div key={url} className={`mosaic-tile tile-${index + 1}`} variants={itemVariants}>
              <img src={url} alt={`Featured art ${index + 1}`} loading="lazy" />
            </motion.div>
          ))}
        </motion.div>

        {/* Artist portraits with details buttons */}
        {artists.length > 0 && (
          <motion.div
            className="artists-portrait-grid"
            initial="hidden"
            animate="show"
            variants={containerVariants}
          >
            {artists.map((artist) => (
              <motion.div key={artist.id} variants={itemVariants}>
                <ArtistCard
                  artist={artist}
                  onDetailsClick={() => handleArtistDetailsClick(artist)}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Modal for artist details */}
      <ArtistModal
        artist={selectedArtist}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />
    </section>
  );
};
