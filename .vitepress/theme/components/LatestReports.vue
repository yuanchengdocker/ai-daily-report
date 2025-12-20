<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

// 获取日报数据（从 data loader 传入）
const props = defineProps<{
  reports: Array<{
    date: string
    link: string
    title?: string
  }>
}>()

// 获取最新的 5 篇日报
const latestReports = computed(() => {
  return props.reports
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5)
})

// 格式化日期显示
function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    weekday: 'short'
  }
  return date.toLocaleDateString('zh-CN', options)
}
</script>

<template>
  <div class="latest-reports">
    <h2 class="section-title">📰 最新日报</h2>
    <div class="report-list">
      <a 
        v-for="report in latestReports" 
        :key="report.date"
        :href="report.link"
        class="report-card">
        <div class="report-date">{{ formatDate(report.date) }}</div>
        <div class="report-title">{{ report.title || `AI 日报 ${report.date}` }}</div>
        <div class="report-arrow">→</div>
      </a>
    </div>
    <div class="view-all">
      <a :href="latestReports[0].link" class="view-all-link">查看全部日报 →</a>
    </div>
  </div>
</template>

<style scoped>
.latest-reports {
  max-width: 900px;
  margin: 2rem auto;
  padding: 0 1.5rem;
}

.section-title {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-align: center;
  color: var(--vp-c-text-1);
}

.report-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.report-card {
  display: flex;
  align-items: center;
  padding: 1.2rem 1.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.25s ease;
  border: 1px solid transparent;
}

.report-card:hover {
  background: var(--vp-c-bg-elv);
  border-color: var(--vp-c-brand-1);
  transform: translateX(4px);
}

.report-date {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  min-width: 160px;
}

.report-title {
  flex: 1;
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.report-arrow {
  font-size: 1.2rem;
  color: var(--vp-c-brand-1);
  opacity: 0;
  transition: opacity 0.25s ease;
}

.report-card:hover .report-arrow {
  opacity: 1;
}

.view-all {
  text-align: center;
  margin-top: 1.5rem;
}

.view-all-link {
  display: inline-block;
  padding: 0.8rem 2rem;
  background: var(--vp-c-brand-1);
  color: white !important;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.25s ease;
}

.view-all-link:hover {
  background: var(--vp-c-brand-2);
  color: white !important;
  opacity: 0.9;
}

@media (max-width: 640px) {
  .report-card {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .report-date {
    min-width: auto;
  }
  
  .report-arrow {
    display: none;
  }
}
</style>

