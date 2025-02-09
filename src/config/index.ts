export const API_CONFIG = {
  ENDPOINT_URL: process.env.NEXT_PUBLIC_API_ENDPOINT!,
  API_KEY: process.env.NEXT_PUBLIC_API_KEY!
};

if (!API_CONFIG.ENDPOINT_URL || !API_CONFIG.API_KEY) {
  throw new Error('Missing required environment variables');
} 