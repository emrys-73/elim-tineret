<script>
	import { goto } from "$app/navigation";
	import { name, author, key, tempo, link } from "$lib/stores/songStore";

    function setData() {
		name.set(song_name);
        author.set(song_author);
        key.set(song_key);
        tempo.set(song_tempo);
        link.set(song_link);
        goto("/single_song");
	}

    // TODO: Adapt to have a "dictionary"-like
    // structure instead of individual parameters

    // Something like this: <Info {...pkg}/>

    // More info can be found on the Svelte Tutorial
    export let song_name = "";
    export let song_author = "";
    export let song_key = "";
    export let song_tempo = 0;
    export let song_link = "";
</script>

<button on:click={setData}>
	{song_name}
</button>