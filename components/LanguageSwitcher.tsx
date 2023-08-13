import { clsx } from 'clsx'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { LOCALES } from '~/constant'
import { Image } from './Image'
import { Popover, PopoverContent, PopoverTrigger } from './ui/Popover'

function getLocale(code: string) {
  return LOCALES.find((locale) => locale.code === code)
}

export function LanguageSwitcher() {
  let router = useRouter()
  let [localeCode, setLocaleCode] = useState(router.locale)
  let currentLocale = getLocale(localeCode)

  useEffect(() => {
    setLocaleCode(router.locale)
  }, [router.locale])

  function handleChange(newLocale: string) {
    router.push(router.pathname, router.asPath, { locale: newLocale })
  }

  return (
    <Popover>
      <PopoverTrigger className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
        <Image
          src={currentLocale.flag}
          alt={currentLocale.name}
          width={20}
          height={20}
          shouldOpenLightbox={false}
        />
      </PopoverTrigger>
      <PopoverContent className="bg-white dark:bg-dark w-32">
        <ul className="space-y-1">
          {router.locales.map((code) => {
            let locale = getLocale(code)
            return (
              <li key={code}>
                <button
                  onClick={() => handleChange(code)}
                  className={clsx(
                    'inline-flex font-normal items-center gap-3 px-2 py-1 rounded w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700',
                    code === localeCode && 'text-primary-500 dark:text-primary-400'
                  )}
                >
                  <Image
                    src={locale.flag}
                    alt={locale.name}
                    width={20}
                    height={20}
                    shouldOpenLightbox={false}
                    className="shrink-0"
                  />
                  <span>{locale.name}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </PopoverContent>
    </Popover>
  )
}
