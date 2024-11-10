import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://rxedxcanvhaxbdjepnat.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4ZWR4Y2FudmhheGJkamVwbmF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA4MzUyMTEsImV4cCI6MjA0NjQxMTIxMX0.u_7Z0EfKqKeD5BGskxVrFg0NjxR62Yo8i3wf5FW5A9Y";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
