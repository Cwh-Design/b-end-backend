import type { AppIconKey } from '@/components/app-favorites'
import type { RecentItemKey } from '@/components/recent-list'
import type { TodoItemData } from '@/components/todo-list'

// TODO: 对接后端统计 API，替换以下 mock 数据

// ========== WelcomeCard Mock 数据 ==========
export interface WelcomeData {
  userName: string
  organization: string
  roleName: string
  securityLevel: string
  avatarUrl?: string
}

export const welcomeData: WelcomeData = {
  userName: '陈汶浩',
  organization: '北京海联捷讯股份有限公司  I  某某项目组',
  roleName: '项目组管理员',
  securityLevel: '中等',
  // avatarUrl: undefined 表示使用首字头像
}

// ========== ProcessStatsCard Mock 数据 ==========
export interface ProcessStatsItem {
  title: string
  value: number
  trend: number
  trendLabel: string
  valueColor: string
  illustrationBg: string
}

/**
 * 流程统计卡片数据
 *
 * 对应 Figma 工作台页右侧 5 张流程统计卡片：
 * 我发起的 / 待处理 / 已退回 / 已撤回 / 消息通知
 */
export const processStats: ProcessStatsItem[] = [
  {
    title: '我发起的',
    value: 40,
    trend: -5,
    trendLabel: '较昨日',
    valueColor: '#0274ff',
    illustrationBg: '#e8f4ff',
  },
  {
    title: '待处理',
    value: 36,
    trend: 12,
    trendLabel: '较昨日',
    valueColor: '#fe9717',
    illustrationBg: '#fff4e8',
  },
  {
    title: '已退回',
    value: 10,
    trend: -4,
    trendLabel: '较昨日',
    valueColor: '#f7320d',
    illustrationBg: '#ffe8e4',
  },
  {
    title: '已撤回',
    value: 8,
    trend: 8,
    trendLabel: '较昨日',
    valueColor: '#03b6c2',
    illustrationBg: '#e4fafb',
  },
  {
    title: '消息通知',
    value: 20,
    trend: -10,
    trendLabel: '较昨日',
    valueColor: '#0699fc',
    illustrationBg: '#e4f2ff',
  },
]

// ========== AppFavorites Mock 数据 ==========
/**
 * 应用收藏列表
 *
 * 对应 Figma 工作台页"应用收藏"区域，横向排列的应用图标卡片
 */
export interface FavoriteAppData {
  name: string
  iconKey: AppIconKey
  bgColor?: string
}

export const favoriteAppsData: FavoriteAppData[] = [
  { name: '表格', iconKey: 'table' },
  { name: '应用', iconKey: 'app' },
  { name: '财务', iconKey: 'finance' },
  { name: '销售', iconKey: 'sales' },
  { name: '招投标', iconKey: 'contract' },
  { name: '研发', iconKey: 'dev' },
  { name: '销售', iconKey: 'sales' },
  { name: '招投标', iconKey: 'contract' },
  { name: '研发', iconKey: 'dev' },
]

// ========== RecentList Mock 数据 ==========
/**
 * 最近使用列表
 *
 * 对应 Figma 工作台页"最近使用"区域，4 列网格展示
 */
export interface RecentItemMockData {
  title: string
  time: string
  iconKey: RecentItemKey
  iconBg?: string
  iconColor?: string
  active?: boolean
}

export const recentItemsData: RecentItemMockData[] = [
  { title: '个人总结报告', time: '10分钟前', iconKey: 'file', iconBg: '#f5f7fa', iconColor: '#64748b' },
  { title: '合同审批表单', time: '30分钟前', iconKey: 'contract', iconBg: '#f5f7fa', iconColor: '#64748b' },
  { title: '人员入职档案', time: '1小时前', iconKey: 'user', iconBg: '#f5f7fa', iconColor: '#64748b' },
  { title: '第一季度销售报表', time: '2小时前', iconKey: 'chart', iconBg: '#f5f7fa', iconColor: '#64748b' },
  { title: '人员入职档案', time: '今天9:30', iconKey: 'user', iconBg: '#f5f7fa', iconColor: '#64748b' },
  { title: '差旅报销申请', time: '今天10:25', iconKey: 'receipt', iconBg: '#f5f7fa', iconColor: '#64748b' },
  { title: '第一季度销售报表', time: '今天13:25', iconKey: 'chart', iconBg: '#f5f7fa', iconColor: '#64748b' },
  { title: '合同审批表单', time: '今天15:30', iconKey: 'contract', iconBg: '#f5f7fa', iconColor: '#64748b' },
  { title: '第一季度销售报表', time: '今天16:50', iconKey: 'chart', iconBg: '#f5f7fa', iconColor: '#64748b' },
  { title: '差旅报销申请', time: '昨天10:25', iconKey: 'receipt', iconBg: '#f5f7fa', iconColor: '#64748b' },
  { title: '合同审批表单', time: '昨天09:25', iconKey: 'contract' },
  { title: '固定资产盘点', time: '昨天10:50', iconKey: 'package', iconBg: '#f5f7fa', iconColor: '#64748b' },
  { title: '固定资产盘点', time: '昨天16:25', iconKey: 'package', iconBg: '#f5f7fa', iconColor: '#64748b' },
  { title: '人员入职档案', time: '昨天18:55', iconKey: 'user', iconBg: '#f5f7fa', iconColor: '#64748b' },
  { title: '合同审批表单', time: '2026-05-25', iconKey: 'contract', iconBg: '#f5f7fa', iconColor: '#64748b' },
  { title: '差旅报销申请', time: '2026-05-25', iconKey: 'receipt', iconBg: '#f5f7fa', iconColor: '#64748b' },
]

// ========== TodoList Mock 数据 ==========
/**
 * 我的待办列表
 *
 * 对应 Figma 工作台页右侧"我的代办"区域
 * 支持 Tab 筛选：全部 / 待处理(15) / 退回(15) / 撤回
 */
export const todoItemsData: TodoItemData[] = [
  {
    title: '测试应用 - 附件导入功能验收测试',
    description: '关于大数据运维门户的测试工作审批流程，关于大数据运维门户的测试工作审批流程，关于大多数...',
    status: 'pending',
    submitter: '范贤平',
    time: '2022-06-09  14:00:00',
  },
  {
    title: '流程问题-001：无法提交表单',
    description: '关于大数据运维门户的测试工作审批流程，关于大数据运维门户的测试工作审批流程，关于大多数...',
    status: 'pending',
    submitter: '范贤平',
    time: '2022-06-09  14:00:00',
  },
  {
    title: '[退回] 采购预算表 - 请补充发票明细',
    description: '关于大数据运维门户的测试工作审批流程，关于大数据运维门户的测试工作审批流程，关于大多数...',
    status: 'returned',
    submitter: '范贤平',
    time: '2022-06-09  14:00:00',
  },
  {
    title: '2026年度部门招聘计划审批',
    description: '关于大数据运维门户的测试工作审批流程，关于大数据运维门户的测试工作审批流程，关于大多数...',
    status: 'pending',
    submitter: '范贤平',
    time: '2022-06-09  14:00:00',
  },
  {
    title: '测试运用 · 测试工作流',
    description: '关于大数据运维门户的测试工作审批流程，关于大数据运维门户的测试工作审批流程，关于大多数...',
    status: 'pending',
    submitter: '范贤平',
    time: '2022-06-09  14:00:00',
  },
]
