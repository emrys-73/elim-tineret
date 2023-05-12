<script lang="ts">
	import { goto } from "$app/navigation";
    import { supabase } from "$lib/supabaseClient";
	import { modalStore, type ModalSettings, ProgressBar } from "@skeletonlabs/skeleton";
    import { onMount } from "svelte";

    let email = "";
    let password = "";
    let loading = false;

    onMount(async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        goto(`/admin`);
      }
    });

    const signIn = async () => {
        loading = true;
        const { error } = await supabase.auth.signInWithPassword({
            email, 
            password
        });
        if (error) {
            console.log(error);
        } else {
            goto(`/admin`);
        }
        loading = false;
    }

</script>

<div class="pt-6 pl-6 pr-6 justify-center flex flex-col items-center">
    <h1 class="pb-6">
        Log In
    </h1>
    <p> 
        logging in allows you to add and like songs
    </p>
    {#if loading}
        <div>
            {#if loading}
                <ProgressBar value={undefined} />
            {/if}
        </div>
    {/if}
    
    <form on:submit|preventDefault={signIn}>
        <label class="pb-6" for="email">
            
        </label>
        <input type="email" name="email" id="email" placeholder="E-Mail" class="placeholder:italic dark:text-black min-w-[300px]" bind:value={email}>
        <label class="pt-6" for="password">
            
        </label>
        <input type="password" name="password" id="password" placeholder="Password" class=" placeholder:italic dark:text-black min-w-[300px]" on:keydown={(e) => e.key === "Enter" && signIn()} bind:value={password}>
    </form>

</div>
<div class="p-6 justify-center flex flex-col items-center">

      <button type="button" on:click={signIn} class="hover:text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 text-black min-w-[300px] dark:text-white">Log In</button>
      <p class="text-gray-200 italic pt-2"> 
        or 
        <a href="/signup" class="">
            create an account here
        </a>
        
      </p>
      
</div>
