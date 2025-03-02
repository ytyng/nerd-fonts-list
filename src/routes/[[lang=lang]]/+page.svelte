<script lang="ts">
  export let data: { lang: string };

  let isJa = data.lang === "ja";

  import glyphgroups from "$lib/glyphgroups.json";

  $: filteredGroups = () => {
    return glyphgroups;
  };

  const fixGliphName = (name: string) => {
    return name.replace(/_/g, " ");
  };
</script>

<div class="relative">
  <h1 class="sticky top-0 h-12 z-2 bg-gray-800 text-white text-2xl py-2 px-4 font-bold">
    All of Nerd Fonts Glyphs
  </h1>
  {#each filteredGroups() as group}
    <div class="relative">
      <h2
        class="sticky top-12 z-1 bg-gray-700 text-white text-3xl py-2 px-4 font-bold"
      >
        {group.groupName}
      </h2>
      <ul
        class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 px-4"
      >
        {#each group.glyphs as glyph}
          <li class="bg-gray-900 text-white rounded break-all">
            <div class="glyph text-center">
              {glyph.char}
            </div>
            <div class="flex justify-center md:justify-between pb-2">
              <h3 class="px-2 text-xs text-indigo-300/50">
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

<style>
  .glyph {
    font-family: "RobotoMonoNerdFontMono", monospace;
    font-size: calc(8vw + 5em);
    line-height: 1.2;
  }
</style>
