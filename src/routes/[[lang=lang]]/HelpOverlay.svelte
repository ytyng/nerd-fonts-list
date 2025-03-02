<script lang="ts">
  export let isJa: boolean;
  export let onclose: () => void;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
<div
  class="backdrop fixed top-0 left-0 right-0 bottom-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center px-4 py-4 md:py-12"
  on:click|self={onclose}
>
  <div
    class="help-dialog bg-gray-700 w-full max-w-screen-sm h-full overflow-y-scroll text-white"
  >
    <div class="flex justify-between items-center p-2">
      <h2 class="text-2xl font-bold">
        {#if isJa}このサイトについて{:else}What is this site?{/if}
      </h2>
      <button on:click={onclose} class="nerd-font text-xl">  </button>
    </div>
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
