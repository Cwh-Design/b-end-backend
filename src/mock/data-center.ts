// TODO: 对接后端数据中心 API，替换以下 mock 数据
// 数据来源：Figma 数据中心页1 (211:31498)

// ========== 进出机房 Tab ==========
export interface MachineRoomTab {
  id: number
  name: string
}

/** 进出机房统计分析 — 顶部 Tab 切换 */
export const machineRoomTabs: MachineRoomTab[] = [
  { id: 1, name: '某某某机房' },
  { id: 2, name: '某某某机房' },
  { id: 3, name: '某某某机房' },
  { id: 4, name: '某某某机房' },
  { id: 5, name: '某某某机房' },
]

// ========== 4 张统计卡片 ==========
export interface StatCardItem {
  title: string
  value: number
  unit: string
  /** 趋势百分比（正数 ↑ 红色，负数 ↓ 绿色） */
  trend: number
  /** 图标 key，页面层做图标映射 */
  iconKey: 'dept' | 'oa' | 'entry' | 'person'
}

/** 统计卡片行 — 4 张卡片 */
export const statCardsData: StatCardItem[] = [
  { title: '部门总数', value: 68, unit: '个', trend: 16.8, iconKey: 'dept' },
  { title: 'OA审批单', value: 458, unit: '个', trend: -10.5, iconKey: 'oa' },
  { title: '进出总次数', value: 3248, unit: '次', trend: 16.8, iconKey: 'entry' },
  { title: '人员总数', value: 247, unit: '人', trend: 16.8, iconKey: 'person' },
]

// ========== 部门进出次数和人数统计表 ==========
export interface DeptEntryItem {
  index: number
  deptName: string
  entryCount: number
  personCount: number
}

/** 左表：部门进出次数和人数统计 — 10 行 */
export const deptEntryData: DeptEntryItem[] = [
  { index: 1, deptName: '技术部', entryCount: 124, personCount: 245 },
  { index: 2, deptName: '运维部', entryCount: 120, personCount: 200 },
  { index: 3, deptName: '产品部', entryCount: 102, personCount: 168 },
  { index: 4, deptName: '测试部', entryCount: 88, personCount: 154 },
  { index: 5, deptName: '市场部', entryCount: 80, personCount: 145 },
  { index: 6, deptName: '财务部', entryCount: 70, personCount: 140 },
  { index: 7, deptName: '行政部', entryCount: 60, personCount: 135 },
  { index: 8, deptName: '技术部', entryCount: 54, personCount: 120 },
  { index: 9, deptName: '运维部', entryCount: 45, personCount: 108 },
  { index: 10, deptName: '人力资源部', entryCount: 38, personCount: 102 },
]

// ========== 各部门OA审批单统计表 ==========
export interface DeptOaItem {
  index: number
  deptName: string
  approvalCount: number
}

/** 右表：各部门OA审批单统计 — 10 行 */
export const deptOaData: DeptOaItem[] = [
  { index: 1, deptName: '技术部', approvalCount: 245 },
  { index: 2, deptName: '运维部', approvalCount: 200 },
  { index: 3, deptName: '产品部', approvalCount: 168 },
  { index: 4, deptName: '测试部', approvalCount: 154 },
  { index: 5, deptName: '市场部', approvalCount: 145 },
  { index: 6, deptName: '财务部', approvalCount: 140 },
  { index: 7, deptName: '行政部', approvalCount: 135 },
  { index: 8, deptName: '技术部', approvalCount: 120 },
  { index: 9, deptName: '运维部', approvalCount: 108 },
  { index: 10, deptName: '人力资源部', approvalCount: 102 },
]
