import { motion } from 'framer-motion';
import { GraduationCap, Shield, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full py-4 px-6 border-b border-border/50 bg-card/50 backdrop-blur-md sticky top-0 z-50"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <GraduationCap className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="font-semibold text-foreground text-lg leading-tight">
              Sistema de Asistencia
            </h1>
            <p className="text-xs text-muted-foreground">
              Control de Presentismo Universitario
            </p>
          </div>
        </Link>

        <nav className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/dashboard" className="flex items-center gap-2">
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link to="/login" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Bedeles
            </Link>
          </Button>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
