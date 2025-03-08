import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dowiadyuqzbvyhwybxuc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvd2lhZHl1cXpidnlod3lieHVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk2MjI5OTQsImV4cCI6MjA1NTE5ODk5NH0.nl7wqKJXPddRlTG5x9tjEhCejknMVSGi21azQBwrRhU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
