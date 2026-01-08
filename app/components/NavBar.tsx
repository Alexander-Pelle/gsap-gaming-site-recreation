"use client";

const NavBar = () => {
  return (
    <nav id="nav-container">
        <div className="nav-left">
          <h1 className="
            font-zentry-regular italic 
            text-2xl
            ">ZENTRY</h1>
          <button className="nav-button">PRODCUTS</button>
          <button className="nav-button">WHITEPAPER</button>
        </div>
        

        <div className="nav-right">
          <button className="nav-link">ZTERMINAL</button>
          <button className="nav-link">ABOUT</button>
          <button className="nav-link">CONTACT</button>
        </div>
    </nav>
  )
}

export default NavBar
