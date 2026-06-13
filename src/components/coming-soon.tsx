'use client'

/**
 * ComingSoon — 通用「页面建设中」占位
 *
 * 来源：原 reports/sales、reports/finance 各自重复定义的 ReportPlaceholder，
 * 抽出共享，配合侧边栏未开发菜单（流程中心/集成管理/组织架构/系统管理）使用。
 *
 * 视觉：
 * - 顶部白色标题卡（标题 + 一句描述）
 * - 主体白色空状态卡（圆形灰底图标 + "页面建设中，敬请期待"）
 */

interface ComingSoonProps {
  title: string
  description: string
}

export function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <div className="flex flex-col gap-5">
      <div
        className="bg-white"
        style={{
          border: '2px solid #ffffff',
          borderRadius: '12px',
          padding: '24px',
        }}
      >
        <h1
          className="text-[24px] font-bold leading-[32px]"
          style={{ color: '#101828' }}
        >
          {title}
        </h1>
        <p className="mt-2 text-[14px]" style={{ color: '#667180' }}>
          {description}
        </p>
      </div>

      <div
        className="bg-white flex items-center justify-center"
        style={{
          border: '2px solid #ffffff',
          borderRadius: '12px',
          padding: '80px 24px',
          minHeight: '400px',
        }}
      >
        <div className="flex flex-col items-center gap-3">
          <div
            className="flex h-16 w-16 items-center justify-center rounded-full"
            style={{ backgroundColor: '#f2f5fa' }}
          >
            {/* 柱状图小图标，与原 sales/finance 一致 */}
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#8a9ab3"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="20" x2="18" y2="10" />
              <line x1="12" y1="20" x2="12" y2="4" />
              <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
          </div>
          <span className="text-[14px]" style={{ color: '#8a9ab3' }}>
            页面建设中，敬请期待
          </span>
        </div>
      </div>
    </div>
  )
}
