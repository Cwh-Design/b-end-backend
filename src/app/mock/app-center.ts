// TODO: 对接后端应用中心 API，替换以下 mock 数据
// 数据来源：Figma 应用中心页1 (213:33113)

// ========== 顶部筛选条 — 状态/分组下拉选项 ==========
export const statusOptions = ['全部状态', '正常', '警告', '严重']
export const groupOptions = [
  '全部分组',
  'WEB服务器组',
  '缓存组',
  '应用服务器组',
  '数据库组',
  '备份服务器组',
]

// ========== 巡检概览 — 5 张统计卡 ==========
export interface OverviewStatItem {
  /** 标题 */
  title: string
  /** 数值 */
  value: number
  /** 较上周期百分比变化（正数 ↑，负数 ↓） */
  trend: number
  /** 状态色调：决定右上角图标和数字色 */
  tone: 'primary' | 'success' | 'warning' | 'critical'
}

/** 巡检概览数据（覆盖周期 2025-05-13 ~ 2025-05-20） */
export const overviewPeriod = '2025-05-13 至 2025-05-20'

export const overviewStats: OverviewStatItem[] = [
  { title: '巡检服务器', value: 128, trend: 15, tone: 'primary' },
  { title: '巡检任务', value: 32, trend: -8, tone: 'primary' },
  { title: '正常', value: 96, trend: -4, tone: 'success' },
  { title: '警告', value: 24, trend: 12, tone: 'warning' },
  { title: '严重', value: 8, trend: -8, tone: 'critical' },
]

// ========== 左下：服务器列表 ==========
export type ServerStatus = 'normal' | 'warning' | 'critical'

export interface ServerItem {
  id: string
  name: string
  ip: string
  group: string
  status: ServerStatus
}

export const serverList: ServerItem[] = [
  { id: 'web-01', name: 'web-01', ip: '192.168.1.103', group: 'WEB服务器组', status: 'normal' },
  { id: 'db-01', name: 'db-01', ip: '192.168.1.103', group: '缓存组', status: 'warning' },
  { id: 'cache-01', name: 'cache-01', ip: '192.168.1.103', group: '应用服务器组', status: 'normal' },
  { id: 'app-01', name: 'app-01', ip: '192.168.1.103', group: '数据库组', status: 'critical' },
  { id: 'backup-01', name: 'backup-01', ip: '192.168.1.103', group: '备份服务器组', status: 'normal' },
]

// ========== 右下：诊断面板（多分组折叠） ==========
export interface DiagnosisRow {
  /** 诊断内容（行标题） */
  content: string
  /** 诊断结果状态 */
  result: ServerStatus
  /** 异常信息（无异常用 -- 表示） */
  abnormal: string
  /** 指标值 */
  metric: string
  /** 7 天趋势点（用于行末尾的小折线缩略图） */
  trendPoints: number[]
}

export interface DiagnosisGroup {
  /** 分组标题 */
  name: string
  /** 已读/告警 计数（左：蓝色未读小数；右：红色告警数） */
  unread: number
  alerts: number
  /** 行数据；为空时表示该组当前没有展开后的明细 */
  rows: DiagnosisRow[]
}

/** 服务器维度 → 诊断分组明细 */
export const diagnosisByServer: Record<string, DiagnosisGroup[]> = {
  'cache-01': [
    {
      name: '监控指标',
      unread: 5,
      alerts: 3,
      rows: [
        {
          content: '系统运行处于高水位',
          result: 'normal',
          abnormal: '--',
          metric: '60%',
          trendPoints: [40, 55, 35, 60, 50, 65, 60],
        },
        {
          content: '内存使用率过高',
          result: 'normal',
          abnormal: '--',
          metric: '60%',
          trendPoints: [50, 45, 55, 60, 50, 70, 60],
        },
        {
          content: '锁等待异常',
          result: 'critical',
          abnormal: '--',
          metric: '60%',
          trendPoints: [30, 60, 50, 75, 65, 55, 60],
        },
        {
          content: '容量不足',
          result: 'normal',
          abnormal: '--',
          metric: '60%',
          trendPoints: [45, 50, 60, 55, 70, 60, 60],
        },
      ],
    },
    { name: '告警信息', unread: 5, alerts: 3, rows: [] },
    { name: '故障信息', unread: 5, alerts: 3, rows: [] },
    { name: '合规性', unread: 5, alerts: 3, rows: [] },
    { name: '告警信息', unread: 5, alerts: 3, rows: [] },
  ],
}
