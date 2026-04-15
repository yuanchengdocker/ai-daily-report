# ai-daily-report

「AI 精选日报」—— 每日精选 AI 前沿资讯站点,基于 VitePress 构建。追踪人工智能领域最新动态,覆盖大模型进展、学术研究、产业动态、数据与评测、工程实践等方向。

## 特性

- 每日一篇日报,按 `YYYY-MM-DD` 命名自动归档与排序
- 首页自动展示最新日报列表,侧边栏按日期倒序生成
- 纯 Markdown 写作,零后端依赖,可一键静态部署

## 目录结构

```
.
├── docs/                  # 日报正文,文件名格式: YYYY-MM-DD.md
├── .vitepress/
│   ├── config.mts         # 站点配置,含侧边栏自动生成
│   └── theme/             # 自定义主题与组件
├── index.md               # 首页
├── reports.data.ts        # VitePress 数据加载器,聚合日报列表
├── package.json
└── .nvmrc                 # Node 版本声明 (20)
```

## 本地开发

依赖环境:

- Node.js 20(建议配合 nvm / volta 使用 `.nvmrc`)
- Yarn 4(仓库已通过 `packageManager` 字段锁定版本)

```bash
# 安装依赖
yarn install

# 启动开发服务器
yarn docs:dev

# 构建静态站点
yarn docs:build

# 本地预览构建产物
yarn docs:preview
```

## 新增一篇日报

在 `docs/` 目录下新建 `YYYY-MM-DD.md`,例如 `docs/2026-04-15.md`,按模板写正文即可 —— 首页与侧边栏会自动刷新,无需改配置。

## 部署

构建产物位于 `.vitepress/dist`,可直接部署到 GitHub Pages、Vercel、Cloudflare Pages、Netlify 等任意静态托管平台。

## License

MIT
