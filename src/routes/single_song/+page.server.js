import { supabase } from "$lib/supabaseClient";

export async function load(song_name) {

    const { error } = await supabase
        .from('songs')
        .delete()
        .eq('name', song_name)

    if (error) {
        console.error('Error deleting song:', error);
        return {
        error: error.message ?? 'Unknown error',
        };
    }

  console.log('Song deleted successfully!');
  return {};
}