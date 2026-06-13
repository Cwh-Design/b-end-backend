'use client'

import { cn } from '@/lib/utils'

// ========== 导入 SVG 素材 ==========
import defaultAvatarSvg from '@/assets/workbench/avatar.svg'
import welcomeCardBg from '@/assets/workbench/welcome-card-bg.png'
import roleSvg from '@/assets/workbench/role.svg'
import securitySvg from '@/assets/workbench/security.svg'
import coffeeSvg from '@/assets/workbench/coffee.svg'

// ========== 根据时间段自动生成问候语 ==========
function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 6) return '夜深了'
  if (hour < 9) return '早上好'
  if (hour < 12) return '上午好'
  if (hour < 14) return '中午好'
  if (hour < 18) return '下午好'
  return '晚上好'
}

// ========== WelcomeCard Props ==========
export interface WelcomeCardProps {
  /** 用户姓名 */
  userName: string
  /** 组织信息，如"北京海联捷讯股份有限公司  I  某某项目组" */
  organization: string
  /** 角色名称 */
  roleName: string
  /** 安全等级文案 */
  securityLevel: string
  /** 头像 URL，不传则显示首字 */
  avatarUrl?: string
  /** 附加 className */
  className?: string
}

// ========== WelcomeCard 组件 ==========
export function WelcomeCard({
  userName,
  organization,
  roleName,
  securityLevel,
  avatarUrl,
  className,
}: WelcomeCardProps) {
  const greeting = getGreeting()

  return (
    <div
      className={cn(
        'relative flex flex-col justify-between overflow-hidden rounded-xl bg-white shadow-sm',
        className,
      )}
      style={{ minHeight: '260px', padding: '32px 24px 32px 28px' }}
    >
      {/* ===== 背景图片 ===== */}
      <img
        src={welcomeCardBg.src}
        alt=""
        className="pointer-events-none absolute rounded-lg"
        style={{ top: '4px', right: '4px', bottom: '4px', left: '4px', width: 'calc(100% - 8px)', height: 'calc(100% - 8px)' }}
      />

      {/* ===== 上部：头像 + 问候 + 组织 ===== */}
      <div className="relative z-10 flex items-center gap-4">
        {/* 头像 */}
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={userName}
            className="h-[92px] w-[92px] shrink-0 rounded-full object-cover"
            style={{ border: '3px solid #f0f6ff' }}
          />
        ) : (
          <img
            src={defaultAvatarSvg.src}
            alt={userName}
            className="h-[92px] w-[92px] shrink-0 rounded-full object-cover"
            style={{ border: '3px solid #f0f6ff' }}
          />
        )}

        {/* 问候 + 组织 */}
        <div className="flex flex-col pt-1" style={{ gap: '8px' }}>
          <h2
            className="text-[26px] font-bold leading-[35px]"
            style={{ color: '#101828' }}
          >
            {greeting}，{userName}
            <img src={coffeeSvg.src} alt="" className="ml-2 inline-block h-6 w-6 align-middle" />
          </h2>
          <p
            className="text-[15px] font-normal leading-5"
            style={{ color: '#53647c' }}
          >
            {organization}
          </p>
        </div>
      </div>

      {/* ===== 下部：角色 + 安全级别 ===== */}
      <div
        className="relative z-10 flex items-center mt-4"
        style={{
          width: '440px',
          height: '80px',
          borderRadius: '10px',
          border: '1.5px solid #FFF',
          background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.95) 35.34%, rgba(255, 255, 255, 0.30) 100%)',
          backdropFilter: 'blur(1.5px)',
          padding: '0 20px 0 28px',
          gap: '40px',
        }}
      >
        {/* 角色 */}
        <div className="flex items-center gap-3">
          <img src={roleSvg.src} alt="角色" className="h-[30px] w-[25px]" />
          <div className="flex flex-col gap-0.5">
            <span
              className="text-[14px] font-normal leading-5"
              style={{ color: '#516178', paddingLeft: '4px' }}
            >
              角色
            </span>
            <span
              className="text-[14px] font-medium leading-[18px]"
              style={{ color: '#101828', paddingLeft: '4px' }}
            >
              {roleName}
            </span>
          </div>
        </div>

        {/* 竖线分割 */}
        <div className="h-[29px] w-px shrink-0" style={{ backgroundColor: '#e7eaf0' }} />

        {/* 安全级别 */}
        <div className="flex items-center gap-3">
          <img src={securitySvg.src} alt="安全级别" className="h-[30px] w-[25px]" />
          <div className="flex flex-col gap-0.5">
            <span
              className="text-[14px] font-normal leading-5"
              style={{ color: '#516178', paddingLeft: '4px' }}
            >
              安全级别
            </span>
            <span
              className="text-[14px] font-medium leading-[18px]"
              style={{ color: '#101828', paddingLeft: '4px' }}
            >
              {securityLevel}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
