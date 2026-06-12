import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useLocale } from '../../i18n';
import { PlacesModal } from './PlacesModal';
import { PlaceCard } from './PlaceCard';
import { PLACES_DATA } from './types';
import type { PlaceData } from './types';

export const PlacesSection = () => {
  const { t } = useLocale();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<PlaceData | null>(null);

  const handleSelectPlace = (place: PlaceData) => {
    setSelectedPlace(place);
  };

  const handleOpenPlacesModal = () => {
    setSelectedPlace(PLACES_DATA[0]);
    setIsModalOpen(true);
  };

  const handlePreviewClick = (place: PlaceData) => {
    setSelectedPlace(place);
    setIsModalOpen(false);
  };

  const handleCloseCard = () => {
    setSelectedPlace(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPlace(null);
  };

  return (
    <section className="section places-section" id="joylar">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <span className="eyebrow">{t.home.places.eyebrow}</span>
          <h2>{t.home.places.title}</h2>
          <p>{t.home.places.subtitle}</p>
        </motion.div>

        <motion.div
          className="places-grid"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {PLACES_DATA.map((place, index) => (
            <motion.div
              key={place.id}
              className="places-preview-card"
              role="button"
              tabIndex={0}
              onClick={() => handlePreviewClick(place)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  handlePreviewClick(place);
                }
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <div className="places-preview-image">
                <img src={place.imageUrl} alt={place.title} loading="lazy" />
                <div className="places-preview-overlay" />
              </div>
              <div className="places-preview-info">
                <h3>{place.title}</h3>
                <p>{place.description.substring(0, 80)}...</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="places-action"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.button
            className="places-details-btn"
            onClick={handleOpenPlacesModal}
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(124, 58, 237, 0.3)' }}
            whileTap={{ scale: 0.95 }}
          >
            <span>{t.home.places.button}</span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{ display: 'inline-block', marginLeft: '8px' }}
            >
              →
            </motion.span>
          </motion.button>
        </motion.div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <PlacesModal
            places={PLACES_DATA}
            selectedPlace={selectedPlace}
            onSelectPlace={(place) => {
              handleSelectPlace(place);
              setIsModalOpen(false);
            }}
            onClose={handleCloseModal}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedPlace && (
          <PlaceCard
            place={selectedPlace}
            onClose={handleCloseCard}
          />
        )}
      </AnimatePresence>
    </section>
  );
};
