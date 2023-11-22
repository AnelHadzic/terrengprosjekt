import Link from "next/link"

type ButtonProps = {
  route: string
  children: React.ReactNode
}

export default function LinkButton({ route, children }: ButtonProps) {
  return (
    <Link
      href={route}
      className="m-4 inline-flex items-center gap-2 rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      {children}
    </Link>
  )
}
