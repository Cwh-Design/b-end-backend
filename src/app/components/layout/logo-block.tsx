interface LogoBlockProps {
  collapsed?: boolean
}

/**
 * Logo 区块 — 侧边栏顶部
 *
 * 直接使用设计稿提供的 PNG 切图：
 *   - 展开态：logo-expanded.png（含「海联捷讯 / 应用构建平台」文字）
 *   - 收起态：logo-collapsed.png（仅图标）
 *
 * 复制源文件位置：src/assets/workbench/logo/
 */
export function LogoBlock({ collapsed }: LogoBlockProps) {
  if (collapsed) {
    return (
      <div className="flex items-center justify-center">
        <img
          src="/logo-collapsed.png"
          alt="海联捷讯"
          className="select-none"
          draggable={false}
          style={{ width: '42px', height: '17px' }}
        />
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center">
      <img
        src="/logo-expanded.png"
        alt="海联捷讯 - 应用构建平台"
        className="select-none"
        draggable={false}
        style={{ height: '44px', width: 'auto' }}
      />
    </div>
  )
}
