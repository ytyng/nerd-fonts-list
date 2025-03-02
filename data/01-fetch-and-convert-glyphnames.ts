#!/usr/bin/env npx tsx
import { promises as fsPromises } from 'fs'

const url = 'https://raw.githubusercontent.com/ryanoasis/nerd-fonts/refs/heads/master/glyphnames.json'

interface InputGlyphData {
  char: string;
  code: string;
}

interface Glyph {
  name: string;
  char: string;
  code: string;
}

interface GlyphGroup {
  groupName: string;
  glyphs: Glyph[];
}

async function main(){
  // json を取得する
  const res = await fetch(url)
  const json = await res.json() as Record<string, InputGlyphData>
  // console.log(json)

  const resultTable: GlyphGroup[] = []
  const groupMap = new Map<string, GlyphGroup>()

  for (const [key, value] of Object.entries(json)) {
    if (key === 'METADATA') continue

    // key を - で分割し、グループ名とグリフ名に分ける
    const parts = key.split('-')
    if (parts.length < 2) continue

    const groupName = parts[0]
    const glyphName = parts.slice(1).join('-') // 残りの部分をグリフ名として結合

    // グループが存在しない場合は新しく作成
    if (!groupMap.has(groupName)) {
      groupMap.set(groupName, {
        groupName,
        glyphs: []
      })
    }

    // グループにグリフを追加
    const group = groupMap.get(groupName)
    if (group) {
      group.glyphs.push({
      name: glyphName,
      char: value.char,
      code: value.code
      })
    }
  }

  // MapからArrayに変換
  for (const group of groupMap.values()) {
    resultTable.push(group)
  }

  // 結果をファイルに書き込む
  const outputPath = new URL('../src/lib/glyphgroups.json', import.meta.url).pathname

  await fsPromises.writeFile(outputPath, JSON.stringify(resultTable, null))
  console.log(`結果を ${outputPath} に書き込みました`)
}

main()
