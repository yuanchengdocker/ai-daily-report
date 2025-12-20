import { readdirSync, readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export interface Report {
  date: string
  link: string
  title: string
  summary?: string
}

declare const data: Report[]
export { data }

export default {
  watch: ['./docs/*.md'],
  load(): Report[] {
    const docsDir = resolve(__dirname, './docs')
    
    let files: string[] = []
    try {
      files = readdirSync(docsDir)
    } catch {
      return []
    }
    
    // 只匹配日期格式的文件 YYYY-MM-DD.md
    const datePattern = /^\d{4}-\d{2}-\d{2}\.md$/
    const mdFiles = files.filter(file => datePattern.test(file))
    
    const reports: Report[] = mdFiles.map(file => {
      const date = file.replace('.md', '')
      const filePath = resolve(docsDir, file)
      
      // 读取文件获取标题
      let title = `AI 日报 ${date}`
      try {
        const content = readFileSync(filePath, 'utf-8')
        // 尝试从文件中提取标题
        const titleMatch = content.match(/^#\s+(.+)/m)
        if (titleMatch) {
          title = titleMatch[1].replace(/\*\*/g, '')
        }
      } catch {
        // 使用默认标题
      }
      
      return {
        date,
        link: `/docs/${date}`,
        title
      }
    })
    
    // 按日期倒序排列
    return reports.sort((a, b) => b.date.localeCompare(a.date))
  }
}

