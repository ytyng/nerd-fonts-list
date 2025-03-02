import {goto} from '$app/navigation'

export async function redirectJaDirOnce() {
  const localStorageKey = 'langRedirectedTime'

  const redirectedTime = window.localStorage.getItem(localStorageKey)

  if (redirectedTime && Date.now() - (3600 * 1000) < Number(redirectedTime)) {
    // 1時間以内にリダイレクト済み
    return false
  }

  if (window.navigator.language === 'ja' || window.navigator.language === 'ja-JP') {
    // ブラウザが日本語で
    if (!window.location.pathname.startsWith('/ja/')) {
      // 日本語ページにいない場合、リダイレクトさせる
      // console.log(`Redirecting to /ja${window.location.pathname}, Because the browser language is ${window.navigator.language}`)
      window.localStorage.setItem(localStorageKey, Date.now().toString())
      // window.location.href = '/ja' + window.location.pathname
      await goto('/ja' + window.location.pathname)
      return true
    }
  }
  return false
}
