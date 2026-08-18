import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import './Layout.css';

export default function Layout({ children }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <div className="layout">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="layout-main">
        <button className="mobile-menu-btn" onClick={() => setOpen(true)} aria-label="Open menu">☰ Menu</button>
        <div className="layout-content">{children}</div>
      </div>
    </div>
  );
}
