import { Coins } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-purple-500/20 mt-8 backdrop-blur-sm bg-slate-900/50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Coins className="w-4 h-4 text-purple-400" />
            <span className="text-white text-sm font-medium">CryptoFaucet Hub</span>
          </div>
          <p className="text-purple-300 text-xs">© 2026 CryptoFaucet Hub. All rights reserved.</p>
          <div className="flex gap-4 text-sm">
            <a href="#" className="text-purple-300 hover:text-white transition-colors">
              Terms
            </a>
            <a href="#" className="text-purple-300 hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="text-purple-300 hover:text-white transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
