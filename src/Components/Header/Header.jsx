import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/register-rbs">RegisterRBS</Link>
        <Link to="/register-bs">RegisterBS</Link>
    </nav>
  )
}
