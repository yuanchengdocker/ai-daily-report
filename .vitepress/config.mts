import { defineConfig, type DefaultTheme } from 'vitepress'
import { readdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// 获取所有日报文件（按日期倒序）
function getDailyReports(): string[] {
  const docsDir = resolve(__dirname, '../docs')
  
  try {
    const files = readdirSync(docsDir)
    const datePattern = /^\d{4}-\d{2}-\d{2}\.md$/
    return files
      .filter(file => datePattern.test(file))
      .map(file => file.replace('.md', ''))
      .sort((a, b) => b.localeCompare(a))
  } catch {
    return []
  }
}

// 自动生成侧边栏
function generateSidebar(): DefaultTheme.SidebarItem[] {
  const docsDir = resolve(__dirname, '../docs')
  
  let files: string[] = []
  try {
    files = readdirSync(docsDir)
  } catch {
    return []
  }
  
  // 过滤出 .md 文件
  const mdFiles = files.filter(file => file.endsWith('.md'))
  
  // 分类：日报文件（日期格式）和其他文件
  const dailyReports: DefaultTheme.SidebarItem[] = []
  const otherDocs: DefaultTheme.SidebarItem[] = []
  
  // 日期格式正则：YYYY-MM-DD
  const datePattern = /^\d{4}-\d{2}-\d{2}\.md$/
  
  mdFiles.forEach(file => {
    const fileName = file.replace('.md', '')
    
    if (datePattern.test(file)) {
      // 日报文件
      dailyReports.push({
        text: fileName,
        link: `/docs/${fileName}`
      })
    } else {
      // 其他文档 - 格式化标题
      const title = fileName
        .replace(/-/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase())
      otherDocs.push({
        text: title,
        link: `/docs/${fileName}`
      })
    }
  })
  
  // 日报按日期倒序排列（最新的在前）
  dailyReports.sort((a, b) => (b.text || '').localeCompare(a.text || ''))
  
  const sidebar: DefaultTheme.SidebarItem[] = []
  
  // 添加日报分组
  if (dailyReports.length > 0) {
    sidebar.push({
      text: '📰 AI 日报',
      collapsed: false,
      items: dailyReports
    })
  }
  
  // 添加其他文档分组
  if (otherDocs.length > 0) {
    sidebar.push({
      text: '📚 文档',
      collapsed: true,
      items: otherDocs
    })
  }
  
  return sidebar
}

// 获取最新日报链接
const dailyReports = getDailyReports()
const latestReportLink = dailyReports.length > 0 ? `/docs/${dailyReports[0]}` : '/docs/'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "AI 精选日报",
  description: "每日精选 AI 前沿资讯",
  
  // 排除 README.md
  srcExclude: ['**/README.md'],
  
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '📰 最新日报', link: latestReportLink }
    ],

    sidebar: generateSidebar(),

    socialLinks: [
      { icon: 'github', link: 'https://github.com/yuanchengdocker/ai-daily-report' }
    ],
    
    // 搜索
    search: {
      provider: 'local'
    },
    
    // 页脚
    footer: {
      message: '每日精选 AI 前沿资讯',
      copyright: '© 2025 AI 洞察日报'
    },
    
    // 文档页脚导航
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    
    // 大纲标题
    outlineTitle: '目录',
    
    // 最后更新时间
    lastUpdatedText: '最后更新'
  }
})
