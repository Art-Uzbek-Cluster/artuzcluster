import { useEffect, useState } from 'react';

export interface ArtistProfile {
  id: string;
  name: string;
  description: string;
  artworkName: string;
  portraitUrl?: string;
  artworkUrl?: string;
}

const infoModules = import.meta.glob('../../artists/*/info.txt', {
  as: 'raw',
  eager: true,
}) as Record<string, string>;

const assetModules = import.meta.glob('../../artists/*/*.{png,jpg,jpeg}', {
  as: 'url',
  eager: true,
}) as Record<string, string>;

const portraitFallback =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320"%3E%3Crect width="320" height="320" fill="%231b1f2c"/%3E%3Ctext x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="24" fill="%23d4af37"%3Eportrait%3C/text%3E%3C/svg%3E';

const artworkFallback =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 360"%3E%3Crect width="560" height="360" fill="%231b1f2c"/%3E%3Ctext x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="28" fill="%23d4af37"%3Eartwork%3C/text%3E%3C/svg%3E';

const parseInfo = (rawInfo: string | undefined, artistId: string) => {
  const safeText = rawInfo?.replace(/\r/g, '') ?? '';
  const lines = safeText
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  const fallback = {
    name: artistId.replace(/_/g, ' '),
    description: 'Description unavailable. The artist profile will be updated shortly.',
    artworkName: 'Featured artwork',
  };

  const values = { name: '', description: '', artworkName: '' };

  lines.forEach((line) => {
    const [label, ...rest] = line.split(':');
    const value = rest.join(':').trim();
    const key = label.trim().toLowerCase();

    if (!value) {
      return;
    }

    if (/^(name|имя|ism|artist)/.test(key)) {
      values.name = value;
    } else if (/^(description|описание|ta'rif|tavsif)/.test(key)) {
      values.description = value;
    } else if (/^(artwork|произведение|asar|ish)/.test(key)) {
      values.artworkName = value;
    }
  });

  return {
    name: values.name || lines[0] || fallback.name,
    description: values.description || lines[1] || fallback.description,
    artworkName: values.artworkName || lines[2] || fallback.artworkName,
  };
};

const getArtistId = (filePath: string) => {
  const parts = filePath.split('/');
  return parts[parts.length - 2] || 'unknown-artist';
};

const artistIds = new Set<string>();
Object.keys(infoModules).forEach((path) => artistIds.add(getArtistId(path)));
Object.keys(assetModules).forEach((path) => artistIds.add(getArtistId(path)));

const getImageUrl = (artistId: string, fileName: string) => {
  const assetPath = `../../artists/${artistId}/${fileName}`;
  return assetModules[assetPath] ?? undefined;
};

const buildArtistProfile = (artistId: string): ArtistProfile => {
  const rawInfo = infoModules[`../../artists/${artistId}/info.txt`];
  const parsed = parseInfo(rawInfo, artistId);

  return {
    id: artistId,
    name: parsed.name,
    description: parsed.description,
    artworkName: parsed.artworkName,
    portraitUrl: getImageUrl(artistId, 'avtoportret.png') ?? portraitFallback,
    artworkUrl: getImageUrl(artistId, 'mashhur_asar.png') ?? artworkFallback,
  };
};

export const artists = Array.from(artistIds).map(buildArtistProfile);

export const useArtists = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setLoading(false));
    return () => cancelAnimationFrame(frame);
  }, []);

  return { artists, loading };
};
