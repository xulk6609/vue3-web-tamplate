require 'write_xlsx'

def get_kv(path)
  file_content = File.read(path)
  map = {}
  file_content.each_line do |line|
    if line.include?(":")
      key, value = line.split(":", 2).map(&:strip)
      if value.match(/^['"]/)
        value = value.match(/^['"](.*?)['"]/)[1]
      end
      unless value.to_s.include?("{")
        map[key] = value
      end
    end
  end
  map
end

def main(target_folder)
  workbook = WriteXLSX.new("#{Dir.pwd}/bin/language.xlsx")
  worksheet = workbook.add_worksheet

  worksheet.write(0, 0, ["Key(开发人员编写)", "中文", "英文", "西班牙(es)", "葡萄牙(br)"])

  files = {
    'zh' => "#{target_folder}/zh.ts",
    'en' => "#{target_folder}/en.ts",
    'es' => "#{target_folder}/es.ts",
    'br' => "#{target_folder}/br.ts"
  }

  results = {}
  files.each do |short, path|
    results[short] = get_kv(path)
  end

  row = 1
  results['zh'].each do |key, value|
    worksheet.write(row, 0, key)
    worksheet.write(row, 1, value)
    worksheet.write(row, 2, results['en'][key] || '')
    worksheet.write(row, 3, results['es'][key] || '')
    worksheet.write(row, 4, results['br'][key] || '')
    row += 1
  end
  
  workbook.close
end

Dir.chdir("..")
target_folder = "#{Dir.pwd}/src/language/modules/"

main(target_folder)