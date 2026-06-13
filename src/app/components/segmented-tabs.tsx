'use client'

/**
 * SegmentedTabs — 通用分段切换控件
 *
 * 用于：
 *   - 数据中心页1 月/年切换（2 段）
 *   - 应用中心页2 时间粒度切换（4 段：1小时/12小时/24小时/全部）
 *
 * 视觉：白底圆角边框容器，内部按钮选中态填充蓝色 / 文字白色
 */

interface SegmentedTabsProps<T extends string> {
  options: ReadonlyArray<{ value: T; label: string }>
  value: T
  onChange: (v: T) => void
  /** 单段宽度，默认 80 */
  segmentWidth?: number
  /** 整体高度，默认 32 */
  height?: number
}

export function SegmentedTabs<T extends string>({
  options,
  value,
  onChange,
  segmentWidth = 80,
  height = 32,
}: SegmentedTabsProps<T>) {
  return (
    <div
      className="flex items-center rounded-md border bg-white p-0.5"
      style={{ borderColor: '#d8e2f0', height: `${height}px` }}
    >
      {options.map((opt) => {
        const active = opt.value === value
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className="flex items-center justify-center rounded text-[13px] font-medium transition-colors"
            style={{
              width: `${segmentWidth}px`,
              height: `${height - 4}px`,
              backgroundColor: active ? '#0274ff' : 'transparent',
              color: active ? '#ffffff' : '#667180',
            }}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
