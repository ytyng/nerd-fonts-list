<script lang="ts">
  import MenuOverlay from "./MenuOverlay.svelte";
  import HelpOverlay from "./HelpOverlay.svelte";
  import glyphgroups from "$lib/glyphgroups.json";
  import type { GlyphGroup } from "$lib/interfaces";

  export let data: { lang: string };

  let menuVisible = false;
  let helpVisible = false;
  let snackbarVisible = false;
  let isJa = data.lang === "ja";
  let searchQ = "";
  let debouncedSearchQ = "";
  let searchQUpdateTimer: number | null = null;
  let searchFocus = false;

  const inputSearchQ = () => {
    if (searchQUpdateTimer) {
      clearTimeout(searchQUpdateTimer);
    }
    searchQUpdateTimer = setTimeout(() => {
      debouncedSearchQ = searchQ;
      searchQUpdateTimer = null;
    }, 500);
  };

  $: filteredGroups = () => {
    if (!searchQ) {
      return glyphgroups as GlyphGroup[];
    }

    const matchedGroups = [];
    const needle = debouncedSearchQ.toLowerCase();

    for (const group of glyphgroups) {
      if (group.groupName.toLowerCase().includes(needle)) {
        matchedGroups.push(group);
        continue;
      }
      const matchedGlyphs = [];
      for (const glyph of group.glyphs) {
        if (glyph.name.toLowerCase().includes(needle)) {
          matchedGlyphs.push(glyph);
        }
      }
      if (matchedGlyphs.length > 0) {
        matchedGroups.push({
          groupName: group.groupName,
          glyphs: matchedGlyphs,
        });
      }
    }
    return matchedGroups as GlyphGroup[];
  };

  const fixGliphName = (name: string) => {
    return name.replace(/_/g, " ");
  };

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
    snackbarVisible = true;
    setTimeout(() => {
      snackbarVisible = false;
    }, 2000);
  };
</script>

<svelte:head>
  {#if isJa}
    <title>全 Nerd Fonts シンボル</title>
    <meta
      name="description"
      content="ナードフォント(Nerd Fonts)のすべての記号(シンボル)を表示しているページです。Nerd Fonts をPCにインストールして、コンソールアプリを開発する時に使う記号を探す時に便利です。"
    />
    <link rel="alternate" hreflang="en" href="https://nerdfonts.ytyng.com/" />
  {:else}
    <title>All Nerd Fonts Glyphs</title>
    <meta
      name="description"
      content="This page shows all the symbols of Nerd Fonts. It is useful to find symbols to use when developing console applications by installing Nerd Fonts on your PC."
    />
    <link rel="alternate" hreflang="ja" href="https://nerdfonts.ytyng.com/ja/" />
  {/if}
</svelte:head>

<div class="relative">
  <div
    class="sticky top-0 z-2 bg-gray-800 text-white flex h-12 justify-between items-center"
  >
    <div class="text-2xl py-2 px-4 flex text-gray-300">
      <button on:click={() => (menuVisible = true)} class="nerd-font mr-2">
        󰍜
      </button>
      <h1 class="font-bold text-gray-200">All Nerd Fonts Glyphs</h1>
      <button
        class="nerd-font ml-2 text-gray-400"
        on:click={() => (helpVisible = true)}
      >
        
      </button>
    </div>
    <div class="pe-3">
      <input
        type="search"
        class="block w-full lg:w-96 py-1 px-2 rounded bg-gray-500 hover:bg-white hover:text-gray-900 placeholder-opacity-50 nerd-font"
        placeholder=""
        bind:value={searchQ}
        on:keyup={inputSearchQ}
        on:focus={() => (searchFocus = true)}
        on:blur={() => (searchFocus = false)}
      />
    </div>
  </div>
  {#each filteredGroups() as group}
    <div class="relative">
      <span id={`g-${group.groupName}`}></span>
      <h2
        class="sticky top-12 z-1 bg-gray-700/80 text-white text-3xl py-2 px-4 font-bold backdrop-blur-sm"
      >
        {group.groupName}
      </h2>
      <ul
        class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 px-4 py-4"
      >
        {#each group.glyphs as glyph}
          <li class="bg-gray-900 text-white rounded break-all">
            <div class="glyph text-center">
              <button on:click={() => copyText(glyph.char)}>
                {glyph.char}
              </button>
            </div>
            <div class="flex justify-center md:justify-between pb-2">
              <h3 class="px-2 text-xs text-indigo-300/70 capitalize">
                {fixGliphName(glyph.name)}
              </h3>
              <div class="hidden md:block px-2 text-xs text-green-300/50">
                {glyph.code}
              </div>
            </div>
          </li>
        {/each}
      </ul>
    </div>
  {/each}
</div>

{#if menuVisible}
  <MenuOverlay
    groups={filteredGroups()}
    {isJa}
    onclose={() => (menuVisible = false)}
    onopenhelp={() => {
      menuVisible = false;
      helpVisible = true;
    }}
  />
{/if}

{#if helpVisible}
  <HelpOverlay {isJa} onclose={() => (helpVisible = false)} />
{/if}

<div
  class="fixed z-50 bottom-0 left-0 right-0 w-full flex flex-col items-center"
>
  {#if snackbarVisible}
    <div
      class="snackbar bg-gray-500/70 text-white rounded-lg text-8xl shadow-xl p-6 mb-10 backdrop-blur-sm"
    >
      <span class="nerd-font px-8"></span>
    </div>
  {/if}
</div>

<style>
  .glyph {
    font-family: "RobotoMonoNerdFontMono", monospace;
    font-size: calc(8vw + 5em);
    line-height: 1.2;
  }

  .snackbar {
    animation: snackbar-animation 2s;
    animation-fill-mode: forwards;
  }

  @keyframes snackbar-animation {
    0% {
      transform: translateY(10px);
      opacity: 0;
    }
    5% {
      transform: translateY(0);
      opacity: 1;
    }
    90% {
      transform: translateY(0);
      opacity: 1;
    }
    100% {
      transform: translateY(10px);
      opacity: 0;
    }
  }
</style>
