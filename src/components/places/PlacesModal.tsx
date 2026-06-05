import { motion } from 'framer-motion';
import type { PlaceData } from './types';

type PlacesModalProps = {
  places: PlaceData[];
  selectedPlace: PlaceData | null;
  onSelectPlace: (place: PlaceData) => void;
  onClose: () => void;
};

export const PlacesModal = ({ places, selectedPlace, onSelectPlace, onClose }: PlacesModalProps) => {
  return (
    <motion.div
      className="places-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="places-modal-content"
        initial={{ y: 30, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 30, opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="places-modal-header">
          <h2 className="places-modal-title">Места в АРТ-Кластере</h2>
          <button className="places-modal-close" onClick={onClose} aria-label="Закрыть">
            ✕
          </button>
        </div>

        <motion.div
          className="places-modal-list"
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
              },
            },
          }}
        >
          {places.map((place, index) => (
            <motion.button
              key={place.id}
              className={`places-modal-item ${selectedPlace?.id === place.id ? 'active' : ''}`}
              onClick={() => onSelectPlace(place)}
              variants={{
                hidden: { opacity: 0, x: -20 },
                show: { opacity: 1, x: 0, transition: { duration: 0.3 } },
              }}
              whileHover={{ x: 8, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="places-modal-item-number">{String(index + 1).padStart(2, '0')}</span>
              <span className="places-modal-item-title">{place.title}</span>
              <motion.span
                className="places-modal-item-arrow"
                animate={{ x: selectedPlace?.id === place.id ? 6 : 0 }}
                transition={{ duration: 0.2 }}
              >
                →
              </motion.span>
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          className="places-modal-hint"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.4 }}
        >
          <p>Выберите раздел, чтобы узнать больше</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
