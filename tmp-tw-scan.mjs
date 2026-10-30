import fs from 'fs'
import path from 'path'
import { __unstable__loadDesignSystem } from '@tailwindcss/node'

function walk (dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name)
    if (ent.isDirectory()) walk(p, out)
    else if (/\.(js|jsx|css)$/.test(ent.name)) out.push(p)
  }
  return out
}

const files = walk('src')
const css = fs.readFileSync('src/app/globals.css', 'utf8')
const ds = await __unstable__loadDesignSystem(css, { base: process.cwd() })
const classSet = new Set()
const re = /(?:className|class)=(?:\{)?[`'"]([^`'"]+)[`'"]/g

for (const file of files) {
  const text = fs.readFileSync(file, 'utf8')
  let match
  while ((match = re.exec(text))) {
    for (const token of match[1].split(/\s+/)) {
      if (!token || token.includes('$') || token.includes('{')) continue
      classSet.add(token)
    }
  }
}

const classes = [...classSet]
const cssOut = ds.candidatesToCss(classes)
const invalid = []
classes.forEach((name, index) => {
  if (cssOut[index] == null) invalid.push(name)
})

const canon = ds.canonicalizeCandidates(classes)
const renamed = []
classes.forEach((name, index) => {
  if (canon[index] && canon[index] !== name) renamed.push(name + ' => ' + canon[index])
})

const must = [
  'text-brand-red',
  'bg-brand-red',
  'bg-brand-red/10',
  'bg-brand-red/20',
  'bg-brand-red/30',
  'border-brand-red',
  'border-brand-red/30',
  'hover:bg-brand-red/20',
  'bg-card-gradient',
  'bg-hero-gradient',
  'bg-linear-to-b',
  'bg-linear-to-r',
  'aspect-2/3',
  'group',
  'group-hover:opacity-100',
  'group-hover:scale-105'
]
const mustCss = ds.candidatesToCss(must)
console.log('MUST')
must.forEach((name, index) => {
  console.log(mustCss[index] == null ? 'MISSING ' + name : 'OK ' + name)
  if (mustCss[index]) console.log(mustCss[index])
})
console.log('CLASS_COUNT', classes.length)
console.log('INVALID')
console.log(invalid.sort().join('\n') || 'none')
console.log('RENAMED')
console.log(renamed.sort().join('\n') || 'none')
