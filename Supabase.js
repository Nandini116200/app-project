const SUPABASE_URL = 'https://eohyhutadbpghjvbwecv.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVvaHlodXRhZGJwZ2hqdmJ3ZWN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg5NzMyODUsImV4cCI6MjA5NDU0OTI4NX0.-ZWFuz02rKdE9IAo25HtuC0bWho1mhdECqtGdPCxM1A';

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);
window.supabaseClient = supabaseClient;
console.log("Supabase Connected");
