'use client'

import { DatePicker } from '@/components/date-picker'

/**
 * DateRangePicker — 通用日期范围选择器
 *
 * 来源：原本在 app-center/page.tsx 内部定义，应用中心页2 也要用，抽出来共享。
 * 视觉：左日历 / 右切换日期 / 中箭头 / 右日历图标
 */

interface DateRangePickerProps {
  startDate: string
  endDate: string
  onChangeStart: (d: string) => void
  onChangeEnd: (d: string) => void
  /** 容器宽度，默认 280 */
  width?: number
}

export function DateRangePicker({
  startDate,
  endDate,
  onChangeStart,
  onChangeEnd,
  width = 280,
}: DateRangePickerProps) {
  return (
    <div
      className="flex h-9 items-center rounded-md border bg-white"
      style={{ width: `${width}px`, borderColor: '#d8e2f0', padding: '0 12px' }}
    >
      <DatePicker value={startDate} onChange={onChangeStart}>
        <span className="cursor-pointer text-[14px]" style={{ color: '#101828' }}>
          {startDate}
        </span>
      </DatePicker>
      <img
        src="/app-center/icon-arrow.svg"
        alt="→"
        className="h-[7px] w-[13px] shrink-0"
        style={{ marginLeft: '24px', marginRight: '10px' }}
      />
      <DatePicker value={endDate} onChange={onChangeEnd}>
        <span className="cursor-pointer text-[14px]" style={{ color: '#101828' }}>
          {endDate}
        </span>
      </DatePicker>
      <div className="flex-1" />
      <img
        src="/app-center/icon-calendar.svg"
        alt=""
        className="h-4 w-4 shrink-0"
      />
    </div>
  )
}
