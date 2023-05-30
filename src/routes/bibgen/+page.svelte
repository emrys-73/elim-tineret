<script>
	// import { PUBLIC_OPENAI_KEY } from "$env/static/public";
    // const PUBLIC_OPENAI_KEY = process.env.PUBLIC_OPENAI_KEY;
    const VITE_PUBLIC_OPENAI_KEY = import.meta.env.VITE_PUBLIC_OPENAI_KEY
	import { ProgressBar } from "@skeletonlabs/skeleton";
    import { onMount } from "svelte";

	let res = "";
    let prompt = "";
    let input = "";
    let topic_input = ""
    let topic_res = ""

    let topic_loading = false;
    let loading = false;
    let topic_finished_loading = false;
    let emotion_finished_loading = false;
    // console.log(VITE_PUBLIC_OPENAI_KEY)

	async function fetchData() {
        loading = true;
        emotion_finished_loading = false;

        
        prompt = `Give me a bibble verse about ${input} and include the references. Explain why this verse relates to the topic given`
        
        
        
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${VITE_PUBLIC_OPENAI_KEY}`, 
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
        emotion_finished_loading = true;
        console.log(res)
	}

    async function fetchTopicData() {
        if (topic_input.includes("/pro")) {
            topic_input = topic_input.replace("/pro", "");
            // topic_finished_loading = true
            // topic_res = topic_input
            fetchTopicDataExtended()
            return
        }
        topic_loading = true;
        topic_finished_loading = false;
        
        prompt = `List 3 bible verses related to the following topic and include their references. \ 
        You will also give a short explanation for why you chose each verse: ${topic_input}`
        
        
        console.log(prompt)
        
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${VITE_PUBLIC_OPENAI_KEY}`, 
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    // YOu can even send separate messages
                    messages: [{
                        role: 'system', 
                        content: `Your task is to always provide \
                        a list of 3 bible verses references to the topic that is being discussed`
                    },
                    {
                        role: "user",
                        content: prompt
                    }]
                })
            })

        
        const data = await response.json()
        topic_loading = false;
        if (data) {
            console.log(data)
            topic_res = data.choices[0].message.content;
            console.log(topic_res)
            topic_finished_loading = true;
        }
        else {
            console.log("An error occured")
        }
        
    }
    
    async function fetchTopicDataExtended() {
        topic_loading = true;
        topic_finished_loading = false;
        
        prompt = `List 10 bible verses related to the following topic and include their references. \ 
        You will also give a short explanation for why you chose each verse: ${topic_input}`
        
        
        console.log(prompt)
        
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${VITE_PUBLIC_OPENAI_KEY}`, 
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    // YOu can even send separate messages
                    messages: [{
                        role: 'system', 
                        content: `Your task is to always provide \
                        a list of 10 bible verses references to the topic that is being discussed`
                    },
                    {
                        role: "user",
                        content: prompt
                    }]
                })
            })

        
        const data = await response.json()
        topic_loading = false;
        if (data) {
            console.log(data)
            topic_res = data.choices[0].message.content;
            console.log(topic_res)
            topic_finished_loading = true;
        }
        else {
            console.log("An error occured")
        }
    }

</script>



<div class="container p-10 space-y-4 justify-center flex flex-col">
	<h1>Bible AI</h1>
	<hr />
    <div>
        <a href="/bibgen_ro">
            <button type="button" class="text-black bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-6 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 hover:text-white dark:text-white">🇷🇴</button>
        </a>
        <a href="/bibgen_de">
            <button type="button" class="text-black bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-6 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 hover:text-white dark:text-white">🇩🇪</button>
        </a>
        <a href="/bibgen">
            <button type="button" class="text-black bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-6 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 hover:text-white dark:text-white">🇬🇧</button>
        </a>
    </div>
    <div>
    <h2>
        Feeling to verse
    </h2>
	<p>
        Describe a feeling or any problem you are facing and get a verse from the bible for it.
    </p>
    
    
	<br>
    <textarea name="input" id="input" placeholder="Type in here" class=" placeholder:italic dark:text-black min-w-full" on:keydown={(e) => {
        if (e.key === "Enter" && e.shiftKey === false) {
            e.preventDefault(); // prevent new line
            fetchData();
        }
    }} bind:value={input}></textarea>

    <button type="button" on:click={fetchData} class="text-black bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-6 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 hover:text-white dark:text-white min-w-full">Go</button>
    <div>
        {#if loading}
            <ProgressBar value={undefined}/>
        {/if}
        {#if emotion_finished_loading}
            <pre>{res}</pre>
        {/if}
        <p> 
            
        </p>
    </div>
    </div>
    <h2>
        Topic to verse
    </h2>
	<p>
        Name a topic and get a list of bible verses related to it. 
    </p>
    
    
	<br>
    <textarea name="input" id="input" placeholder="Type in here" class=" placeholder:italic dark:text-black min-w-[300px]" on:keydown={(e) => {
        if (e.key === "Enter" && e.shiftKey === false) {
            e.preventDefault(); // prevent new line
            fetchTopicData();
        }
    }} bind:value={topic_input}></textarea>

    <button type="button" on:click={fetchTopicData} class="text-black bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-6 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 hover:text-white dark:text-white min-w-full">Go</button>
    <div>
        {#if topic_loading}
            <ProgressBar value={undefined}/>
        {/if}
        {#if topic_finished_loading}
            <pre class=" bg-transparent">{topic_res}</pre>
        {/if}
    </div>
    


    <div class="flex flex-col items-center">
        <p class="italic text-gray-500 text-xs justify-center bottom-4 w-[300px] md:w-[600px] lg:w-full text-center">
            The results are generated using an alpha version of the BVG-1 Generative Model and do not guarantee accuracy.
        </p>
    </div>
</div>
