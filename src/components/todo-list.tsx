'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

// ========== 导入 SVG 素材 ==========
import todoListSvg from '@/assets/workbench/todo-list.svg'
import todoTimeSvg from '@/assets/workbench/todo-time.svg'
import todoAvatarImg from '@/assets/workbench/todo-avatar.png'

// ========== TodoItem 状态类型 ==========
export type TodoStatus = 'pending' | 'returned' | 'withdrawn'

const STATUS_CONFIG: Record<TodoStatus, { label: string; bg: string; text: string }> = {
  pending: { label: '待处理', bg: '#ecf5ff', text: '#0274ff' },
  returned: { label: '退回', bg: '#fff3df', text: '#f08113' },
  withdrawn: { label: '撤回', bg: '#f5f5f5', text: '#8a9ab3' },
}

// ========== TodoItem 数据接口 ==========
export interface TodoItemData {
  /** 标题，如"测试应用 - 附件导入功能验收测试" */
  title: string
  /** 描述，长文本会自动截断 */
  description: string
  /** 状态 */
  status: TodoStatus
  /** 提交人姓名 */
  submitter: string
  /** 提交人头像 URL（可选） */
  submitterAvatar?: string
  /** 时间文本，如"2022-06-09  14:00:00" */
  time: string
}

// ========== TodoItem Props ==========
export interface TodoItemProps extends TodoItemData {
  onClick?: () => void
  className?: string
}

// ========== TodoItem（可复用的待办列表项） ==========
export function TodoItem({
  title,
  description,
  status,
  submitter,
  submitterAvatar,
  time,
  onClick,
  className,
}: TodoItemProps) {
  const config = STATUS_CONFIG[status]

  return (
    <div
      onClick={onClick}
      className={cn(
        'group cursor-pointer border-b py-4 pl-2 transition-colors hover:bg-[#f8fafc]',
        className,
      )}
      style={{ borderColor: '#e7eaf0' }}
    >
      {/* ===== 第一行：标题 + 状态标签 ===== */}
      <div className="mb-2 flex items-center justify-between gap-4">
        <span
          className="truncate text-[16px] font-medium leading-[23px]"
          style={{ color: '#101828' }}
        >
          {title}
        </span>
        {/* 状态标签 */}
        <span
          className="inline-flex shrink-0 items-center rounded-md px-3 py-[1px] text-[12px] font-medium leading-[20px]"
          style={{ backgroundColor: config.bg, color: config.text }}
        >
          {config.label}
        </span>
      </div>

      {/* ===== 第二行：描述（截断） ===== */}
      <p
        className="mb-2 truncate text-[14px] font-normal leading-[20px]"
        style={{ color: '#53647c' }}
      >
        {description}
      </p>

      {/* ===== 第三行：提交人 + 时间 ===== */}
      <div className="flex items-center gap-2 text-[14px] font-normal leading-[20px]">
        {/* 提交人头像 */}
        <img
          src={submitterAvatar || todoAvatarImg.src}
          alt={submitter}
          className="h-4 w-4 rounded-full object-cover"
        />
        <span style={{ color: '#7f8ca2' }}>{submitter}</span>

        {/* 时间 */}
        <span className="ml-4 inline-flex items-center gap-1" style={{ color: '#8592a8' }}>
          <img src={todoTimeSvg.src} alt="" className="h-3 w-3" />
          {time}
        </span>
      </div>
    </div>
  )
}

// ========== TodoTab 类型 ==========
export type TodoTab = 'all' | 'pending' | 'returned' | 'withdrawn'

interface TabConfig {
  key: TodoTab
  label: string
  count?: number
}

// ========== TodoList Props ==========
export interface TodoListProps {
  /** 区域标题 */
  title?: string
  /** 当前激活的 Tab */
  activeTab?: TodoTab
  /** Tab 切换回调 */
  onTabChange?: (tab: TodoTab) => void
  /** 待办数据列表 */
  items: TodoItemData[]
  /** 各 Tab 数量 */
  tabCounts?: { pending: number; returned: number; withdrawn: number }
  /** 附加 className */
  className?: string
}

// ========== TodoList（我的待办区域） ==========
export function TodoList({
  title = '我的代办',
  activeTab: controlledTab,
  onTabChange,
  items,
  tabCounts,
  className,
}: TodoListProps) {
  const [internalTab, setInternalTab] = useState<TodoTab>('all')
  const activeTab = controlledTab ?? internalTab

  const handleTabChange = (tab: TodoTab) => {
    setInternalTab(tab)
    onTabChange?.(tab)
  }

  const tabs: TabConfig[] = [
    { key: 'all', label: '全部' },
    {
      key: 'pending',
      label: '待处理',
      count: tabCounts?.pending ?? 15,
    },
    {
      key: 'returned',
      label: '退回',
      count: tabCounts?.returned ?? 15,
    },
    {
      key: 'withdrawn',
      label: '撤回',
      count: tabCounts?.withdrawn,
    },
  ]

  // 根据 activeTab 筛选
  const filteredItems =
    activeTab === 'all'
      ? items
      : items.filter((item) => item.status === activeTab)

  return (
    <div
      className={cn('flex flex-col rounded-xl bg-white p-5 shadow-sm', className)}
    >
      {/* ===== 标题栏：标题 + Tab 筛选 ===== */}
      <div className="mb-4 flex items-center">
        {/* 标题 + 图标 */}
        <div className="flex shrink-0 items-center gap-2">
          <img
            src={todoListSvg.src}
            alt="我的待办"
            className="h-[26px] w-[26px]"
          />
          <h3
            className="text-[18px] font-bold leading-[23px]"
            style={{ color: '#101828' }}
          >
            {title}
          </h3>
        </div>

        {/* Tab 筛选 */}
        <div className="ml-auto flex items-center gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => handleTabChange(tab.key)}
              className="relative pb-1 text-[14px] leading-[23px] transition-colors"
              style={{
                color: activeTab === tab.key ? '#0274ff' : '#516178',
                fontWeight: activeTab === tab.key ? 700 : 400,
              }}
            >
              {tab.label}
              {tab.count !== undefined && (
                <span className="ml-0.5">({tab.count})</span>
              )}
              {activeTab === tab.key && (
                <span
                  className="absolute bottom-0 left-0 h-[2px] w-full rounded-full"
                  style={{ backgroundColor: '#0274ff' }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ===== 分割线 ===== */}
      <div
        className="mb-0 h-px w-full shrink-0"
        style={{ backgroundColor: '#e7eaf0' }}
      />

      {/* ===== 待办列表 ===== */}
      {/* TODO: 对接后端待办列表 API，根据 activeTab 筛选 */}
      <div className="flex-1 overflow-y-auto">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <TodoItem
              key={`${item.title}-${index}`}
              title={item.title}
              description={item.description}
              status={item.status}
              submitter={item.submitter}
              submitterAvatar={item.submitterAvatar}
              time={item.time}
              className={index === filteredItems.length - 1 ? 'border-b-0' : ''}
            />
          ))
        ) : (
          <div className="flex h-full items-center justify-center py-12">
            <p
              className="text-[14px]"
              style={{ color: '#8a9ab3' }}
            >
              暂无待办事项
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
