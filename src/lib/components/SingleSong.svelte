<script>
    // The following comment idsables type checking for this file
// @ts-nocheck

	import { goto } from "$app/navigation";
    import { supabase } from '$lib/supabaseClient.js';
    import { count } from "$lib/stores/songStore";
    import { name, author, key, tempo, link } from "$lib/stores/songStore";
	
    // TODO: Also clean this up
    let countValue;
    let keyValue;
    let authorValue;
    let nameValue;
    let linkValue;
    let tempoValue;
    let chordsValue;
    let lyricsValue;
    

    // TODO: get rid of all these messy functions
    // Simplify them into one or similar
    const subscribeAll = () => {
        count.subscribe(value => {
		    countValue = value;
	    });

        name.subscribe(name => {
            nameValue = name;
        });

        author.subscribe(author => {
            authorValue = author;
        });

        key.subscribe(key => {
            keyValue = key;
        });

        tempo.subscribe(tempo => {
            tempoValue = tempo;
        });

        link.subscribe(link => {
            linkValue = link;
        });

    }

    subscribeAll()

    const goToSongs = () => {
        goto("/songs");
    }

    const deleteSong = () => {
        // TODO: Implement functionality.
        // Server already implemented but not functional
        // Must be tested
        return;
    }


</script>


<!-- TODO: Make Pretty -->
<div class="p-4">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <p class="italic text-gray-300 pb-2 hover:cursor-pointer" on:click={goToSongs}>Back to songs </p>

    <div class="flex flex-col justify-center items-center">
        <div class="flex flex-col justify-center items-center">
            <h1 class="card-header">
                {nameValue}
            </h1>
            <div>
                <p class="italic text-gray-400 text-lg pt-2 pb-4">{authorValue}</p>
            </div>
            <div class="pb-2">
                <span class="badge variant-filled min-h-[30px]">{keyValue}</span>
                <span class="badge variant-filled min-h-[30px]">{tempoValue} Bpm</span>
                <a href="{linkValue}">
                    <span class="badge variant-filled min-h-[30px]"> 🔗 </span>
                </a>
                
            </div>
            
        </div>
        <div class="p-6 justify-center flex flex-col items-center">
            <button type="button" on:click={deleteSong} class="dark:text-white text-black hover:text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 min-w-[300px]">Delete Song</button>
        </div>
    </div>
</div>