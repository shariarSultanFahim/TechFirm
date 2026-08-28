import * as React from "react";
import { Mail, Phone, Clock, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export function TopUtilityBar() {
  return (
    <div className="w-full bg-dark-bg text-gray-300 text-xs py-2 px-4 border-b border-dark-border">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
        <div className="flex flex-wrap items-center gap-4">
          <span className="flex items-center gap-1.5 hover:text-primary transition-colors">
            <Mail className="w-3.5 h-3.5 text-primary" />
            contact@techfirm.com
          </span>
          <span className="flex items-center gap-1.5 hover:text-primary transition-colors">
            <Phone className="w-3.5 h-3.5 text-primary" />
            +1 (555) 234-5678
          </span>
          <span className="hidden md:flex items-center gap-1.5 text-gray-400">
            <Clock className="w-3.5 h-3.5 text-primary" />
            Mon - Fri: 9:00 AM - 6:00 PM
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-gray-400">Follow Us:</span>
          <a href="#" className="hover:text-primary transition-colors" aria-label="Facebook">
            <Facebook className="w-3.5 h-3.5" />
          </a>
          <a href="#" className="hover:text-primary transition-colors" aria-label="Twitter">
            <Twitter className="w-3.5 h-3.5" />
          </a>
          <a href="#" className="hover:text-primary transition-colors" aria-label="LinkedIn">
            <Linkedin className="w-3.5 h-3.5" />
          </a>
          <a href="#" className="hover:text-primary transition-colors" aria-label="Instagram">
            <Instagram className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
