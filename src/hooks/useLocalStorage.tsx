import { Dispatch, SetStateAction, useEffect, useState } from 'react'

const PREFIXKEY = 'WA_CLONE-'
export const useLocalStorage = <T, >(key: string, initialValue: T | null = null): [T, Dispatch<SetStateAction<T>>] => {
  const prefixedKey = PREFIXKEY + key
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixedKey)
    if (jsonValue !== null) {
      return JSON.parse(jsonValue)
    }

    if (typeof initialValue === 'function') {
      return initialValue()
    } else {
      return initialValue
    }
  })

  useEffect(() => {
    console.log(value)
    localStorage.setItem(prefixedKey, JSON.stringify(value))
  }, [prefixedKey, value])

  return [value, setValue]
}
