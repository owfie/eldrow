import fs from 'fs'

export const initializeWords = (): void => {
  const path = process.cwd()

  const filePath = path + '/swords.txt'
  const exportPath = path + '/words.ts'

  const words = fs.readFileSync(filePath, 'utf8').split('\n')

  fs.writeFileSync(exportPath, `export const words = ${JSON.stringify(words)}`)
}