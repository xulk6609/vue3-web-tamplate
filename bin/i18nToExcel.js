const fs = require('fs')
const xlsx = require('xlsx')
const path = require('path')

function getKv(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const map = {}
  const lines = fileContent.split('\n')

  lines.forEach((line) => {
    if (line.includes(':')) {
      let [key, value] = line.split(':', 2).map((item) => item.trim())

      // 如果值是以引号包裹的，则去掉引号
      const match = value.match(/^['"](.*?)['"]/)
      if (match) {
        value = match[1] // 只有匹配成功才取出值
      }

      // 排除值中包含 `{` 的行
      if (!value.toString().includes('{')) {
        map[key] = value
      }
    }
  })

  return map
}

function main(targetFolder) {
  // 创建一个新的工作簿
  const workbook = xlsx.utils.book_new()
  const worksheetData = [
    ['Key(开发人员编写)', '中文', '英文', '西班牙(es)', '葡萄牙(br)']
  ]

  const files = {
    zh: path.join(targetFolder, 'zh.ts'),
    en: path.join(targetFolder, 'en.ts'),
    es: path.join(targetFolder, 'es.ts'),
    br: path.join(targetFolder, 'br.ts')
  }

  const results = {}
  for (const [short, filePath] of Object.entries(files)) {
    results[short] = getKv(filePath)
  }

  // 收集所有行
  Object.keys(results['zh']).forEach((key, index) => {
    const row = [
      key,
      results['zh'][key] || '',
      results['en'][key] || '',
      results['es'][key] || '',
      results['br'][key] || ''
    ]
    worksheetData.push(row)
  })

  // 创建一个工作表
  const worksheet = xlsx.utils.aoa_to_sheet(worksheetData)
  xlsx.utils.book_append_sheet(workbook, worksheet, 'Language Data')

  // 将工作簿写入文件
  const outputPath = path.join(__dirname, './languages1.xlsx')
  xlsx.writeFile(workbook, outputPath)

  console.log('✅ 语言文件写入完成: ' + outputPath)
}

const targetFolder = path.join(__dirname, '../src/language/modules')
main(targetFolder)
