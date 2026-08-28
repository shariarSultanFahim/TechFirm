import * as React from "react";

import { Clock, Mail, Phone } from "lucide-react";

import { FacebookIcon, InstagramIcon, LinkedinIcon, TwitterIcon } from "./social-icons";

export function TopUtilityBar() {
  return (
    <div className="bg-dark-bg border-dark-border w-full border-b px-4 py-2 text-xs text-gray-300">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 sm:flex-row">
        <div className="flex flex-wrap items-center gap-4">
          <span className="hover:text-primary flex items-center gap-1.5 transition-colors">
            <Mail className="text-primary h-3.5 w-3.5" />
            contact@techfirm.com
          </span>
          <span className="hover:text-primary flex items-center gap-1.5 transition-colors">
            <Phone className="text-primary h-3.5 w-3.5" />
            +1 (555) 234-5678
          </span>
          <span className="hidden items-center gap-1.5 text-gray-400 md:flex">
            <Clock className="text-primary h-3.5 w-3.5" />
            Mon - Fri: 9:00 AM - 6:00 PM
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-gray-400">Follow Us:</span>
          <a href="#" className="hover:text-primary transition-colors" aria-label="Facebook">
            <FacebookIcon className="h-3.5 w-3.5" />
          </a>
          <a href="#" className="hover:text-primary transition-colors" aria-label="Twitter">
            <TwitterIcon className="h-3.5 w-3.5" />
          </a>
          <a href="#" className="hover:text-primary transition-colors" aria-label="LinkedIn">
            <LinkedinIcon className="h-3.5 w-3.5" />
          </a>
          <a href="#" className="hover:text-primary transition-colors" aria-label="Instagram">
            <InstagramIcon className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
