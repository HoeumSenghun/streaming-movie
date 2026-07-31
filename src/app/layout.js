import './globals.css'

/**
 * Pass-through root layout so `[locale]/layout` can own `<html lang>` / `<body>`.
 * Required because a root `not-found.js` exists.
 */
export default function RootLayout ({ children }) {
  return children
}
