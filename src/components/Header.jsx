import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="header">
      <Link to="/" className="logo">Heritage Archive</Link>
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/browse">Browse</Link>
        <Link to="/help">Help</Link>
      </nav>
    </header>
  )
}
