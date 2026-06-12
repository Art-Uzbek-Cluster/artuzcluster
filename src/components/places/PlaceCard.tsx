import { motion } from 'framer-motion';
import { useLocale } from '../../i18n';
import type { PlaceData } from './types';

type PlaceCardProps = {
  place: PlaceData;
  onClose: () => void;
};

export const PlaceCard = ({ place, onClose }: PlaceCardProps) => {
  const { t, locale } = useLocale();

  return (
    <motion.div
      className="place-card-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.article
        className="place-card-content"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="place-card-close" onClick={onClose} aria-label={t.home.places.close}>
          ✕
        </button>

        <div className="place-card-image-container">
          <motion.img
            src={place.imageUrl}
            alt={place.title[locale]}
            className="place-card-image"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <div className="place-card-body">
          <motion.h2
            className="place-card-title"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            {place.title[locale]}
          </motion.h2>

          <motion.div
            className="place-card-section"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <h3 className="place-card-label">{t.home.places.card.description}</h3>
            <p className="place-card-text">{place.description[locale]}</p>
          </motion.div>

          <motion.div
            className="place-card-section"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <h3 className="place-card-label">{t.home.places.card.example}</h3>
            <p className="place-card-text place-card-example">{place.example[locale]}</p>
          </motion.div>

          <motion.div
            className="place-card-section"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <h3 className="place-card-label">{t.home.places.card.result}</h3>
            <p className="place-card-text place-card-result">{place.result[locale]}</p>
          </motion.div>

          <motion.button
            className="place-card-action-btn"
            onClick={onClose}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            {t.home.places.card.backButton}
          </motion.button>
        </div>
      </motion.article>
    </motion.div>
  );
};
