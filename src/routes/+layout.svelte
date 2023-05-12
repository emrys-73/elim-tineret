<script lang='ts'>
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/all.css';
	// Most of your app wide CSS should be put in this file
	// import '../app.postcss';
	import '../app.css'
	import { AppShell, AppBar, LightSwitch } from '@skeletonlabs/skeleton';
	import Navigation from '$lib/Navigation/Navigation.svelte';
	import { Drawer, drawerStore } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import { autoModeWatcher } from '@skeletonlabs/skeleton';

	// Supabase
	import { createClient } from '@supabase/supabase-js'
	import { Modal, modalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton';	

	$: classesSidebar = $page.url.pathname === '/end' ? 'w-0' : 'w-0 lg:w-56';

	function drawerOpen(): void {
		drawerStore.open({});
	}

</script>

<svelte:head>{@html `<script>${autoModeWatcher.toString()} autoModeWatcher();</script>`}</svelte:head>

<Drawer>
	<h2 class="p-4">Navigation</h2>
	<hr />
	<Navigation/>
</Drawer>

<Modal /> 
<!-- App Shell -->
<!-- How cool is it that you can add the classes dynamically!! - Ich lieb's-->
<AppShell slotSidebarLeft="bg-surface-500/5 w-0 {classesSidebar}">
	<svelte:fragment slot="sidebarLeft">
		<Navigation />
	</svelte:fragment>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
			<svelte:fragment slot="lead">
				<div class="flex items-center">
					<button class="lg:hidden btn btn-sm mr-4" on:click={drawerOpen}>
						<span>
							<svg viewBox="0 0 100 80" class="fill-token w-4 h-4">
								<rect width="100" height="20" />
								<rect y="30" width="100" height="20" />
								<rect y="60" width="100" height="20" />
							</svg>
						</span>
					</button>
						<strong class="text-md lg:text-xl uppercase">Elim Tineret</strong>
				</div>
			</svelte:fragment>
			
			<svelte:fragment slot="trail">
				<LightSwitch />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
