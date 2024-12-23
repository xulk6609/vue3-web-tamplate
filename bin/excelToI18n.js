const fs = require('fs-extra')
const xlsx = require('xlsx')
const path = require('path')

// 去除特殊字符
function removeSpecialCharacters(text) {
  return text.replace(/[^a-zA-Z\s]/g, '')
}

// 转换为 camelCase
function camelCase(text) {
  const words = text.split(' ')
  return words
    .map((word, index) =>
      index === 0
        ? word.toLowerCase()
        : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join('')
}

// 截断为最多 max_words 个单词
function truncateWords(text, maxWords) {
  const words = text.split(' ')
  return words.slice(0, maxWords).join(' ')
}

// 生成 key
function generateKey(value) {
  if (!value) return ''
  const cleanedText = removeSpecialCharacters(value)
  const truncatedText = truncateWords(cleanedText, 4)
  const camelCasedText = camelCase(truncatedText)
  return camelCasedText
}

// 读取 Excel 文件
function readExcel(filename) {
  const workbook = xlsx.readFile(filename)
  const sheet = workbook.Sheets[workbook.SheetNames[0]]
  const data = xlsx.utils.sheet_to_json(sheet, { header: 1, defval: '' })

  console.log('▶️ 读取数据, 从第二行开始，取前 5 列')
  const rows = data.slice(1) // 跳过表头
  return rows.map((row) => {
    let obj = {}
    row.forEach((cell, index) => {
      if (index === 0 && !cell) {
        const enCellValue = row[2]
        const key = generateKey(enCellValue)
        console.log(`❗️en="${enCellValue}" 自动生成: ${key} ✅`)
        obj['key'] = key
      } else if (index === 0) {
        obj['key'] = cell
      } else {
        const languages = ['zh', 'en', 'es', 'br']
        obj[languages[index - 1]] = cell
      }
    })
    return obj
  })
}

// 写入语言文件
function writeLanguageFile(content, outputDir, languageCode) {
  const filePath = path.join(outputDir, `${languageCode}.ts`)
  console.log(`▶️ 写入文件: ${filePath}`)
  fs.outputFileSync(filePath, `export default {\n${content}\n}`)
}

// 根据语言代码生成语言内容
function generateLanguageContent(sortedData, languageCode) {
  return sortedData
    .map((value) => `  ${value.key}: "${value[languageCode]}",`)
    .join('\n')
}

// 读取并处理 Excel 文件，返回去重并排序后的数据
function readAndProcessExcel(filename) {
  const rows = readExcel(filename)

  // 去重
  const uniqueKeys = new Set()
  const uniqueSortedData = []

  rows.forEach((item) => {
    if (!uniqueKeys.has(item.key)) {
      uniqueSortedData.push(item)
      uniqueKeys.add(item.key)
    }
  })

  // 排序
  return uniqueSortedData.sort((a, b) => a.key.localeCompare(b.key))
}

// 写入所有语言文件
function writeLanguageFiles(sortedData, outputDir) {
  const languages = ['br', 'en', 'zh', 'es']
  languages.forEach((language) => {
    const content = generateLanguageContent(sortedData, language)
    writeLanguageFile(content, outputDir, language)
  })
}

function main() {
  console.log('▶️ 准备翻译 Excel 文档数据')
  const filename = 'languages.xlsx'
  const outputDir = path.join(__dirname, '../src/language/modules')

  const sortedData = readAndProcessExcel(filename)
  console.log('▶️ 读取 sortedData 信息')
  writeLanguageFiles(sortedData, outputDir)
  console.log('▶️ 写入多语言文件')
  console.log('写入完成 ✅')
}

main()
