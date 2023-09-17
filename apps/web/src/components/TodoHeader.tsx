import Image from 'next/image';
import { BsSun, BsMoon } from 'react-icons/bs';
import { useTheme } from 'next-themes';

export default function TodoHeader() {
  const { theme, systemTheme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  return (
    <>
      <Image
        src={`/images/${
          currentTheme === 'light' ? 'bg-desktop-light' : 'bg-desktop-dark'
        }.jpg`}
        className='absolute left-0 top-0 -z-10 h-2/5 w-full select-none object-cover'
        width={1440}
        height={300}
        alt='TopImage'
      />
      <div
        className={`absolute bottom-0 left-0 -z-10 h-3/5 w-full bg-white transition-colors duration-300 dark:bg-[#181824]`}
      />
      <div className='content mx-auto mt-32 w-[500px]'>
        <div className='text mb-10 flex items-center justify-between text-white'>
          <h1 className='text-4xl font-bold tracking-widest '>TODO</h1>
          <div
            className='mode cursor-pointer'
            onClick={() =>
              theme == 'dark' ? setTheme('light') : setTheme('dark')
            }
          >
            {currentTheme === 'light' ? (
              <BsMoon size={30} />
            ) : (
              <BsSun size={30} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
