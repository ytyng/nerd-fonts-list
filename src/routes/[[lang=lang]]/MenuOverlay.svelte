<script lang="ts">
  import type {GlyphGroup} from "$lib/interfaces"

  export let groups: GlyphGroup[]
  export let isJa: boolean
  export let onclose: () => void
  export let onopenhelp: () => void

  function scrollToGroup(prefix: string, groupTitle: string) {
    const element = document.getElementById(`${prefix}-${groupTitle}`)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })
      onclose()
    }
  }
</script>
<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
<div
  class="fixed top-0 left-0 right-0 bottom-0 bg-black/50 backdrop-blur-sm z-50 flex justify-start items-start"
  on:click|self={onclose}
>
  <div class="bg-gray-700 w-96 max-w-full h-full overflow-y-scroll text-white">
    <div class="p-2">
      <button on:click={onclose}>
        ←
        {#if isJa}閉じる{:else}Close{/if}
      </button>
    </div>
    <ul class="border-b border-gray-700">
      {#each groups as group}
        <li class="p-2 bg-gray-800">
          <button on:click={() => scrollToGroup('g', group.groupName)}>
            {group.groupName}
          </button>
        </li>
      {/each}
    </ul>
    <div class="bg-gray-800">
      <div class="p-2 border-b border-gray-700">
        <button on:click={onopenhelp} class="text-blue-300">
          {#if isJa}このサイトについて{:else}About{/if}
        </button>
      </div>
      <div class="p-2 border-b border-gray-700">
        {#if isJa}
          <a lang="en" href="/" data-sveltekit-reload
             class="text-blue-300 hover:underline"
          >Show in English</a>
        {:else}
          <a lang="ja" href="/ja/" data-sveltekit-reload
             class="text-blue-300 hover:underline"
          >日本語で表示</a>
        {/if}
      </div>
      <div class="p-2 border-b border-gray-700">
        {#if isJa}
          <a href="https://emoji.ytyng.com/"
          target="_blank"
             class="text-blue-300 hover:underline"
          >絵文字エクスプローラー</a><br>
          <div class="text-xs text-gray-300" >全 Unicode 絵文字を一覧するサイト</div>
        {:else}
          <a href="https://emoji.ytyng.com/"
          target="_blank"
             class="text-blue-300 hover:underline"
          >Emoji Explorer</a><br>
          <div class="text-xs text-gray-300" >A site to list all Unicode emojis</div>
        {/if}
      </div>
      <div class="p-2 border-b border-gray-700">
        <a href="https://github.com/ytyng/nerd-fonts-list"
           target="_blank"
           class="text-blue-300 hover:underline"
        ><span class="nerd-font text-xl leading-none">󰊤</span> Github</a>
      </div>
      <div class="p-2">
        <a href="https://www.ytyng.com"
           target="_blank"
           class="text-blue-300 hover:underline"
        >ytyng.com</a>
      </div>
    </div>
  </div>
</div>
