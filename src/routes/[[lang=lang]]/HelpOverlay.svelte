<script lang="ts">
  export let isJa: boolean;
  export let onclose: () => void;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
<div
  class="fixed top-0 left-0 right-0 bottom-0 bg-black/50 z-50 flex justify-center items-center px-4 py-4 md:py-12"
  on:click|self={onclose}
>
  <div
    class="bg-gray-700 w-full max-w-screen-sm h-full overflow-y-scroll text-white"
  >
    <div class="flex justify-between items-center p-2">
      <h1 class="text-2xl font-bold">What is this?</h1>
      <button on:click={onclose} class="nerd-font text-xl">  </button>
    </div>
  </div>
</div>
