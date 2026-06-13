'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/tooltip'
import type { NavItem, FavoriteApp } from '@/mock/navigation'

// ========== 导入 SVG 素材（主导航） ==========
import workbenchSvg from '@/assets/workbench/workbench.svg'
import reportsSvg from '@/assets/workbench/reports.svg'
import datacenterSvg from '@/assets/workbench/datacenter.svg'
import appcenterSvg from '@/assets/workbench/appcenter.svg'
import workflowSvg from '@/assets/workbench/workflow.svg'
import integrationSvg from '@/assets/workbench/integration.svg'
import orgStructureSvg from '@/assets/workbench/org-structure.svg'
import systemSettingsSvg from '@/assets/workbench/system-settings.svg'

// ========== 导入 SVG 素材（常用应用） ==========
import favContractSvg from '@/assets/workbench/fav-contract.svg'
import favReimbursementSvg from '@/assets/workbench/fav-reimbursement.svg'
import favAssetSvg from '@/assets/workbench/fav-asset.svg'
import favOnboardingSvg from '@/assets/workbench/fav-onboarding.svg'
import favSalesReportSvg from '@/assets/workbench/fav-sales-report.svg'

// ========== 主导航图标映射 ==========
const NAV_ICON_MAP: Record<string, string> = {
  workbench: workbenchSvg.src,
  reports: reportsSvg.src,
  datacenter: datacenterSvg.src,
  appcenter: appcenterSvg.src,
  workflow: workflowSvg.src,
  integration: integrationSvg.src,
  'org-structure': orgStructureSvg.src,
  'system-settings': systemSettingsSvg.src,
}

// ========== 常用应用图标映射 ==========
const FAV_ICON_MAP: Record<string, string> = {
  'contract': favContractSvg.src,
  'reimbursement': favReimbursementSvg.src,
  'asset': favAssetSvg.src,
  'onboarding': favOnboardingSvg.src,
  'sales-report': favSalesReportSvg.src,
}

// ========== 常用应用图标底色（取图标色 8% 透明度） ==========
const FAV_BG_COLOR_MAP: Record<string, string> = {
  'contract': 'rgba(2, 116, 255, 0.08)',      // #0274FF
  'reimbursement': 'rgba(34, 191, 112, 0.08)', // #22BF70
  'asset': 'rgba(2, 116, 255, 0.08)',          // #0274FF
  'onboarding': 'rgba(245, 192, 33, 0.08)',    // #F5C021
  'sales-report': 'rgba(2, 116, 255, 0.08)',   // #0274FF
}

// ========== 样式常量 ==========
const MENU_ITEM_GAP = 8 // 菜单项垂直间距
const NAV_ITEM_HEIGHT = 48 // 菜单项高度

// ========== 主导航菜单 ==========
interface NavMenuProps {
  items: NavItem[]
  collapsed?: boolean
}

export function NavMenu({ items, collapsed }: NavMenuProps) {
  const pathname = usePathname()

  // 当前哪些父菜单展开（key = item.href）。默认：路径命中的父菜单自动展开
  const [openKeys, setOpenKeys] = useState<Set<string>>(() => {
    const s = new Set<string>()
    items.forEach((item) => {
      if (item.children?.length && pathname?.startsWith(item.href)) {
        s.add(item.href)
      }
    })
    return s
  })

  const toggleOpen = (key: string) => {
    setOpenKeys((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  return (
    <nav
      className="flex flex-col"
      style={{ gap: `${MENU_ITEM_GAP}px` }}
    >
      {items.map((item) => {
        const hasChildren = !!item.children?.length
        const isActive =
          item.href === '/'
            ? pathname === '/'
            : pathname?.startsWith(item.href) ?? false
        // 有子菜单时，命中任意子菜单也让父项高亮
        const isChildActive = hasChildren
          ? !!item.children?.some((child) => pathname === child.href || pathname?.startsWith(child.href + '/'))
          : false
        const isParentSelfActive = hasChildren
          ? pathname === item.href || isChildActive
          : isActive
        const isOpen = hasChildren && openKeys.has(item.href)

        const iconSrc = NAV_ICON_MAP[item.iconKey]

        // ===== 主菜单项（按钮或链接） =====
        const mainItemContent = (
          <>
            {iconSrc && (
              <img
                src={iconSrc}
                alt={item.title}
                className={cn(
                  'h-5 w-5 shrink-0',
                  !collapsed && 'mr-2.5',
                )}
                style={{
                  filter: isParentSelfActive
                    ? 'brightness(0) invert(1)'
                    : 'brightness(0) saturate(100%) invert(33%) sepia(16%) saturate(823%) hue-rotate(182deg) brightness(89%) contrast(86%)',
                }}
              />
            )}
            {!collapsed && <span className="flex-1 text-left">{item.title}</span>}
            {!collapsed && hasChildren && (
              <ChevronDown
                className={cn(
                  'h-4 w-4 shrink-0 transition-transform',
                  isOpen && 'rotate-180',
                )}
                style={{
                  color: isParentSelfActive ? '#ffffff' : '#8a9ab3',
                }}
              />
            )}
          </>
        )

        const sharedClass = cn(
          'flex items-center rounded-lg text-[16px] transition-colors',
          collapsed
            ? 'justify-center h-[44px] w-[44px]'
            : undefined,
          isParentSelfActive
            ? 'text-white font-bold'
            : 'hover:bg-[#f2f5fa]',
        )

        const sharedStyle: React.CSSProperties = {
          height: `${NAV_ITEM_HEIGHT}px`,
          backgroundColor: isParentSelfActive ? '#136af8' : undefined,
          color: isParentSelfActive ? '#ffffff' : '#4D5F78',
          fontWeight: isParentSelfActive ? 700 : 400,
          boxShadow: isParentSelfActive ? '0 8px 12px 0 rgba(20, 103, 209, 0.25)' : undefined,
          paddingLeft: collapsed ? undefined : '16px',
          paddingRight: collapsed ? undefined : '12px',
        }

        // 有子菜单 → 渲染为 button（点击展开/收起）；否则照旧 Link
        const mainItem = hasChildren ? (
          <button
            type="button"
            onClick={() => toggleOpen(item.href)}
            className={cn(sharedClass, 'w-full')}
            style={sharedStyle}
          >
            {mainItemContent}
          </button>
        ) : (
          <Link
            href={item.href}
            className={sharedClass}
            style={sharedStyle}
          >
            {mainItemContent}
          </Link>
        )

        // 折叠态：tooltip + 仅显示主项（不展示子菜单，简化处理）
        if (collapsed) {
          return (
            <Tooltip key={item.href} delayDuration={0}>
              <TooltipTrigger asChild>{mainItem}</TooltipTrigger>
              <TooltipContent side="right" className="ml-1">
                {item.title}
              </TooltipContent>
            </Tooltip>
          )
        }

        // 展开态 + 有子菜单
        return (
          <div
            key={item.href}
            className="flex flex-col"
            // 子菜单展开时，整组下方少 6px → 末尾二级 → 下一个一级 = 10 - 6 = 4px
            style={{ marginBottom: hasChildren && isOpen ? '-6px' : undefined }}
          >
            {mainItem}
            {hasChildren && (
              <div
                className="overflow-hidden transition-all duration-200 ease-in-out"
                style={{
                  maxHeight: isOpen ? `${item.children!.length * 44 + 12}px` : '0px',
                  opacity: isOpen ? 1 : 0,
                }}
              >
                <div
                  className="flex flex-col"
                  style={{ paddingTop: '12px', gap: '4px' }}
                >
                  {item.children!.map((child) => {
                    const childActive = pathname === child.href
                    return (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          'flex items-center text-[14px] transition-colors',
                          childActive
                            ? 'font-medium'
                            : 'hover:bg-[#f2f5fa]',
                        )}
                        style={{
                          height: '40px',
                          borderRadius: '4px',
                          paddingLeft: '46px', // 与父菜单图标右侧对齐（16 + 20 icon + 10 gap）
                          paddingRight: '12px',
                          color: childActive ? '#136af8' : '#667180',
                          backgroundColor: childActive ? '#e8f0ff' : undefined,
                        }}
                      >
                        <span>{child.title}</span>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        )
      })}
    </nav>
  )
}

// ========== 常用应用 ==========
interface FavoriteAppsProps {
  apps: FavoriteApp[]
  collapsed?: boolean
}

export function FavoriteApps({ apps, collapsed }: FavoriteAppsProps) {
  if (collapsed) return null

  return (
    <div className="flex flex-col" style={{ gap: '6px' }}>
      <span
        className="px-3 text-[14px] font-medium uppercase tracking-wider"
        style={{ color: '#8a9ab3' }}
      >
        常用应用
      </span>

      <div className="flex flex-col" style={{ gap: '6px' }}>
        {apps.map((app) => {
          const iconSrc = FAV_ICON_MAP[app.iconKey]
          const bgColor = FAV_BG_COLOR_MAP[app.iconKey]

          return (
            <Link
              key={app.name}
              href={app.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-[14px] transition-colors hover:bg-[#f2f5fa]"
              style={{ color: '#667180' }}
            >
              {iconSrc && (
                <div
                  className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-md"
                  style={{ backgroundColor: bgColor }}
                >
                  <img
                    src={iconSrc}
                    alt={app.name}
                    className="h-4 w-4"
                  />
                </div>
              )}
              <span>{app.name}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
