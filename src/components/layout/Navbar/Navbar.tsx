import { useEffect, useRef, useState } from 'react';
import HambergerMenu from '@/components/ui/svg/HambergerMenu';
import YoutubeLogo from '@/components/ui/svg/YoutubeLogo';
import Upload from '@/components/ui/svg/Upload';
import UserProfile from '@/components/layout/Navbar/UserProfile';
import Search from '@/components/layout/Navbar/Search';
import UserNotification from '@/components/layout/Navbar/UserNotification';
import { useLocation, useNavigate } from 'react-router-dom';
import useMediaQuery from '@/hooks/useMediaQuery';
import { IoMdMic } from 'react-icons/io';
import { cn } from '@/utils/cn';
import SearchSvg from '@/components/ui/svg/SearchSvg';
import { Button } from '@/components/ui/Button';
import { navbarFilter } from '@/data/constants';
import useSidebar from '@/store/useSidebarStore';
import CategoryPills from '@/components/element/CategoryPills';

const Navbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const inputSearchRef = useRef<HTMLInputElement | null>(null);
  const { setSidebarActive, sidebarActive } = useSidebar();
  const [searchActive, setSearchActive] = useState(false);
  const [navFilter, setNavFilter] = useState('all');

  const isDekstop = useMediaQuery('(min-width: 768px)');

  useEffect(() => {
    if (inputSearchRef.current && searchActive) inputSearchRef.current.focus();
  }, [searchActive]);

  useEffect(() => {
    if (isDekstop) setSearchActive(false);
  }, [isDekstop]);

  return (
    <header className="fixed w-full top-0 left-0 right-0 px-4 sm:px-6 py-2 bg-white z-20">
      <nav className="flex justify-between gap-10 md:gap-20">
        <div
          className={cn('flex flex-shrink-0 items-center gap-4 -ml-2', {
            hidden: searchActive,
          })}
        >
          <Button
            onClick={() => {
              if (typeof setSidebarActive === 'function') setSidebarActive();
            }}
            variant="ghost"
            size="icon"
          >
            <HambergerMenu />
          </Button>
          <div onClick={() => navigate('/')} className="logo cursor-pointer">
            <YoutubeLogo className="w-[90px]" />
          </div>
        </div>

        <Search ref={inputSearchRef} state={{ searchActive, setSearchActive }} />

        <div
          className={cn('flex flex-shrink-0 md:gap-2', {
            hidden: searchActive,
          })}
        >
          <Button
            onClick={() => setSearchActive(!searchActive)}
            variant="ghost"
            size="icon"
            className="md:hidden"
          >
            <SearchSvg />
          </Button>
          <Button variant="ghost" size="icon" className="hidden xs:flex md:hidden">
            <IoMdMic size={20} />
          </Button>
          <Button variant="ghost" size="icon">
            <Upload />
          </Button>
          <UserNotification />
          <UserProfile />
        </div>
      </nav>

      {pathname === '/' && (
        <div
          className={cn('md:ml-16 mt-5', {
            'xl:ml-[240px]': sidebarActive,
          })}
        >
          <CategoryPills>
            {navbarFilter.map((item: string, index: number) => (
              <Button
                variant={navFilter === item ? 'default' : 'secondary'}
                size="sm"
                key={index}
                onClick={() => setNavFilter(item)}
                className="rounded-lg capitalize text-sm font-medium whitespace-nowrap snap-end"
              >
                {item}
              </Button>
            ))}
          </CategoryPills>
        </div>
      )}
    </header>
  );
};

export default Navbar;
