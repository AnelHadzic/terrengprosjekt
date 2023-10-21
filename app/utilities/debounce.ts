// Based on https://dev.to/codeofrelevancy/debounce-in-nextjs-4b4m

export default function debounce(func: Function, delay: number) {
  let timer: NodeJS.Timeout
  return (...args: any[]) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func(...args)
    }, delay)
  }
}
