<script lang="ts">
  import {page} from '$app/stores'
</script>

<svelte:head>
  <title>Error: {$page.error.message}</title>
</svelte:head>

<div class="flex w-full min-h-svh justify-center items-center">
  <div class="flex flex-col w-64 items-center gap-6">
    <div class="error-symbol nerd-font text-gray-300">
      
    </div>

    <div class="text-8xl text-gray-500 font-bold">{$page.status}</div>
    <h1 class="text-white">{$page.error.message}</h1>

  </div>
</div>

<style>
  .error-symbol {
    font-size: 20rem;
    line-height: 1;
  }
</style>
