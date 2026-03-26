/**
 * API Configuration for the Music Learning Platform
 * This file contains all the external API endpoints and keys.
 */

export const API_CONFIG = {
  // Client-side API Routes (Next.js)
  CHAT_API: '/api/chat',
  AVATAR_API: '/api/avatar',
  
  // 3D Character Generation (Currently MOCKED)
  CHARACTER_3D_API_URL: process.env.NEXT_PUBLIC_CHARACTER_3D_API_URL || 'https://api.example.com/v1/generate-3d',
  
  // Music Analysis / Hand Tracking (MediaPipe / Custom)
  HAND_TRACKING_MODEL_URL: 'https://cdn.jsdelivr.net/npm/@mediapipe/hands',
  
  // Supabase Configuration
  SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
};

export const INSTRUMENTS = [
  { id: 'guitar', name: 'Guitar', image: '/instruments/guitar.jpg' },
  { id: 'piano', name: 'Piano', image: '/instruments/piano.jpg' },
  { id: 'drums', name: 'Drums', image: '/instruments/drums.jpg' },
  { id: 'violin', name: 'Violin', image: '/instruments/violin.jpg' },
];
