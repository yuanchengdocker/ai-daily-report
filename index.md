---
layout: home

hero:
  name: "AI 洞察日报"
  text: "每日精选 AI 前沿资讯"
  tagline: 追踪人工智能领域最新动态，洞察技术趋势与行业变革
  image:
    src: https://api.iconify.design/fluent-emoji:robot.svg
    alt: AI Robot
  # actions:
  #   - theme: brand
  #     text: 📰 查看最新日报
  #     link: /docs/2025-12-20
  #   - theme: alt
  #     text: 📚 浏览全部日报
  #     link: /docs/2025-12-17

features:
  - icon: 🤖
    title: 大模型前沿
    details: 跟踪 GPT、Claude、Gemini 等主流大模型的最新进展，解读技术突破与应用创新
  - icon: 📊
    title: 数据与基准
    details: 关注开源数据集、评测基准和行业标准，助力 AI 研究与开发
  - icon: 🔬
    title: 学术研究
    details: 解读顶会论文和突破性研究成果，把握 AI 技术发展脉络
  - icon: 🚀
    title: 产业动态
    details: 追踪 AI 公司融资、产品发布和商业落地，洞察行业趋势
  - icon: 💡
    title: 技术实践
    details: 分享 AI 工程最佳实践，助力开发者提升效率
  - icon: 🌍
    title: 全球视野
    details: 汇聚全球 AI 资讯，提供多元化的技术视角
---

<script setup>
import { data as reports } from './reports.data.ts'
</script>

<LatestReports :reports="reports" />

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff);
  --vp-home-hero-image-background-image: linear-gradient(-45deg, #bd34fe 50%, #47caff 50%);
  --vp-home-hero-image-filter: blur(44px);
}

.VPHero .image-bg {
  opacity: 0.8;
}
</style>
