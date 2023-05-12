import { supabase } from "$lib/supabaseClient";

export async function load(payload) {
  const { error } = await supabase.from("songs").insert([payload]);
  if (error) {
    console.error('Error uploading payload:', error);
    return {
      error: error.message ?? 'Unknown error',
    };
  }

  console.log('Payload uploaded successfully!');
  return {};
}