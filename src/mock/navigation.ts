// TODO: 对接权限系统，根据用户角色动态生成导航菜单

export interface NavItem {
  title: string
  href: string
  /** 图标素材 key，对应 src/assets/workbench/ 下的 SVG */
  iconKey: string
  children?: NavItem[]
}

export interface FavoriteApp {
  name: string
  href: string
  /** 图标素材 key，对应 src/assets/workbench/ 下的 SVG */
  iconKey: string
}

export const mainNavItems: NavItem[] = [
  { title: '工作台', href: '/workbench', iconKey: 'workbench' },
  {
    title: '应用中心',
    href: '/app-center',
    iconKey: 'appcenter',
    children: [
      { title: '服务器巡检报告', href: '/app-center', iconKey: 'appcenter' },
      { title: '监控总览', href: '/app-center/page2', iconKey: 'appcenter' },
      { title: '统一运维平台', href: '/app-center/page3', iconKey: 'appcenter' },
    ],
  },
  { title: '流程中心', href: '/workflow', iconKey: 'workflow' },
  {
    title: '数据中心',
    href: '/data-center',
    iconKey: 'datacenter',
    children: [
      { title: '机房统计分析', href: '/data-center', iconKey: 'datacenter' },
      { title: '资源使用分析', href: '/data-center/page2', iconKey: 'datacenter' },
    ],
  },
  {
    title: '报表中心',
    href: '/reports',
    iconKey: 'reports',
    children: [
      { title: '销售报表', href: '/reports/sales', iconKey: 'reports' },
      { title: '财务报表', href: '/reports/finance', iconKey: 'reports' },
      { title: '请假管理', href: '/reports/operation', iconKey: 'reports' },
    ],
  },
  { title: '集成管理', href: '/integration', iconKey: 'integration' },
  { title: '组织架构', href: '/org-structure', iconKey: 'org-structure' },
  { title: '系统管理', href: '/system-settings', iconKey: 'system-settings' },
]

export const favoriteApps: FavoriteApp[] = [
  { name: '合同审批表单', href: '/workflow/contract', iconKey: 'contract' },
  { name: '差旅报销申请', href: '/workflow/reimbursement', iconKey: 'reimbursement' },
  { name: '固定资产盘点', href: '/workflow/asset', iconKey: 'asset' },
  { name: '人员入职档案', href: '/workflow/onboarding', iconKey: 'onboarding' },
  { name: '第一季度销售报表', href: '/reports/q1-sales', iconKey: 'sales-report' },
]

export const mockUser = {
  name: 'Olivia Rhye',
  email: 'olivia@hailianjie.com',
}
