import { createClient } from '@supabase/supabase-js';
import { API_CONFIG } from '@/config/api';

const supabaseUrl = API_CONFIG.SUPABASE_URL;
const supabaseAnonKey = API_CONFIG.SUPABASE_ANON_KEY;

// Only initialize if URL and KEY are provided to avoid runtime errors during build/setup
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
