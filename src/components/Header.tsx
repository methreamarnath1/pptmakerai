
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FileSliders, 
  GalleryThumbnails, 
  LayoutTemplate, 
  Key, 
  Home,
  Menu,
  X,
  Moon,
  Sun,
  Download
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  useEffect(() => {
    // Close mobile menu when route changes
    setMobileMenuOpen(false);
  }, [location.pathname]);
  
  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link 
          to="/" 
          className="flex items-center gap-2 transition-all hover:opacity-90"
        >
          <FileSliders size={28} className="text-primary" />
          <span className="font-display text-xl font-semibold tracking-tight">
            PPTMaker.ai
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink to="/" active={isActive('/')}>
            <Home size={18} className="mr-2" />
            Home
          </NavLink>
          <NavLink to="/api-key" active={isActive('/api-key')}>
            <Key size={18} className="mr-2" />
            API Key
          </NavLink>
          <NavLink to="/create" active={isActive('/create')}>
            <GalleryThumbnails size={18} className="mr-2" />
            Create
          </NavLink>
          <NavLink to="/editor" active={isActive('/editor')}>
            <LayoutTemplate size={18} className="mr-2" />
            Editor
          </NavLink>
        </nav>
        
        <div className="hidden md:flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-secondary transition-colors dark:hover:bg-gray-800"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun size={20} className="text-primary" />
            ) : (
              <Moon size={20} className="text-primary" />
            )}
          </button>
          
          {/* Create Button */}
          <Link 
            to="/create" 
            className="flex btn-primary shadow-lg hover:shadow-primary/20 text-sm md:text-base"
          >
            Create Presentation
          </Link>
        </div>
        
        {/* Mobile Header Controls */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-secondary/60 transition-colors dark:hover:bg-gray-800"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun size={20} className="text-primary" />
            ) : (
              <Moon size={20} className="text-primary" />
            )}
          </button>
          
          <button 
            className="p-2 text-foreground"
            onClick={toggleMobileMenu}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 pt-20 bg-background animate-fade-in">
          <div className="container px-6 py-8 mx-auto h-full flex flex-col">
            <nav className="flex flex-col gap-6">
              <MobileNavLink to="/" active={isActive('/')} onClick={toggleMobileMenu}>
                <Home size={20} className="mr-3" />
                Home
              </MobileNavLink>
              <MobileNavLink to="/api-key" active={isActive('/api-key')} onClick={toggleMobileMenu}>
                <Key size={20} className="mr-3" />
                API Key
              </MobileNavLink>
              <MobileNavLink to="/create" active={isActive('/create')} onClick={toggleMobileMenu}>
                <GalleryThumbnails size={20} className="mr-3" />
                Create
              </MobileNavLink>
              <MobileNavLink to="/editor" active={isActive('/editor')} onClick={toggleMobileMenu}>
                <LayoutTemplate size={20} className="mr-3" />
                Editor
              </MobileNavLink>
              
              <div className="mt-6 flex flex-col gap-4">
                <Link 
                  to="/create" 
                  className="btn-primary w-full justify-center shadow-lg hover:shadow-primary/20"
                  onClick={toggleMobileMenu}
                >
                  Create Presentation
                </Link>
                
                <button 
                  className="btn-secondary w-full justify-center"
                  onClick={toggleMobileMenu}
                >
                  <Download size={18} className="mr-2" />
                  Download Templates
                </button>
              </div>
            </nav>
            
            <div className="mt-auto text-center">
              <span className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} PPTMaker.ai
              </span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

const NavLink = ({ 
  to, 
  active, 
  children 
}: { 
  to: string; 
  active: boolean; 
  children: React.ReactNode 
}) => {
  return (
    <Link
      to={to}
      className={`flex items-center transition-all duration-200 font-medium hover:text-primary ${
        active ? 'text-primary' : 'text-foreground/70'
      }`}
    >
      {children}
    </Link>
  );
};

const MobileNavLink = ({ 
  to, 
  active, 
  children,
  onClick
}: { 
  to: string; 
  active: boolean; 
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <Link
      to={to}
      className={`flex items-center py-3 text-lg transition-all duration-200 font-medium hover:text-primary ${
        active ? 'text-primary' : 'text-foreground/70'
      }`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default Header;
