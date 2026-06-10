import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FaGithub as Github, FaTwitter as Twitter, FaLinkedin as Linkedin } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-foreground/5 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-heading font-bold tracking-tighter text-foreground">
                SKALE<span className="text-primary">KRAFT</span>
              </span>
            </Link>
            <p className="text-muted-foreground max-w-sm">
              We create websites, apps, AI agents, and growth systems that help businesses scale faster.
            </p>
            <div className="flex space-x-4 pt-2">
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin size={20} />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github size={20} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-heading font-semibold text-foreground">Services</h3>
            <ul className="space-y-2">
              <li><Link href="/services#web" className="text-muted-foreground hover:text-primary transition-colors">Website Development</Link></li>
              <li><Link href="/services#app" className="text-muted-foreground hover:text-primary transition-colors">App Development</Link></li>
              <li><Link href="/services#ai" className="text-muted-foreground hover:text-primary transition-colors">AI Agents</Link></li>
              <li><Link href="/services#marketing" className="text-muted-foreground hover:text-primary transition-colors">Digital Marketing</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-heading font-semibold text-foreground">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/portfolio" className="text-muted-foreground hover:text-primary transition-colors">Portfolio</Link></li>
              <li><Link href="/case-studies" className="text-muted-foreground hover:text-primary transition-colors">Case Studies</Link></li>
              <li><Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-heading font-semibold text-foreground">Stay Updated</h3>
            <p className="text-muted-foreground">Subscribe to our newsletter for the latest insights.</p>
            <form className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-card border border-foreground/10 rounded-md px-4 py-2 text-sm text-foreground focus:outline-none focus:border-primary w-full"
              />
              <Button type="submit" size="icon" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <ArrowRight size={18} />
              </Button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-foreground/5 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} SkaleKraft. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
