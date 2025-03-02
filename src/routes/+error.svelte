<script lang="ts">
  import {page} from '$app/stores'
</script>

<svelte:head>
  <title>Error: {$page.error.message}</title>
</svelte:head>

<div class="flex w-full min-h-svh justify-center items-center">
  <div class="flex flex-col w-64 items-center gap-6">
    <div class="text-8xl nerd-font">
      
    </div>

    <div class="text-8xl text-gray-500 font-bold">{$page.status}</div>
    <h1>{$page.error.message}</h1>

  </div>
</div>
