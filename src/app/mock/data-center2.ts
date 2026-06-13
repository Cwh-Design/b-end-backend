// TODO: 对接后端云资源管理 API，替换以下 mock 数据
// 数据来源：Figma 数据中心页2 (181:24527)

// ========== 顶部统计卡片 ==========
export interface TopStatCard {
  title: string
  value: number
  /** 图标 key，对应 public/data-center2/ 下的 SVG 切图 */
  iconKey: 'tenant' | 'cloud-app' | 'idle' | 'bottleneck' | 'recycle'
}

/** 顶部 5 张统计卡片 */
export const topStatCards: TopStatCard[] = [
  { title: '服务器总租户', value: 245, iconKey: 'tenant' },
  { title: '上云应用数', value: 145, iconKey: 'cloud-app' },
  { title: '资源闲置数', value: 245, iconKey: 'idle' },
  { title: '资源瓶颈数', value: 220, iconKey: 'bottleneck' },
  { title: '资源待回收数', value: 128, iconKey: 'recycle' },
]

// ========== 资源使用（CPU / 内存 / 存储）==========
export interface ResourceUsageItem {
  /** 资源类型 */
  type: 'cpu' | 'memory' | 'storage'
  /** 标题（如 CPU） */
  title: string
  /** 单位（如 核、GB、TB） */
  unit: string
  /** 已申请数量 */
  applied: number
  /** 近 7 天平均利用率（0-100） */
  utilization: number
}

/** 3 张资源使用卡片 */
export const resourceUsageData: ResourceUsageItem[] = [
  {
    type: 'cpu',
    title: 'CPU',
    unit: '核',
    applied: 1000,
    utilization: 12.3,
  },
  {
    type: 'memory',
    title: '内存',
    unit: 'GB',
    applied: 2000,
    utilization: 50.2,
  },
  {
    type: 'storage',
    title: '存储',
    unit: 'TB',
    applied: 7.81,
    utilization: 78.4,
  },
]

// ========== 资源实例统计 ==========
export interface InstanceCountItem {
  /** 资源类型 */
  type: 'vm' | 'disk' | 'eip' | 'vpc'
  /** 显示名称 */
  name: string
  /** 实例数量 */
  count: number
}

/** 资源实例统计 — 卡片网格 */
export const instanceCountData: InstanceCountItem[] = [
  { type: 'vm', name: '虚拟机', count: 8 },
  { type: 'disk', name: '云硬盘', count: 10 },
  { type: 'eip', name: '弹性IP', count: 20 },
  { type: 'vpc', name: '虚拟私有云', count: 5 },
  { type: 'vm', name: '虚拟机', count: 8 },
  { type: 'disk', name: '云硬盘', count: 10 },
  { type: 'eip', name: '弹性IP', count: 20 },
  { type: 'vpc', name: '虚拟私有云', count: 5 },
  { type: 'vm', name: '虚拟机', count: 8 },
  { type: 'disk', name: '云硬盘', count: 10 },
  { type: 'eip', name: '弹性IP', count: 20 },
  { type: 'vpc', name: '虚拟私有云', count: 5 },
]

// ========== 配额使用概览 ==========
export interface QuotaRow {
  /** 维度名称（实例数、CPU、内存） */
  label: string
  /** 已使用 */
  used: number
  /** 已分配 */
  allocated: number
  /** 总配额 */
  quota: number
}

export interface QuotaGroup {
  /** 分组标签（虚拟机 / 弹性IP / 分布式块存储） */
  label: string
  /** 该分组下的三行进度（实例数 / CPU / 内存） */
  rows: QuotaRow[]
}

/** 3 列配额分组 */
export const quotaGroupsData: QuotaGroup[] = [
  {
    label: '虚拟机',
    rows: [
      { label: '实例数', used: 280, allocated: 3000, quota: 10000 },
      { label: 'CPU', used: 280, allocated: 3000, quota: 60000 },
      { label: '内存', used: 280, allocated: 3000, quota: 100000 },
    ],
  },
  {
    label: '弹性IP',
    rows: [
      { label: '实例数', used: 280, allocated: 3000, quota: 10000 },
      { label: 'CPU', used: 280, allocated: 3000, quota: 60000 },
      { label: '内存', used: 280, allocated: 3000, quota: 100000 },
    ],
  },
  {
    label: '分布式块存储',
    rows: [
      { label: '实例数', used: 280, allocated: 3000, quota: 10000 },
      { label: 'CPU', used: 280, allocated: 3000, quota: 60000 },
      { label: '内存', used: 280, allocated: 3000, quota: 100000 },
    ],
  },
]
