<script>
	// import { PUBLIC_OPENAI_KEY } from "$env/static/public";
    const PUBLIC_OPENAI_KEY = process.env.PUBLIC_OPENAI_KEY;
	import { ProgressBar } from "@skeletonlabs/skeleton";
    import { onMount } from "svelte";

	let res = "";
    let prompt = "";
    let input = "";

    let loading = false;

	async function fetchData() {
        loading = true;

        if (!prompt) {
            prompt = "Give me a random bible verse and mention the reference";
        } else {
            prompt = `Give me a bibble verse about ${input} and include the references.`
        }
        
        
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${PUBLIC_OPENAI_KEY}`, 
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    // YOu can even send separate messages
                    messages: [{
                        role: 'system', 
                        content: `Your task is to always interpret the feeling out of \
                        the messages given and what the intention is about. You \
                        will always reply with a bible verse and a reference to where to find it. \
                        `
                    },
                    {
                        role: "user",
                        content: prompt
                    }]
                })
            })

        
        const data = await response.json()
        loading = false;
        res = data.choices[0].message.content;
        console.log(res)
	}

</script>



<div class="container p-10 space-y-4 justify-center flex flex-col">
	<h1>Bible Verse Generator</h1>
	<hr />
	<p>
        Try describing how you are feeling, what are you thinking about or what are you struggling with and you'll get a bibble verse for that topic.
    </p>
    
    
	<br>
    <textarea name="input" id="input" placeholder="What's in your mind?" class=" placeholder:italic dark:text-black min-w-[300px]" on:keydown={(e) => {
        if (e.key === "Enter" && e.shiftKey === false) {
            e.preventDefault(); // prevent new line
            fetchData();
        }
    }} bind:value={input}></textarea>

    <button type="button" on:click={fetchData} class="text-black bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-6 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 hover:text-white dark:text-white">Generate</button>
    <div>
        {#if loading}
            <ProgressBar value={undefined}/>
        {/if}
        <p> 
            {res}
        </p>
    </div>
    <div class="flex flex-col items-center">
        <p class="italic text-gray-500 text-xs justify-center absolute bottom-4 w-[300px] md:w-[600px] lg:w-full text-center">
            The results are generated using the public beta of the BVG-1 Generative Model and might not be accurate all the time.
        </p>
    </div>
</div>
