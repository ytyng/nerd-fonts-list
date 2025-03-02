<!--
利用規約などのページに使う Markdown ドキュメント。
スクリプトの安全性を確認しないので、信頼できるソースからのみ読み込むこと。
-->
<script lang="ts">

  import MarkdownIt from "markdown-it"

  export let content: string

  const md = new MarkdownIt()

  // Custom renderer to add target="_blank" to all links
  const defaultRender = md.renderer.rules.link_open || function(tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
  };

  md.renderer.rules.link_open = function(tokens, idx, options, env, self) {
    // If the link does not already have a target attribute, add one
    const aIndex = tokens[idx].attrIndex('target');
    if (aIndex < 0) {
      tokens[idx].attrPush(['target', '_blank']); // add new attribute
    } else {
      tokens[idx].attrs[aIndex][1] = '_blank';    // replace value of existing attribute
    }
    // pass token to default renderer.
    return defaultRender(tokens, idx, options, env, self);
  };

</script>

<div class="markdown-document {$$restProps.class ?? ''}">
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html md.render(content)}
</div>

<style>
  .markdown-document  {
    :global(h2) {
      font-size: 1.5rem;
      margin: 2rem 0 1rem;
      color: #d0ffe0;
      font-weight: 500;
    }
    :global(a) {
      color: #a0e0ff;
      text-decoration: underline;
    }
    :global(p) {
      line-height: 2;
    }
    :global(ul, ol) {
      padding-left: 1.5rem;
      list-style-type: disc;
      & li {
        margin: 0.5rem 0;
      }
    }
    :global(pre code) {
      background-color: #111;
      padding: 1rem;
      margin: 0.5rem 0;
      display: block;
      border-radius: 0.25rem;
      white-space: pre-wrap;
      color: #f8fff2;
    }
    :global code {
      background-color: #111;
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      color: #f8fff2;
    }
    :global(hr){
      border: none;
      border-top: 1px solid rgba(255, 255, 255, 0.2);
      margin: 1rem 0;
    }
  }
</style>
