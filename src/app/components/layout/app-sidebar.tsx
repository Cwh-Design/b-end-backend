'use client'

import { cn } from '@/lib/utils'
import { Separator } from '@/components/separator'
import { TooltipProvider } from '@/components/tooltip'
import { LogoBlock } from './logo-block'
import { NavMenu, FavoriteApps } from './nav-menu'
import { mainNavItems, favoriteApps } from '@/mock/navigation'
import { useSidebarContext } from '@/components/layout/app-layout'

export const SIDEBAR_WIDTH = 267
export const SIDEBAR_COLLAPSED_WIDTH = 64

export function AppSidebar() {
  const { collapsed } = useSidebarContext()

  return (
    <TooltipProvider delayDuration={300}>
      <aside
        className={cn(
          'fixed left-0 top-0 z-40 flex h-screen flex-col border-r transition-[width] duration-300',
          collapsed ? 'w-[64px]' : 'w-[267px]',
        )}
        style={{
          backgroundColor: '#ffffff',
          borderColor: '#e7eaf0',
        }}
      >
        {/* ===== LOGO 区域 ===== */}
        <div
          className="flex h-20 items-center justify-center border-b px-4"
          style={{ borderColor: '#e7eaf0' }}
        >
          <LogoBlock collapsed={collapsed} />
        </div>

        {/* ===== 导航菜单 + 常用应用 ===== */}
        <div
          className="flex-1 overflow-y-auto"
          style={{
            paddingTop: '20px',
            paddingBottom: '24px',
            paddingLeft: collapsed ? '10px' : '12px',
            paddingRight: collapsed ? '10px' : '12px',
          }}
        >
          <NavMenu items={mainNavItems} collapsed={collapsed} />

          {/* 分割线 */}
          <Separator
            className="my-4"
            style={{ backgroundColor: '#e7eaf0' }}
          />

          <FavoriteApps apps={favoriteApps} collapsed={collapsed} />
        </div>

      </aside>

    </TooltipProvider>
  )
}
