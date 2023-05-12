import { supabase } from "$lib/helpers/supabase";
import { writable } from "svelte/store";

export const content = writable<any[]>([]);

export const loadContent = async () => {
  content.set([]); // clear previous content
  const { data, error } = await supabase.from(`Songs`).select();
  if (error) {
    console.log(error);
  }
  if (data) {
    content.set(data);
  }
};