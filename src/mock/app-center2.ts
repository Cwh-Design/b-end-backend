// TODO: 对接后端监控总览 API，替换以下 mock 数据
// 数据来源：Figma 应用中心页2 (220:519) + 截图实现版本

// ========== 监控总览 — 顶部 Tab（与右侧时间粒度切换不同，是分类筛选） ==========
export interface MonitorTab {
  id: string
  name: string
  count: number
}

export const monitorTabs: MonitorTab[] = [
  { id: 'all', name: '全部', count: 12320 },
  { id: 'infra', name: '基础设施', count: 7800 },
  { id: 'data', name: '数据层', count: 430 },
  { id: 'platform', name: '平台层', count: 450 },
  { id: 'service', name: '服务层', count: 130 },
  { id: 'unassigned', name: '未分配', count: 1604 },
]

// ========== 时间粒度切换 ==========
export type TimeRange = '1h' | '12h' | '24h' | 'all'

export const timeRangeOptions: ReadonlyArray<{ value: TimeRange; label: string }> = [
  { value: '1h', label: '1小时' },
  { value: '12h', label: '12小时' },
  { value: '24h', label: '24小时' },
  { value: 'all', label: '全部' },
] as const

// ========== KPI 4 张卡片 ==========
export interface MonitorKpi {
  title: string
  value: number
  unit?: string
  trend: number // 正数 ↑（红），负数 ↓（绿）
  iconKey: 'total' | 'coverage' | 'alert' | 'alert-rate'
}

export const monitorKpis: MonitorKpi[] = [
  { title: '对象总数(个)', value: 12320, trend: 15, iconKey: 'total' },
  { title: '监控覆盖率', value: 92, unit: '%', trend: -8, iconKey: 'coverage' },
  { title: '告警对象数(个)', value: 50, trend: 12, iconKey: 'alert' },
  { title: '告警对象比率', value: 12320, trend: -5, iconKey: 'alert-rate' },
]

// ========== 监控概览 — 漏斗图数据 ==========
export const monitorFunnel = {
  totalObjects: 12320,
  monitored: 10320,
  coverage: 92, // 92 %
  alertCount: 50,
  alertRate: 0.72, // 0.72 %
}

// ========== 资源概览 — 柱状图数据 ==========
export interface ResourceBarPoint {
  category: string
  total: number
  monitored: number
}

export const resourceBars: ResourceBarPoint[] = [
  { category: '基础设施', total: 40, monitored: 30 },
  { category: '数据层', total: 60, monitored: 45 },
  { category: '平台层', total: 95, monitored: 70 },
  { category: '服务层', total: 80, monitored: 60 },
  { category: '未分配', total: 40, monitored: 30 },
]

// ========== 告警按应用分布 / 告警按对象分布 ==========
export interface AlertByItem {
  index: number
  deptName: string
  /** 应用名称 / 对象名称 */
  itemName: string
  /** 应用数 / 对象数 */
  count: number
}

export const alertByApp: AlertByItem[] = [
  { index: 1, deptName: '技术部', itemName: '某某应用', count: 245 },
  { index: 2, deptName: '运维部', itemName: '某某应用', count: 200 },
  { index: 3, deptName: '产品部', itemName: '某某应用', count: 168 },
]

export const alertByObject: AlertByItem[] = [
  { index: 1, deptName: '技术部', itemName: '某某对象', count: 200 },
  { index: 2, deptName: '运维部', itemName: '某某对象', count: 145 },
  { index: 3, deptName: '产品部', itemName: '某某对象', count: 120 },
]

// ========== Banner 内的系统通知（横向滚动） ==========
export const systemNotifications: string[] = [
  '系统将于今晚 23:00 进行例行维护',
  '新版本 v2.5.0 已上线，欢迎体验',
  '告警规则已更新',
  '近 24 小时新增对象 15 个',
  '请及时处理 P1 级告警',
  '点击查看更多通知',
]
