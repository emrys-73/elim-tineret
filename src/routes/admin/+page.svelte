<script lang="ts">
    import { goto } from "$app/navigation";
    import { supabase } from "$lib/supabaseClient";
    import { onMount } from "svelte";

    onMount(async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        goto(`/login`);
      }
      // await loadContent();

    });
  
    const signOut = async () => {
      const { error } = await supabase.auth.signOut();
  
      if (error) {
        console.log(error);
        return;
      } else {
        goto(`/`);
      }
    };


</script>

<div class="pt-6 pl-6 pr-6 justify-center flex flex-col items-center">
  <h1 class="p-6">
    Your Account
  </h1>

  <p> Empty for now but just you wait ;) </p>
</div>
<div class="p-6 justify-center flex flex-col items-center">
    <button type="button" on:click={signOut} class="text-black dark:text-white bg-gray-800 hover:text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 min-w-[300px]">Sign Out</button>
</div>