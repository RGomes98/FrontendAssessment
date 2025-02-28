import { useEffect, useState } from 'react';

type UseGetThumbnail = {
  imageSrc: string;
};

export function useGetThumbnail({ imageSrc }: UseGetThumbnail) {
  const [thumbnailContent, setThumbnailContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!imageSrc) return;

    (async () => {
      try {
        setIsLoading(true);
        const response = await fetch(imageSrc);
        const buffer = URL.createObjectURL(await response.blob());
        setThumbnailContent(buffer);
      } catch (error) {
        console.error(`Failed to fetch thumbnail from the source: "${imageSrc}". Details: ${error}`);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [imageSrc]);

  return { isLoading, thumbnailContent };
}
