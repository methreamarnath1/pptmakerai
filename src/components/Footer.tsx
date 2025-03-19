
import { FileSliders, Github, Twitter, Heart, Download, FileText, Presentation } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full py-12 bg-secondary/50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          <div className="flex flex-col space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <FileSliders size={24} className="text-primary" />
              <span className="font-display text-lg font-semibold">PPTMaker.ai</span>
            </Link>
            <p className="text-muted-foreground text-sm mt-2">
              Create beautifully designed presentations with AI. No design skills required.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link to="/export-formats" className="flex items-center text-xs font-medium text-foreground/70 hover:text-primary">
                <Presentation size={14} className="mr-1" />
                PPT
              </Link>
              <Link to="/export-formats" className="flex items-center text-xs font-medium text-foreground/70 hover:text-primary">
                <FileText size={14} className="mr-1" />
                PDF
              </Link>
              <Link to="/export-formats" className="flex items-center text-xs font-medium text-foreground/70 hover:text-primary">
                <Download size={14} className="mr-1" />
                DOCX
              </Link>
            </div>
          </div>
          
          <div className="col-span-1 sm:col-span-1">
            <h4 className="font-medium text-lg mb-4">Product</h4>
            <ul className="space-y-3">
              <FooterLink to="/create">Create Presentation</FooterLink>
              <FooterLink to="/templates">Templates</FooterLink>
              <FooterLink to="/api-key">API Setup</FooterLink>
              <FooterLink to="/help">Help Center</FooterLink>
            </ul>
          </div>
          
          <div className="hidden md:block">
            <h4 className="font-medium text-lg mb-4">Resources</h4>
            <ul className="space-y-3">
              <FooterLink to="/blog">Blog</FooterLink>
              <FooterLink to="/guides">Guides</FooterLink>
              <FooterLink to="/examples">Examples</FooterLink>
              <FooterLink to="/documentation">Documentation</FooterLink>
            </ul>
          </div>
          
          <div className="hidden md:block">
            <h4 className="font-medium text-lg mb-4">Company</h4>
            <ul className="space-y-3">
              <FooterLink to="/about">About Us</FooterLink>
              <FooterLink to="/careers">Careers</FooterLink>
              <FooterLink to="/privacy">Privacy Policy</FooterLink>
              <FooterLink to="/terms">Terms of Service</FooterLink>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} PPTMaker.ai. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-6 mt-6 md:mt-0">
            <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
              <Github size={20} />
            </a>
            <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
              <Twitter size={20} />
            </a>
            <span className="flex items-center text-sm text-muted-foreground">
              Made with <Heart size={14} className="mx-1 text-red-500" /> by PPTMaker.ai
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
  return (
    <li>
      <Link 
        to={to}
        className="text-foreground/70 hover:text-primary transition-colors"
      >
        {children}
      </Link>
    </li>
  );
};

export default Footer;
