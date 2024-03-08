'use client'
import Link from 'next/link'
import * as HeaderIcon from './HeaderIcon'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

interface HeaderLink {
  text: string
  href: string
  icon: JSX.Element
}

interface Header {
  title: string
  links: HeaderLink[]
}

const HEADER: Header = {
  title: 'Haozhe Song',
  links: [
    { text: 'Home', href: '/', icon: HeaderIcon.HomeIcon },
    { text: 'Project', href: '/project', icon: HeaderIcon.ProjectIcon },
    { text: 'Skill', href: '/skill', icon: HeaderIcon.SkillIcon }
  ]
}

const defaultHeaderBgColor = ' bg-slate-900'
const defaultHeaderTextColor = 'text-sky-400'
const activeHeaderTextColor = 'text-orange-400'
const hoverHeaderTextColor = 'hover:text-orange-500'

export default function Header () {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <header className={`${defaultHeaderBgColor} ${defaultHeaderTextColor}`}>
      <div className='flex justify-between h-12 px-4' id='headerTitleRow'>
        <HeaderTitle />
        <InlineNav />
        <CollapseToggler collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>
      <CollapsedNav collapsed={collapsed} />
    </header>
  )
}

function HeaderTitle () {
  return (
    <span className='flex flex-wrap content-center text-2xl'>
      {HEADER.title}
    </span>
  )
}

function InlineNav () {
  return (
    <nav className='hidden sm:flex sm:flex-wrap sm:content-center'>
      {HEADER.links.map(link => (
        <HeaderLink link={link} key={link.text} />
      ))}
    </nav>
  )
}

function CollapseToggler ({
  collapsed,
  setCollapsed
}: {
  collapsed: boolean
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const togglerBaseClass = 'flex flex-wrap content-center transition sm:hidden'
  const togglerCollapsedClass = `${togglerBaseClass} ${activeHeaderTextColor} rotate-90`
  const togglerFoldedClass = `${togglerBaseClass}`
  return (
    <span
      className={collapsed ? togglerCollapsedClass : togglerFoldedClass}
      onClick={() => setCollapsed(!collapsed)}
    >
      {HeaderIcon.TogglerIcon}
    </span>
  )
}

function CollapsedNav ({ collapsed }: { collapsed: boolean }) {
  const baseClass =
    `absolute flex flex-col w-full px-4 pb-2 gap-y-2 transition duration-300 ` +
    `${defaultHeaderBgColor} ${defaultHeaderTextColor} sm:hidden`
  const collapsedClass = `${baseClass} opacity-95`
  const foldedClass = `${baseClass} opacity-0`
  return (
    <nav className={collapsed ? collapsedClass : foldedClass}>
      {HEADER.links.map(link => (
        <HeaderLink link={link} key={link.text} />
      ))}
    </nav>
  )
}

function HeaderLink ({ link }: { link: HeaderLink }) {
  const pathname = usePathname()
  const isActive = pathname === link.href
  const baseLinkClass = `mr-4 ${hoverHeaderTextColor}`
  const activeLinkClass = `${baseLinkClass} ${activeHeaderTextColor}`
  return (
    <Link
      href={link.href}
      className={isActive ? activeLinkClass : baseLinkClass}
    >
      {link.icon}
      {link.text}
    </Link>
  )
}
