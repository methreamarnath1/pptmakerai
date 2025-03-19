
import { toast } from 'sonner';

// Updated Unsplash API key
const UNSPLASH_ACCESS_KEY = 'SmkPCiEk6SLr5BHBxgTwOYFJ-YfxUpwufebh8heV89U';

export interface UnsplashImage {
  id: string;
  urls: {
    regular: string;
    small: string;
    thumb: string;
  };
  alt_description: string;
  user: {
    name: string;
    links: {
      html: string;
    };
  };
}

export async function searchUnsplashImages(query: string, page: number = 1, perPage: number = 20): Promise<UnsplashImage[]> {
  try {
    console.log(`Searching Unsplash for: ${query}, page: ${page}`);
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}`,
      {
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Unsplash API Error Response:', errorText);
      throw new Error(`Failed to fetch images from Unsplash: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`Found ${data.results?.length || 0} results for "${query}"`);
    return data.results;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Unsplash API Error Details:', error);
      toast.error(`Image search failed: ${error.message}`);
    } else {
      console.error('Unknown Unsplash API Error:', error);
      toast.error('Failed to search for images');
    }
    return [];
  }
}

export async function getRandomUnsplashImage(query: string): Promise<UnsplashImage | null> {
  try {
    const images = await searchUnsplashImages(query, 1, 10);
    if (images.length > 0) {
      // Return a random image from the results
      const randomIndex = Math.floor(Math.random() * images.length);
      return images[randomIndex];
    }
    return null;
  } catch (error) {
    console.error('Failed to get random image:', error);
    return null;
  }
}

// New function to fetch image from Unsplash based on imagePrompt
export async function fetchUnsplashImageForPrompt(imagePrompt: string): Promise<{url: string, credit: {name: string, url: string}} | null> {
  try {
    const image = await getRandomUnsplashImage(imagePrompt);
    if (image) {
      return {
        url: image.urls.regular,
        credit: {
          name: image.user.name,
          url: image.user.links.html
        }
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching image for prompt:', error);
    return null;
  }
}
