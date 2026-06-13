'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

/**
 * 日期选择器 — 通用组件
 *
 * 触发器：外部传入（如带日历 icon 的输入框），通过 children 实现
 * 弹层：参考 Ant Design DatePicker 风格
 *   - 顶部：« (上一年) ‹ (上月) | 2026年 6月 | › (下月) » (下一年)
 *   - 中间：7 列日期网格（一二三四五六日）
 *   - 底部：「今天」快捷按钮
 *
 * 当前实现：
 *   - 受控组件：value / onChange 由外部传入
 *   - 关闭时机：点选日期、按 ESC、点击弹层外
 *
 * TODO: 支持「年视图」「月视图」「范围选择」「禁用日期」等高级特性
 */

interface DatePickerProps {
  /** 当前选中的日期（YYYY-MM-DD 字符串），null 表示未选 */
  value: string | null
  /** 选中日期回调 */
  onChange: (value: string) => void
  /** 触发器（被 children 包裹的元素，点击时打开 / 关闭弹层） */
  children: React.ReactNode
  /** 弹层水平对齐：默认 left（左对齐于触发器） */
  align?: 'left' | 'right'
}

const WEEK_LABELS = ['一', '二', '三', '四', '五', '六', '日']

/** 把 JS Date 的 getDay() (0=日,1=一...) 转成「一=0,日=6」的索引 */
function getWeekIndex(jsDay: number) {
  return jsDay === 0 ? 6 : jsDay - 1
}

/** YYYY-MM-DD 格式化 */
function formatDate(year: number, month: number, day: number) {
  const m = String(month).padStart(2, '0')
  const d = String(day).padStart(2, '0')
  return `${year}-${m}-${d}`
}

/** 解析 YYYY-MM-DD */
function parseDate(s: string): { year: number; month: number; day: number } {
  const [y, m, d] = s.split('-').map(Number)
  return { year: y, month: m, day: d }
}

export function DatePicker({
  value,
  onChange,
  children,
  align = 'left',
}: DatePickerProps) {
  const [open, setOpen] = useState(false)
  // 当前在面板上展示的年月（不一定是 value，用户可以翻月浏览）
  const initial = value
    ? parseDate(value)
    : { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() }
  const [viewYear, setViewYear] = useState(initial.year)
  const [viewMonth, setViewMonth] = useState(initial.month)

  const wrapperRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)
  const popupRef = useRef<HTMLDivElement>(null)

  // 弹层使用 React Portal + position: fixed 挂载到 document.body，
  // 避免被祖先 stacking context（transform/backdrop-filter/overflow:hidden 等）裁剪或遮挡。
  const [popupPos, setPopupPos] = useState<{ top: number; left: number } | null>(null)
  useEffect(() => {
    if (!open) return
    const update = () => {
      const r = triggerRef.current?.getBoundingClientRect()
      if (!r) return
      const POPUP_WIDTH = 280
      let left = r.left
      if (align === 'right') left = r.right - POPUP_WIDTH
      // 边界保护：不超出视口右边缘
      if (left + POPUP_WIDTH > window.innerWidth - 8) {
        left = window.innerWidth - POPUP_WIDTH - 8
      }
      if (left < 8) left = 8
      setPopupPos({ top: r.bottom + 4, left })
    }
    update()
    window.addEventListener('resize', update)
    window.addEventListener('scroll', update, true)
    return () => {
      window.removeEventListener('resize', update)
      window.removeEventListener('scroll', update, true)
    }
  }, [open, align])

  // 打开时同步 viewYear/viewMonth 到 value
  useEffect(() => {
    if (open && value) {
      const p = parseDate(value)
      setViewYear(p.year)
      setViewMonth(p.month)
    }
  }, [open, value])

  // 点击外部关闭（同时检查触发器和弹层，因为弹层已经被 Portal 移出 wrapperRef）
  useEffect(() => {
    if (!open) return
    function handleClick(e: MouseEvent) {
      const target = e.target as Node
      const inTrigger = wrapperRef.current?.contains(target)
      const inPopup = popupRef.current?.contains(target)
      if (!inTrigger && !inPopup) {
        setOpen(false)
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleKey)
    }
  }, [open])

  // 计算当月的日期网格（共 6 行 × 7 列，前后会补上下月日期）
  const grid = buildMonthGrid(viewYear, viewMonth)

  // 今天日期（用于高亮）
  const today = new Date()
  const todayKey = formatDate(
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate(),
  )

  function shiftMonth(delta: number) {
    let m = viewMonth + delta
    let y = viewYear
    while (m > 12) {
      m -= 12
      y += 1
    }
    while (m < 1) {
      m += 12
      y -= 1
    }
    setViewYear(y)
    setViewMonth(m)
  }

  function shiftYear(delta: number) {
    setViewYear(viewYear + delta)
  }

  function pickDate(year: number, month: number, day: number) {
    onChange(formatDate(year, month, day))
    setOpen(false)
  }

  function pickToday() {
    const t = new Date()
    onChange(
      formatDate(t.getFullYear(), t.getMonth() + 1, t.getDate()),
    )
    setOpen(false)
  }

  return (
    <div ref={wrapperRef} className="relative inline-block">
      {/* 触发器 */}
      <div
        ref={triggerRef}
        onClick={() => setOpen((v) => !v)}
        className="cursor-pointer"
      >
        {children}
      </div>

      {/* 弹层（Portal 到 body，避免被祖先 stacking context 遮挡） */}
      {open &&
        popupPos &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            ref={popupRef}
            className="fixed rounded-md bg-white"
            style={{
              top: popupPos.top,
              left: popupPos.left,
              width: '280px',
              border: '1px solid #d8e2f0',
              boxShadow:
                '0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12)',
              padding: '8px 12px 12px',
              zIndex: 9999,
            }}
          >
          {/* 头部：年月切换 */}
          <div
            className="flex items-center justify-between"
            style={{ height: '36px', borderBottom: '1px solid #f0f0f0' }}
          >
            <div className="flex items-center gap-2">
              <NavBtn onClick={() => shiftYear(-1)}>«</NavBtn>
              <NavBtn onClick={() => shiftMonth(-1)}>‹</NavBtn>
            </div>
            <div className="text-[14px] font-medium" style={{ color: '#101828' }}>
              {viewYear}年 {viewMonth}月
            </div>
            <div className="flex items-center gap-2">
              <NavBtn onClick={() => shiftMonth(1)}>›</NavBtn>
              <NavBtn onClick={() => shiftYear(1)}>»</NavBtn>
            </div>
          </div>

          {/* 星期表头 */}
          <div className="mt-2 grid grid-cols-7 text-center">
            {WEEK_LABELS.map((w) => (
              <div
                key={w}
                className="text-[12px]"
                style={{ color: '#667180', height: '28px', lineHeight: '28px' }}
              >
                {w}
              </div>
            ))}
          </div>

          {/* 日期网格 */}
          <div className="grid grid-cols-7 gap-y-1 text-center">
            {grid.map((cell, i) => {
              const cellKey = formatDate(cell.year, cell.month, cell.day)
              const isCurMonth = cell.month === viewMonth
              const isSelected = value === cellKey
              const isToday = todayKey === cellKey
              return (
                <button
                  key={i}
                  onClick={() => pickDate(cell.year, cell.month, cell.day)}
                  className="mx-auto flex items-center justify-center rounded text-[13px] transition-colors hover:bg-[#f0f5fc]"
                  style={{
                    width: '28px',
                    height: '28px',
                    color: !isCurMonth
                      ? '#bfc5cf' // 上下月日期：灰
                      : isSelected
                        ? '#ffffff'
                        : '#101828',
                    backgroundColor: isSelected ? '#0274ff' : 'transparent',
                    border: isToday && !isSelected ? '1px solid #0274ff' : 'none',
                  }}
                >
                  {cell.day}
                </button>
              )
            })}
          </div>

          {/* 底部：今天 */}
          <div
            className="mt-2 flex items-center justify-center"
            style={{ borderTop: '1px solid #f0f0f0', paddingTop: '8px' }}
          >
            <button
              onClick={pickToday}
              className="text-[13px] font-medium hover:underline"
              style={{ color: '#0274ff' }}
            >
              今天
            </button>
          </div>
        </div>,
          document.body,
        )}
    </div>
  )
}

/** 弹层头部的小箭头按钮 */
function NavBtn({
  children,
  onClick,
}: {
  children: React.ReactNode
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="flex h-6 w-6 items-center justify-center rounded text-[13px] transition-colors hover:bg-[#f0f5fc]"
      style={{ color: '#667180' }}
    >
      {children}
    </button>
  )
}

/**
 * 生成 6×7=42 格日期网格，包含上月末尾、本月、下月开头。
 * 周一 = 第 0 列
 */
function buildMonthGrid(
  year: number,
  month: number,
): Array<{ year: number; month: number; day: number }> {
  const cells: Array<{ year: number; month: number; day: number }> = []

  // 本月第一天是星期几（一=0...日=6）
  const firstDay = new Date(year, month - 1, 1)
  const firstWeekIdx = getWeekIndex(firstDay.getDay())

  // 本月有几天
  const daysInMonth = new Date(year, month, 0).getDate()

  // 上月有几天
  const prevMonth = month === 1 ? 12 : month - 1
  const prevYear = month === 1 ? year - 1 : year
  const daysInPrevMonth = new Date(prevYear, prevMonth, 0).getDate()

  // 1) 上月末尾几天
  for (let i = firstWeekIdx - 1; i >= 0; i--) {
    cells.push({
      year: prevYear,
      month: prevMonth,
      day: daysInPrevMonth - i,
    })
  }

  // 2) 本月所有天
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ year, month, day: d })
  }

  // 3) 下月开头补够 42 格
  const nextMonth = month === 12 ? 1 : month + 1
  const nextYear = month === 12 ? year + 1 : year
  let nextDay = 1
  while (cells.length < 42) {
    cells.push({ year: nextYear, month: nextMonth, day: nextDay++ })
  }

  return cells
}
