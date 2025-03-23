import React, { useState } from "react";

function Navbar({ theme }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className={`navbar ${
        theme === "dark" ? "navbar-dark bg-dark" : "navbar-light bg-light"
      } sticky-top shadow-sm`}
      style={{
        backdropFilter: "blur(10px)",
        background:
          theme === "dark"
            ? "rgba(30, 30, 47, 0.8)"
            : "rgba(245, 247, 250, 0.8)",
      }}
    >
      <div className="container">
        <a
          className="navbar-brand fw-bold"
          href="#"
          style={{ fontSize: "1.5rem" }}
        >
          Aryan's Portfolio - Lab 7
        </a>
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link px-3" href="#home">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link px-3" href="#skills">
                Skills
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link px-3" href="#projects">
                Projects
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
