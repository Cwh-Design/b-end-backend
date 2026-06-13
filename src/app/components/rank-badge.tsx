'use client'

/**
 * RankBadge — 序号奖牌徽章
 *
 * 来源：data-center/page.tsx 内的 RankBadge，应用中心页2 也要用，抽出共享。
 * 切图原始尺寸 18×21 px，按 20×23 等比微放大展示
 * 数字色值：1=#C48300(金) 2=#488ACC(银/蓝) 3=#C67841(铜) 其余=#667180
 */

const RANK_NUMBER_COLOR: Record<number, string> = {
  1: '#C48300',
  2: '#488ACC',
  3: '#C67841',
}

export function RankBadge({ rank }: { rank: number }) {
  const src =
    rank <= 3
      ? `/data-center/rank-${rank}.png`
      : '/data-center/rank-default.png'
  const numberColor = RANK_NUMBER_COLOR[rank] ?? '#667180'
  return (
    <div
      className="relative inline-flex h-[23px] w-[20px] items-center justify-center"
      style={{ transform: 'translateY(4px)' }}
    >
      <img src={src} alt={`第 ${rank} 名`} width={20} height={23} />
      {/* 在徽章中央叠加序号数字 */}
      <span
        className="absolute inset-0 flex items-center justify-center text-[11px] font-bold pt-[2px]"
        style={{ color: numberColor }}
      >
        {rank}
      </span>
    </div>
  )
}
