import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Mail, Lock, Loader2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulación de login - En producción conectar con backend
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Login de prueba
    if (email === 'bedel@universidad.edu' && password === 'admin123') {
      toast({
        title: 'Bienvenido',
        description: 'Acceso autorizado al dashboard',
      });
      navigate('/dashboard');
    } else {
      toast({
        variant: 'destructive',
        title: 'Error de autenticación',
        description: 'Credenciales incorrectas. Intente nuevamente.',
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Botón volver */}
        <Button
          variant="ghost"
          size="sm"
          className="mb-6"
          asChild
        >
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>
        </Button>

        <div className="glass-card rounded-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-semibold text-foreground">
              Acceso Bedeles
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              Ingrese sus credenciales para acceder al dashboard de gestión
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                Email institucional
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="bedel@universidad.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11"
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium flex items-center gap-2">
                <Lock className="w-4 h-4 text-muted-foreground" />
                Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11"
                required
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              variant="hero"
              size="lg"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Verificando...
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4" />
                  Iniciar Sesión
                </>
              )}
            </Button>
          </form>

          {/* Demo credentials */}
          <div className="mt-6 p-4 rounded-lg bg-accent/50 text-center">
            <p className="text-xs text-muted-foreground mb-2">
              Credenciales de prueba:
            </p>
            <p className="text-sm font-mono text-accent-foreground">
              bedel@universidad.edu / admin123
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
