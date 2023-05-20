<script lang="ts">
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabaseClient.js';
	import { modalStore, type ModalSettings, Paginator} from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

    export let data;
    let { songs } = data;
    $: ({ songs } = data);	

    const addSong = async () => {
        goto('/addSong')
    }

	let logged_in = false;

	// Check that user is logged in
	onMount(async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        logged_in = true;
		// goto('/songs');
      }
	  if (!logged_in) {
		// goto('/login');
	  }
    });

	let selectedSongs = 0;
	const selectionMac = 15;
	let likedSongs = 0;

	const submitLikes = () => {
		// TODO: find a way to add likes
	}

</script>

<div class="container p-10 space-y-4">
	<h1>Songs</h1>
<hr />

<!-- 
	<div>
		<p>
			Songs you've liked: {likedSongs}
		</p>
	</div>
-->

    
<!-- Responsive Container -->
<div class="table-container">
	<!-- Native Table Element -->
	<table class="table table-interactive table-compact table-row-checked">
		<thead>
			<tr>
				<!-- heart thingi -->
				<!-- <th>Likes</th> -->
				<th>Name</th>
                <th>Author</th>
				<th>Key</th>
                <th>Tempo</th>
                <th>Video</th>
			</tr>
		</thead>
		<tbody>
			{#each songs as song, i}
				<tr>
					<!-- m<td>♡</td> -->
					<!-- <td class="selection:bg-black">{song.likes}</td> -->
					<td>{song.name}</td>
					<td>{song.author}</td>
                    <td>{song.key}</td>
                    <td>{song.tempo}</td>
                    <a href="{song.yt_link} ">
                        <td>🔗</td>
                    </a>
				</tr>
			{/each}
		</tbody>
		<tfoot>
		</tfoot>
	</table>
    <div class="p-6 justify-center flex flex-col items-center">
        <button type="button" on:click={addSong} class="dark:text-white text-black hover:text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 min-w-[300px]">Add a Song</button>
    </div>
</div>

<!-- <p> Logged in: {logged_in} </p> -->

</div>