// TODO: 对接后端报表中心 API，替换以下 mock 数据
// 数据来源：Figma 报表中心页 (207:143) — 请假管理 / 请假统计

// ========== 顶部 Tab ==========
export interface LeaveTab {
  id: string
  name: string
}

export const leaveTabs: LeaveTab[] = [
  { id: 'apply', name: '请假申请' },
  { id: 'shift', name: '调班申请' },
  { id: 'stats', name: '请假统计' },
]

// ========== 4 张 KPI 卡片 ==========
export interface LeaveKpiItem {
  title: string
  value: number
  unit: string
  /** 同比变化次数（正数 ↑ 红色升高，负数 ↓ 绿色下降，null 不显示） */
  trend: number | null
  /** 图标 key — 对应 public/reports-operation/icon-*.svg */
  iconKey: 'total' | 'ops' | 'power' | 'max'
}

export const leaveKpiData: LeaveKpiItem[] = [
  { title: '总请假次数', value: 18, unit: '次', trend: 5, iconKey: 'total' },
  { title: '运维岗总请假次数', value: 18, unit: '次', trend: -8, iconKey: 'ops' },
  { title: '电力岗总请假次数', value: 23, unit: '人', trend: 5, iconKey: 'power' },
  { title: '最多请假次数', value: 5, unit: '次', trend: null, iconKey: 'max' },
]

// ========== 请假分布卡片 ==========
/** 频率等级（语义色） */
export type LeaveLevel = 'danger' | 'warning' | 'info' | 'success'

export interface LeaveDistributionRow {
  level: LeaveLevel
  /** 行标题，如：请假3次以上 */
  title: string
  /** 副标题，如：请假频率较高 */
  subtitle: string
  /** 人员姓名列表（按设计稿宽度限制，多余的会被截断） */
  members: string[]
  /** 总人数（可与 members.length 不一致） */
  count: number
}

export interface LeaveDistributionGroup {
  /** 唯一 id */
  id: 'ops' | 'power'
  /** 卡片主标题 */
  title: string
  /** 卡片副标题 */
  subtitle: string
  /** 右上角装饰背景 */
  bgImage: string
  /** 4 行数据（依次：≥3次 / =3次 / =2次 / =1次） */
  rows: LeaveDistributionRow[]
}

export const leaveDistributionData: LeaveDistributionGroup[] = [
  {
    id: 'ops',
    title: '运维岗请假统计',
    subtitle: '按请假次数分布',
    bgImage: '/reports-operation/bg-ops.png',
    rows: [
      { level: 'danger', title: '请假3次以上', subtitle: '请假频率较高', members: ['张三', '杨十'], count: 2 },
      { level: 'warning', title: '请假3次', subtitle: '请假频率中等', members: ['张三', '张三', '杨十'], count: 3 },
      { level: 'info', title: '请假2次', subtitle: '请假频率一般', members: ['张三', '张三', '杨十', '张三', '杨十'], count: 5 },
      {
        level: 'success',
        title: '请假1次',
        subtitle: '请假频率较低',
        members: ['张三', '张三', '杨十', '张三', '张三', '杨十', '张三', '杨十'],
        count: 8,
      },
    ],
  },
  {
    id: 'power',
    title: '电力岗请假统计',
    subtitle: '按请假次数分布',
    bgImage: '/reports-operation/bg-power.png',
    rows: [
      { level: 'danger', title: '请假3次以上', subtitle: '请假频率较高', members: ['张三', '杨十'], count: 2 },
      { level: 'warning', title: '请假3次', subtitle: '请假频率中等', members: ['张三', '张三', '杨十'], count: 3 },
      { level: 'info', title: '请假2次', subtitle: '请假频率一般', members: ['张三', '张三', '杨十', '张三', '杨十'], count: 5 },
      {
        level: 'success',
        title: '请假1次',
        subtitle: '请假频率较低',
        members: ['张三', '张三', '杨十', '张三', '张三', '杨十', '张三', '杨十'],
        count: 8,
      },
    ],
  },
]
