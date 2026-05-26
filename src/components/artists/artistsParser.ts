import { useEffect, useState } from 'react';

export interface ArtistProfile {
  id: string;
  artistName: string;
  artworkName: string;
  description: string;
  portraitUrl: string;
  artworkUrl: string;
}

const infoModules = import.meta.glob('../../../images/*/info.txt', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const assetModules = import.meta.glob('../../../images/*/*.{png,jpg,jpeg}', {
  query: '?url',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const portraitFallback =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320"%3E%3Crect width="320" height="320" fill="%2312141d"/%3E%3Ctext x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="24" fill="%23d4af37"%3Epic%3C/text%3E%3C/svg%3E';

const artworkFallback =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 360"%3E%3Crect width="560" height="360" fill="%2312141d"/%3E%3Ctext x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="28" fill="%23d4af37"%3Eartwork%3C/text%3E%3C/svg%3E';

const getArtistId = (filePath: string) => {
  const parts = filePath.split('/');
  return parts[parts.length - 2] || 'unknown-artist';
};

const parseInfo = (rawInfo: string | undefined, artistId: string) => {
  const safeText = rawInfo?.replace(/\r/g, '') ?? '';
  const lines = safeText
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  const fallback = {
    artistName: artistId.replace(/_/g, ' '),
    artworkName: 'Featured artwork',
    description: 'Description unavailable. Artist details will be updated soon.',
  };

  if (!lines.length) {
    return fallback;
  }

  const artistName = lines[0] || fallback.artistName;
  const artworkLine = lines.find((line) => /^(mashhur asari|artwork name|asar|ish|artwork|proizvedenie|произведение)\s*:/i.test(line));
  const artworkName = artworkLine
    ? artworkLine.split(':').slice(1).join(':').trim() || fallback.artworkName
    : lines[1] && !/^mashhur asari/i.test(lines[1])
    ? lines[1]
    : fallback.artworkName;

  const descriptionLines = lines.filter(
    (line, index) => index !== 0 && line !== artworkLine,
  );
  const description = descriptionLines.join(' ') || fallback.description;

  return {
    artistName,
    artworkName,
    description,
  };
};

const getImageUrl = (artistId: string, fileName: string) => {
  const assetPath = `../../../images/${artistId}/${fileName}`;
  return assetModules[assetPath] ?? undefined;
};

const buildArtistProfile = (artistId: string): ArtistProfile => {
  const rawInfo = infoModules[`../../../images/${artistId}/info.txt`];
  const parsed = parseInfo(rawInfo, artistId);

  return {
    id: artistId,
    artistName: parsed.artistName,
    artworkName: parsed.artworkName,
    description: parsed.description,
    portraitUrl:
      getImageUrl(artistId, 'avtoportret.png') ?? getImageUrl(artistId, 'avtoportret.jpg') ?? portraitFallback,
    artworkUrl:
      getImageUrl(artistId, 'mashhur_asar.png') ?? getImageUrl(artistId, 'mashhur_asar.jpg') ?? artworkFallback,
  };
};

const artistIds = new Set<string>();
Object.keys(infoModules).forEach((path) => artistIds.add(getArtistId(path)));
Object.keys(assetModules).forEach((path) => artistIds.add(getArtistId(path)));

export const artists: ArtistProfile[] = Array.from(artistIds)
  .map(buildArtistProfile)
  .sort((a, b) => a.artistName.localeCompare(b.artistName));

export const useArtists = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setLoading(false));
    return () => cancelAnimationFrame(frame);
  }, []);

  return { artists, loading };
};
