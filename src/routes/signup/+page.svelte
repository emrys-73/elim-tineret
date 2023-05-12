<script lang="ts">
	import { goto } from "$app/navigation";
    import { supabase } from "$lib/supabaseClient";
    // import { PUBLIC_APP_DOMAIN } from "$env/static/public";
	import { modalStore, type ModalSettings } from '@skeletonlabs/skeleton';

    let email = "";
    let password = "";
    let verifyPassword = ""; 
    let validPassword = true;
    let verified = true;

    const signUp = async () => {
        // console.log(email)

        if (password.length < 6) {
            validPassword = false;
            return;
        }

        if (password != verifyPassword) {
            verified = false;
            return;
            
        }
        
        const { error } = await supabase.auth.signUp({
            email, 
            password,
            options: {
                emailRedirectTo: `/admin`
            }
        });
        if (error) {
            console.log(error);
        } else {
            notifyVerify();
            goto(`/admin`);
        }
    }

    const notifyVerify = async () => {
        const alert: ModalSettings = {
            type: 'alert',
            // Data
            title: 'Welcome!',
            body: 'Check your Inbox to verify your E-Mail.',
            image: 'https://i.imgur.com/WOgTG96.gif',
        };
        modalStore.trigger(alert);
    }
    // signIn()

</script>

<div class="pt-6 pl-6 pr-6 justify-center flex flex-col items-center">
    <h1 class="pb-6">
        Sign Up
    </h1>
    <p> 
        Join. Cos I say so
    </p>
    
    <form on:submit|preventDefault={signUp}>
        <label class="pb-6" for="email">
            
        </label>
        <input type="email" name="email" id="email" placeholder="E-Mail" class="placeholder:italic dark:text-black min-w-[300px]" bind:value={email}>
        <label class="pt-6" for="password">
            
        </label>
        <input type="password" name="password" id="password" placeholder="Password" class=" placeholder:italic dark:text-black min-w-[300px]" bind:value={password}>
        <label class="pt-6" for="verify">
            
        </label>
        <input type="password" name="verify" id="verify" placeholder="Verify Password" class=" placeholder:italic dark:text-black min-w-[300px]" on:keydown={(e) => e.key === "Enter" && signUp()}  bind:value={verifyPassword}>

        {#if !validPassword}
            <p class=" text-red-500 italics text-xs max-w-[300px] pt-2">* Your password must be at least six characters long </p>
        {/if}

        {#if !verified}
            <p class=" text-red-500 italics text-xs max-w-[300px] pt-2">* Your password does not match </p>
        {/if}
        
    </form>

</div>
<div class="p-6 justify-center flex flex-col items-center">
      <button type="button" on:click={signUp} class="dark:text-white text-black bg-zinc-900 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 min-w-[300px]">Sign Up</button>
      <p class="text-gray-200 italic pt-2"> 

        <a href="/login" class="">
            I already have an account
        </a>
        
      </p>
</div>
