import { Compass } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-muted/40 border-t mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                <Compass className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold font-display">TravelBuddy</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Connect with fellow travelers, share adventures, and explore the world together.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-4">Discover</h4>
            <div className="space-y-2.5">
              <Link href="/explore" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Explore Travelers</Link>
              <Link href="/find-buddy" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Find Travel Buddy</Link>
              <Link href="/subscription" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Premium Plans</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-4">Company</h4>
            <div className="space-y-2.5">
              <span className="block text-sm text-muted-foreground">About Us</span>
              <span className="block text-sm text-muted-foreground">Careers</span>
              <span className="block text-sm text-muted-foreground">Contact</span>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-4">Legal</h4>
            <div className="space-y-2.5">
              <span className="block text-sm text-muted-foreground">Privacy Policy</span>
              <span className="block text-sm text-muted-foreground">Terms of Service</span>
              <span className="block text-sm text-muted-foreground">Cookie Policy</span>
            </div>
          </div>
        </div>
        <div className="border-t mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">© 2026 TravelBuddy. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="text-xs text-muted-foreground">Twitter</span>
            <span className="text-xs text-muted-foreground">Instagram</span>
            <span className="text-xs text-muted-foreground">Facebook</span>
          </div>
        </div>
      </div>
    </footer>
  );
}