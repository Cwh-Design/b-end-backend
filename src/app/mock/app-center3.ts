// TODO: 对接统一运维平台 API；当前数值参照 Figma 应用中心页3 (238:781) 截图
// 资源统计 9 项 / 告警统计 4 项 / 列表统计 5 行（树形）

// ========== 资源统计：9 个磁贴 ==========
export interface ResourceTile {
  /** 资源类型名 */
  name: string
  /** 数值 */
  value: number
  /** 图标素材路径（public/app-center3/） */
  icon: string
  /** 单位 */
  unit?: string
}

export const resourceTiles: ResourceTile[] = [
  { name: '服务器', value: 231, icon: '/app-center3/icon-server.png' },
  { name: '网络设备', value: 21, icon: '/app-center3/icon-network.png' },
  { name: '数据库', value: 4, icon: '/app-center3/icon-database.png' },
  { name: '虚拟机', value: 2, icon: '/app-center3/icon-vm.png' },
  { name: '存储设备', value: 120, icon: '/app-center3/icon-storage.png' },
  { name: '中间件', value: 8, icon: '/app-center3/icon-middleware.png' },
  { name: '动环设备', value: 8, icon: '/app-center3/icon-power.png' },
  { name: '安全设备', value: 120, icon: '/app-center3/icon-security-device.png' },
  { name: '应用软件', value: 6, icon: '/app-center3/icon-app.png' },
]

// ========== 告警统计：环形图 + 4 行图例 ==========
export interface AlertSegment {
  /** 等级名 */
  label: string
  /** 数量 */
  count: number
  /** 占比（百分比，已计算好） */
  percent: number
  /** 圆点/弧段颜色 */
  color: string
}

/** 中心总数 */
export const alertTotal = 22

export const alertSegments: AlertSegment[] = [
  { label: '紧急', count: 62, percent: 25.5, color: '#ee1a20' },
  { label: '严重', count: 36, percent: 18.5, color: '#fa8306' },
  { label: '警告', count: 73, percent: 30.5, color: '#f5c021' },
  { label: '提示', count: 10, percent: 14.5, color: '#0274ff' },
]

// ========== 列表统计：树形行（截图：3 个顶级 + 2 个子级，行首竖条按颜色分类） ==========
export type ListRowColor = 'blue' | 'purple' | 'green'

export interface ListRow {
  /** 用于 React key */
  id: string
  /** Method 列文本（截图占位 VNode: ec54fc0f-…） */
  method: string
  /** Start Time 列文本 */
  startTime: string
  /** Exec(ms) 进度条数值（0~maxExec） */
  execMs: number
  /** Exec(%) 数值（数字本身，截图均为 10152，应为时间值复用） */
  execPercent: number
  /** Self(ms) 数值 */
  selfMs: number
  /** API 列文本 */
  api: string
  /** Service 列文本 */
  service: string
  /** Attached Events 数 */
  attachedEvents: number
  /** 行首竖条颜色 */
  color: ListRowColor
  /** 树形层级缩进 0|1|2 */
  level: number
}

/** 进度条最大值（用于按比例渲染条形宽度） */
export const listExecMax = 10152

export const listRows: ListRow[] = [
  {
    id: 'row-1',
    method: 'VNode: ec54fc0f-d713-4b30-b9dd-c24f2f6b9333',
    startTime: '2025-12-29 08:59:21',
    execMs: 6500,
    execPercent: 10152,
    selfMs: 0,
    api: 'VirtualNode: #0',
    service: 'VirtualNode',
    attachedEvents: 0,
    color: 'blue',
    level: 0,
  },
  {
    id: 'row-2',
    method: 'VNode: ec54fc0f-d713-4b30-b9dd-c24f2f6b9333',
    startTime: '2025-12-29 08:59:21',
    execMs: 9200,
    execPercent: 10152,
    selfMs: 0,
    api: 'VirtualNode: #0',
    service: 'VirtualNode',
    attachedEvents: 0,
    color: 'purple',
    level: 1,
  },
  {
    id: 'row-3',
    method: 'VNode: ec54fc0f-d713-4b30-b9dd-c24f2f6b9333',
    startTime: '2025-12-29 08:59:21',
    execMs: 5400,
    execPercent: 10152,
    selfMs: 0,
    api: 'VirtualNode: #0',
    service: 'VirtualNode',
    attachedEvents: 0,
    color: 'green',
    level: 2,
  },
  {
    id: 'row-4',
    method: 'VNode: ec54fc0f-d713-4b30-b9dd-c24f2f6b9333',
    startTime: '2025-12-29 08:59:21',
    execMs: 7300,
    execPercent: 10152,
    selfMs: 0,
    api: 'VirtualNode: #0',
    service: 'VirtualNode',
    attachedEvents: 0,
    color: 'blue',
    level: 0,
  },
  {
    id: 'row-5',
    method: 'VNode: ec54fc0f-d713-4b30-b9dd-c24f2f6b9333',
    startTime: '2025-12-29 08:59:21',
    execMs: 8000,
    execPercent: 10152,
    selfMs: 0,
    api: 'VirtualNode: #0',
    service: 'VirtualNode',
    attachedEvents: 0,
    color: 'purple',
    level: 1,
  },
]
