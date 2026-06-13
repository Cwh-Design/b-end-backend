'use client'

import { useState, useEffect, createContext, useContext } from 'react'
import type { ReactNode } from 'react'
import { AppSidebar, SIDEBAR_WIDTH, SIDEBAR_COLLAPSED_WIDTH } from './app-sidebar'
import { AppHeader } from './app-header'

// ========== 侧边栏状态 Context ==========
interface SidebarContextValue {
  collapsed: boolean
  toggleSidebar: () => void
}
const SidebarContext = createContext<SidebarContextValue>({
  collapsed: false,
  toggleSidebar: () => {},
})
export const useSidebarContext = () => useContext(SidebarContext)

// ========== AppLayout ==========
interface AppLayoutProps {
  children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('sidebar-collapsed')
    if (saved === 'true') setCollapsed(true)

    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'sidebar-collapsed') {
        setCollapsed(e.newValue === 'true')
      }
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  const toggleSidebar = () => {
    setCollapsed((prev) => {
      localStorage.setItem('sidebar-collapsed', String(!prev))
      return !prev
    })
  }

  const sidebarWidth = collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH

  return (
    <SidebarContext.Provider value={{ collapsed, toggleSidebar }}>
      {/* 整体限死视口高度，配合 main overflow-y-auto 让 sidebar/header 固定、仅内容区滚动 */}
      <div className="flex h-screen overflow-hidden">
        <AppSidebar />
        <div
          className="flex flex-1 flex-col transition-[margin-left] duration-300"
          style={{ marginLeft: `${sidebarWidth}px` }}
        >
          <AppHeader />
          <main
            className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden"
            style={{ backgroundColor: '#f2f5fa', padding: '24px 20px 24px 24px', minHeight: 0 }}
          >
            {children}
          </main>
        </div>
      </div>
    </SidebarContext.Provider>
  )
}
