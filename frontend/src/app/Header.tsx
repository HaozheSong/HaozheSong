'use client'
import Link from 'next/link'
import * as HeaderIcon from './HeaderIcon'
import { usePathname } from 'next/navigation'

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

export default function Header () {
  return (
    <header className='flex justify-between h-12 px-4 bg-slate-900 text-sky-400'>
      <span className='flex flex-wrap content-center text-2xl'>
        {HEADER.title}
      </span>
      <span className='flex flex-wrap content-center'>
        {HEADER.links.map(link => (
          <HeaderLink link={link} key={link.text} />
        ))}
      </span>
    </header>
  )
}

function HeaderLink ({ link }: { link: HeaderLink }) {
  const pathname = usePathname()
  const isActive = pathname === link.href
  const baseLinkClass = 'mr-4 hover:text-orange-500'
  const activeLinkClass = baseLinkClass + ' text-orange-400'
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
