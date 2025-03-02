import type {LayoutLoad} from '$lib/types'

export const prerender = true

export function entries() {
  return [
    {lang: '',},
    {lang: 'ja'},
  ]
}

export const load: LayoutLoad = async ({params}: { params: any }) => {
  return {
    lang: params.lang || ''
  }
}
