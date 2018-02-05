import Link from 'next/link'

export default ({ pathname }) => (
  <header>
    <a href='/' className={pathname === '/' && 'is-active'}>Home</a>
    <a href='/about' className={pathname === '/about' && 'is-active'}>About</a>

    <style jsx>{`
      header {
        margin-bottom: 25px;
      }
      a {
        font-size: 14px;
        margin-right: 15px;
        text-decoration: none;
      }
      .is-active {
        text-decoration: underline;
      }
    `}</style>
  </header>
)
