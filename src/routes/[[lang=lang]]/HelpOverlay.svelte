<script lang="ts">
  import MarkdownDocument from "./MarkdownDocument.svelte";
  import helpMarkdownJa from "$lib/help.ja.md?raw";
  import helpMarkdownEn from "$lib/help.en.md?raw";

  export let isJa: boolean;
  export let onclose: () => void;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
<div
  class="backdrop fixed top-0 left-0 right-0 bottom-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center px-4 py-4 md:py-12"
  on:click|self={onclose}
>
  <div
    class="help-dialog bg-gray-700 w-full max-w-screen-sm h-full rounded overflow-y-scroll text-white relative px-3 pb-4"
  >
    {#if isJa}
      <MarkdownDocument content={helpMarkdownJa} />
    {:else}
      <MarkdownDocument content={helpMarkdownEn} />
    {/if}

    {#if isJa}{/if}
  </div>
  <div class="fixed top-0 right-3 z-1 text-white/80 text-3xl leading-none">
    <button on:click={onclose} class="nerd-font text-xl"></button>
  </div>
</div>

<style>
  .backdrop {
    animation: fadeIn 0.3s ease;
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  .help-dialog {
    animation: slideIn 0.3s ease;
  }
  @keyframes slideIn {
    from {
      transform: translateY(-50px);
    }
    to {
      transform: translateY(0);
    }
  }
</style>
