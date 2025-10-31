import { createClient } from '@supabase/supabase-js';

// Supabase project connection details
const supabaseUrl = 'https://pmvtczovgfbjdazwvrgy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBtdnRjem92Z2ZiamRhend2cmd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5MDY2MjUsImV4cCI6MjA3NzQ4MjYyNX0.3LpiZ6aMIPabYnA3TL9KTtHzQ1wtOWzgR5jmTm330HQ';

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Fetches all data from the "matches" table.
 */
export async function getMatches() {
  const { data, error } = await supabase
    .from('matches') // Change the table name according to your database schema
    .select('*');

  if (error) {
    console.error('❌ Error fetching data:', error);
    return [];
  }

  console.log('✅ Data fetched successfully:', data);
  return data;
}

/**
 * Adds a new match to the "matches" table.
 * @param match - An object representing the match to add. Its structure should match your table columns.
 */
export async function addMatch(match: any) {
  const { data, error } = await supabase
    .from('matches')
    .insert([match]);

  if (error) {
    console.error('❌ Error adding match:', error);
    return null;
  }
  
  console.log('✅ Match added successfully:', data);
  return data;
}
