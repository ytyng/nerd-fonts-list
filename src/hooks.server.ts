import type {RequestEvent} from "@sveltejs/kit"

export async function handle({event, resolve}) {

  const lang = determineLang(event)

  return await resolve(event, {
    transformPageChunk: ({html}) => {
      // htmlタグのlang属性を書き換え
      return html.replace('<html lang="%lang%">', `<html lang="${lang}">`)
    }
  })
}


function determineLang(event: RequestEvent) {
  // パスから言語を取得
  const path = event.url.pathname
  if (path.startsWith('/ja/')) {
    return 'ja'
  }

  // デフォルト言語
  return 'en'
}
