
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Layers, 
  ImageIcon, 
  Type, 
  Download, 
  CheckCircle2, 
  Brain, 
  Palette, 
  Bot, 
  ArrowDown
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    setLoaded(true);
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <div className={`transition-all duration-700 ${loaded ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
              <div className="inline-flex items-center px-3 py-1 mb-6 text-sm font-medium rounded-full bg-secondary text-foreground/80">
                <Sparkles size={16} className="mr-2 text-primary" />
                <span>Powered by Gemini Flash 2.0</span>
              </div>
            </div>
            
            <h1 className={`font-display text-4xl md:text-6xl font-bold leading-tight md:leading-tight mb-6 transition-all duration-700 delay-100 ${loaded ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
              Create stunning presentations <span className="text-primary">in seconds</span> with AI
            </h1>
            
            <p className={`text-lg md:text-xl text-foreground/80 mb-10 max-w-3xl mx-auto transition-all duration-700 delay-200 ${loaded ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
              Transform your ideas into professionally designed presentations with just a prompt. 
              Let AI generate the content, apply beautiful templates, and create a presentation that stands out.
            </p>
            
            <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-300 ${loaded ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
              <Link to="/create" className="btn-primary text-lg px-8 py-4 shadow-blue-500/20">
                Create Presentation
                <ArrowRight size={18} className="ml-2" />
              </Link>
              <Link to="/api-key" className="btn-secondary text-lg px-8 py-4">
                Set Up API Key
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Preview Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container px-4 mx-auto">
          <div className="max-w-5xl mx-auto">
            <div className="shadow-2xl rounded-2xl overflow-hidden border border-white/40 animate-fade-in">
              <img 
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1200&h=675&fit=crop" 
                alt="Presentation Editor Preview" 
                className="w-full h-auto rounded-lg"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 md:py-28">
        <div className="container px-4 mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Everything you need to create perfect slides
            </h2>
            <p className="text-lg text-foreground/70">
              Our AI-powered platform combines content generation, beautiful design, 
              and seamless editing to transform how you create presentations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Bot className="text-primary" size={32} />}
              title="AI-Generated Content"
              description="Let Gemini Flash 2.0 generate professional, engaging content based on your topic."
            />
            <FeatureCard 
              icon={<Palette className="text-primary" size={32} />}
              title="Beautiful Templates"
              description="Choose from multiple professionally designed templates that make your content shine."
            />
            <FeatureCard 
              icon={<ImageIcon className="text-primary" size={32} />}
              title="Unsplash Integration"
              description="Automatically find and add relevant high-quality images from Unsplash."
            />
            <FeatureCard 
              icon={<Type className="text-primary" size={32} />}
              title="Typography Options"
              description="Access Google Fonts to customize your presentation with the perfect typography."
            />
            <FeatureCard 
              icon={<Layers className="text-primary" size={32} />}
              title="Flexible Editing"
              description="Edit every aspect of your slides with an intuitive interface designed for ease of use."
            />
            <FeatureCard 
              icon={<Download className="text-primary" size={32} />}
              title="Export Options"
              description="Download your presentation in multiple formats ready to use anywhere."
            />
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-20 md:py-28 bg-secondary/30">
        <div className="container px-4 mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Create a presentation in 3 simple steps
            </h2>
            <p className="text-lg text-foreground/70">
              Our streamlined process makes creating professional presentations faster than ever before.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <StepCard 
              number="01"
              title="Enter your topic"
              description="Provide a topic and any specific details about what you want in your presentation."
            />
            <div className="hidden md:flex items-center justify-center">
              <ArrowRight className="text-primary/30" size={40} />
            </div>
            <StepCard 
              number="02"
              title="Review and edit content"
              description="Our AI generates slide content which you can review, edit, or regenerate as needed."
            />
            <div className="hidden md:flex items-center justify-center">
              <ArrowRight className="text-primary/30" size={40} />
            </div>
            <StepCard 
              number="03"
              title="Customize and export"
              description="Apply templates, adjust design elements, add images, and export your finished presentation."
            />
          </div>
          
          <div className="text-center mt-16">
            <Link to="/create" className="btn-primary inline-flex items-center shadow-blue-500/20">
              Start Creating Now
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Testimonials (placeholder) */}
      <section className="py-20 md:py-28">
        <div className="container px-4 mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              What our users are saying
            </h2>
            <p className="text-lg text-foreground/70">
              Join thousands of professionals who create stunning presentations with our platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard 
              quote="This tool has transformed how I create presentations. What used to take hours now takes minutes."
              author="Alex Johnson"
              role="Marketing Director"
            />
            <TestimonialCard 
              quote="The quality of content generated is impressive. I just make a few tweaks and my presentations look professional."
              author="Sarah Williams"
              role="Product Manager"
            />
            <TestimonialCard 
              quote="As a teacher, this tool helps me create engaging lesson presentations in a fraction of the time."
              author="Michael Chen"
              role="Education Professional"
            />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-primary text-primary-foreground">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Ready to transform your presentations?
            </h2>
            <p className="text-xl opacity-90 mb-10">
              Start creating beautiful, content-rich presentations today with our AI-powered platform.
            </p>
            <Link 
              to="/create" 
              className="bg-white text-primary hover:bg-white/90 rounded-full px-8 py-4 font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] inline-flex items-center"
            >
              Get Started For Free
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

const FeatureCard = ({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string 
}) => {
  return (
    <div className="hover-card p-6 h-full bg-white">
      <div className="mb-5">{icon}</div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-foreground/70">{description}</p>
    </div>
  );
};

const StepCard = ({ 
  number, 
  title, 
  description 
}: { 
  number: string; 
  title: string; 
  description: string 
}) => {
  return (
    <div className="hover-card p-6 bg-white text-center h-full flex flex-col items-center">
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        <span className="text-primary font-bold">{number}</span>
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-foreground/70">{description}</p>
    </div>
  );
};

const TestimonialCard = ({ 
  quote, 
  author, 
  role 
}: { 
  quote: string; 
  author: string; 
  role: string 
}) => {
  return (
    <div className="hover-card p-6 bg-white h-full flex flex-col">
      <div className="text-primary mb-4">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.3333 6.66667V20H5V6.66667H18.3333ZM18.3333 3.33333H5C3.16667 3.33333 1.66667 4.83333 1.66667 6.66667V20C1.66667 21.8333 3.16667 23.3333 5 23.3333H18.3333C20.1667 23.3333 21.6667 21.8333 21.6667 20V6.66667C21.6667 4.83333 20.1667 3.33333 18.3333 3.33333ZM15 13.3333H8.33333V16.6667H15V13.3333ZM11.6667 10H8.33333V11.6667H11.6667V10ZM35 6.66667V20H21.6667V6.66667H35ZM35 3.33333H21.6667C19.8333 3.33333 18.3333 4.83333 18.3333 6.66667V20C18.3333 21.8333 19.8333 23.3333 21.6667 23.3333H35C36.8333 23.3333 38.3333 21.8333 38.3333 20V6.66667C38.3333 4.83333 36.8333 3.33333 35 3.33333ZM31.6667 13.3333H25V16.6667H31.6667V13.3333ZM28.3333 10H25V11.6667H28.3333V10Z" fill="currentColor"/>
        </svg>
      </div>
      <p className="text-lg mb-6 flex-grow italic">{quote}</p>
      <div>
        <p className="font-semibold">{author}</p>
        <p className="text-sm text-foreground/60">{role}</p>
      </div>
    </div>
  );
};

export default Index;
