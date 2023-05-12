<script lang="ts">
    import { ProgressBar, focusTrap, type ToastSettings, toastStore } from '@skeletonlabs/skeleton'; 
    import { supabase } from "$lib/supabaseClient";
    import { Toast } from '@skeletonlabs/skeleton';

    let payload = {
        name: '',
        author: '',
        yt_link: "", // Only add one link
        key: "",
        tempo: null,
        chords: "",
        lyrics: "",
        tabara_candidate: false
    };

    const success_toast = () => {
        const t: ToastSettings = {
            message: 'Song added! 🥳',
            background: 'bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 text-white',
            timeout: 5000,
            // Add your custom classes here:
            classes: ''
        };
        toastStore.trigger(t);
    }

    const already_exists_toast = () => {
        const t: ToastSettings = {
            message: 'We already have that song! 🫡',
            background: 'variant-filled-secondary',
            timeout: 5000,
            // Add your custom classes here:
            classes: ''
        };
        toastStore.trigger(t);
    }

    const error_toast = () => {
        const t: ToastSettings = {
            message: 'An Error Ocurred 🤯 - Try again later',
            background: 'variant-filled-secondary',
            timeout: 5000,
            // Add your custom classes here:
            classes: ''
        };
        toastStore.trigger(t);
    }

    async function handleSubmit() {
        loading = true;
        valid = verify()
        
        if (valid) {
            console.log(payload)
            const { error } = await supabase.from("songs").insert([payload]);
            if ( error ) {
                loading = false;
                console.error('Error uploading payload:', error);
                if (error.details.includes('already')) {
                    already_exists_toast()
                    console.log(error.details)
                    console.log("song already exists")
                } else {
                    error_toast()
                    console.log("Something's wrong, I can feel it")
                }

                return;
            }
            loading = false;
            success_toast()
            console.log('Payload uploaded successfully!');
            return;
        }
        console.log(`Payload wasn't valid`);
    }

    let isFocused: boolean = true;
    let validName = true;
    let validTempo = true;
    let weirdTempo = false;
    let validkey = true;
    let addMoreInfo = false;
    let validMom = true;
    let valid = false;
    let loading = false;

    // Validate Key
    const keyPattern = /^(A|A#|B|C|C#|D|D#|E|F|F#|G|G#|H)(m|dim)?$/;

    const addInfoToggle = () => {
        addMoreInfo = !addMoreInfo;
    }

    const recommendTabara = () => {
        payload.tabara_candidate = !payload.tabara_candidate
    }

    const validateKey = () => {
        payload.key = payload.key.toUpperCase()
        return keyPattern.test(payload.key)
    }

    const validateMom = () => {
        const regex = /\b(?!(?:mom|mutter|mudda|muddi|mutti|mama|muda)\b)\w*mom\w*\b/i;
        return regex.test(payload.name) || regex.test(payload.author);
    }

    // TODO: extract validation to separate function
    const verify = () => {
        if (payload.name == "") {
            validName = false;
            // return;
        } else {
            validName = true;
        }

        if (payload.tempo === null) {
            weirdTempo = false;
            validTempo = true;
        } else {
            // TODO: Use weridTempo to check for string input
            // instead of proper int
            if (Number(payload.tempo) < 20 || Number(payload.tempo) > 400) {
                validTempo = false;
                // return;
            } else {
                weirdTempo = false;
                validTempo = true;
            }
        }
    
        if (payload.key != "") {
            if (!validateKey()) {
                validkey = false;
                // return;
            } else {
                validkey = true;
            }
        }
        if (validateMom()) {
            validMom = false;
            // return;
        } else {
            validMom = true;
        }
        return validName && validTempo && validkey && validMom;
    }

</script>
<div>
    <Toast />
</div>

<div class="pt-6 pl-6 pr-6 justify-center flex flex-col items-center">
    <h1 class="p-6">
      Add Song
    </h1>
    <div>
        {#if loading}
            <ProgressBar value={undefined} />
        {/if}
    </div>

    <form use:focusTrap={isFocused} on:submit|preventDefault={handleSubmit}>
        <div class="justify-center items-center  flex flex-col ">
            <div class="p-2 w-[300px] md:w-[400px] lg:w-[600px]">
                <label>
                    <input class=" input" type="text" placeholder="Name" bind:value={payload.name}/>
                </label>
            </div>
            {#if !validName}
                <p class=" text-red-500 italics text-xs max-w-[300px] pt-2">Please type in a name</p>
            {/if}
            <div class="p-2 w-[300px] md:w-[400px] lg:w-[600px]">
                <label>
                    <input  class=" input" type="text" placeholder="Author" bind:value={payload.author} />
                </label>
            </div>
            <div class="p-2 w-[300px] md:w-[400px] lg:w-[600px]">
                <input  class=" input" type="text" placeholder="YouTube Link" bind:value={payload.yt_link} />
            </div>
            {#if addMoreInfo}
                <div class="p-2 w-[300px] md:w-[400px] lg:w-[600px]">
                    <input  class=" input" type="text" placeholder="Key" bind:value={payload.key}/>
                </div>
                {#if !validkey}
                    <p class=" text-red-500 italics text-xs max-w-[300px] pt-2">* Hmmmm, not sure bout this </p>
                {/if}
                <div class="p-2 w-[300px] md:w-[400px] lg:w-[600px]">
                    <input  class=" input" type="text" placeholder="Tempo" bind:value={payload.tempo}/>
                </div>
                {#if weirdTempo}
                    <p class=" text-red-500 italics text-xs max-w-[300px] pt-2">* Tempo must be a number </p>
                {/if}
                {#if !validTempo}
                    <p class=" text-red-500 italics text-xs max-w-[300px] pt-2">* You sure bout that, bro? </p>
                {/if}
                <div class="p-2 w-[300px] md:w-[400px] lg:w-[600px]">
                    <input  class=" input" type="text" placeholder="Link to Chords" bind:value={payload.chords}/>
                </div>
                <div class="p-2 w-[300px] md:w-[400px] lg:w-[600px]">
                    <input  class=" input" type="text" placeholder="Lyrics"  bind:value={payload.lyrics}/>
                </div>
            {/if}
            <div class="p-2 w-[300px] md:w-[400px] lg:w-[600px]">
                <label class="relative inline-flex items-center mr-5 cursor-pointer">
                    <input type="checkbox" value="" class="sr-only peer" on:click={recommendTabara}>
                    <div class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                    <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Recommend for Tabara</span>
                  </label>
            </div>
            <div class="p-2">
                <button type="submit" class="btn variant-filled-secondary p-2">Submit Song</button>
                {#if !addMoreInfo}
                    <button class="btn variant-ringed-tertiary p-2" on:click={addInfoToggle}>Add More Info</button>
                {:else}
                    <button class="btn variant-ringed-tertiary p-2" on:click={addInfoToggle}>Less Info</button>
                {/if}
            </div>
            {#if !validMom}
                <p class=" text-red-500 italics text-xs max-w-[300px] pt-2">I knew it</p>
            {/if}
        </div>
    </form>
  </div>