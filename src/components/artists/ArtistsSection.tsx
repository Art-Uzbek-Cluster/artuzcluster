import { motion } from 'framer-motion';
import { useLocale } from '../../i18n';
import { ArtistCard } from './ArtistCard';
import { useArtists } from './artistsParser';

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

const skeletonCount = 3;

export const ArtistsSection = () => {
  const { t } = useLocale();
  const { artists, loading } = useArtists();

  return (
    <section className="section artists-section" id="mashhur-artists">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">{t.home.famousArtists?.eyebrow}</span>
          <h2>{t.home.famousArtists?.title}</h2>
        </div>

        <motion.div className="artists-mosaic" initial="hidden" animate="show" variants={containerVariants}>
          {artImages.map((url, index) => (
            <motion.div key={url} className={`mosaic-tile tile-${index + 1}`} variants={itemVariants}>
              <img src={url} alt={`Featured art ${index + 1}`} loading="lazy" />
            </motion.div>
          ))}
        </motion.div>

        {!loading && artists.length > 0 && (
          <motion.div className="portrait-mosaic" initial="hidden" animate="show" variants={containerVariants}>
            {artists.map((artist, index) => (
              <motion.div key={artist.id} className="portrait-tile" variants={itemVariants}>
                <img src={artist.portraitUrl} alt={`Portrait of ${artist.artistName}`} loading="lazy" />
                <div className="portrait-caption">
                  <strong>{artist.artistName}</strong>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div
          className="artists-grid"
          variants={containerVariants}
          initial="hidden"
          animate="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {loading
            ? Array.from({ length: skeletonCount }).map((_, index) => (
                <motion.article
                  key={`skeleton-${index}`}
                  className="artist-skeleton"
                  variants={itemVariants}
                >
                  <div className="skeleton-block skeleton-circle" />
                  <div className="skeleton-block skeleton-line" />
                  <div className="skeleton-block skeleton-line short" />
                  <div className="skeleton-block skeleton-image" />
                  <div className="skeleton-block skeleton-line" />
                  <div className="skeleton-block skeleton-line short" />
                </motion.article>
              ))
            : artists.map((artist) => (
                <motion.div key={artist.id} variants={itemVariants}>
                  <ArtistCard artist={artist} buttonLabel={t.home.famousArtists?.detailsBtn ?? 'Batafsil'} />
                </motion.div>
              ))}
        </motion.div>
      </div>
    </section>
  );
};
