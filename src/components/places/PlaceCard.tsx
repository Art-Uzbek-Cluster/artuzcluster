import { motion } from 'framer-motion';
import type { PlaceData } from './types';

type PlaceCardProps = {
  place: PlaceData;
  onClose: () => void;
};

export const PlaceCard = ({ place, onClose }: PlaceCardProps) => {
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
        <button className="place-card-close" onClick={onClose} aria-label="Закрыть">
          ✕
        </button>

        <div className="place-card-image-container">
          <motion.img
            src={place.imageUrl}
            alt={place.title}
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
            {place.title}
          </motion.h2>

          <motion.div
            className="place-card-section"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <h3 className="place-card-label">Описание</h3>
            <p className="place-card-text">{place.description}</p>
          </motion.div>

          <motion.div
            className="place-card-section"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <h3 className="place-card-label">Пример из Узбекистана</h3>
            <p className="place-card-text place-card-example">{place.example}</p>
          </motion.div>

          <motion.div
            className="place-card-section"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <h3 className="place-card-label">Значение и результат</h3>
            <p className="place-card-text place-card-result">{place.result}</p>
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
            Вернуться к списку
          </motion.button>
        </div>
      </motion.article>
    </motion.div>
  );
};
