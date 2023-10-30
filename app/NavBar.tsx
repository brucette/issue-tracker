import classnames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GiLadybug } from 'react-icons/gi';

const NavBar = () => {

  const links = [
    {label: 'Dashboard', href: '/'},
    {label: 'Issues', href: '/issues'}
  ];

  return (
    <nav className='flex space-x-6 border-b mb-4 px-5 h-14 items-center'>
        <Link href='/'>
          <GiLadybug />
        </Link>
        <ul className='flex space-x-6'>
            {links.map(link => 
              <Link 
                key={link.href} 
                href={link.href} 
                className='text-zinc-500 hover:text-zinc-800 transition-colors'>
                    {link.label}
              </Link>)}
        </ul>
    </nav>
  )
}

export default NavBar;