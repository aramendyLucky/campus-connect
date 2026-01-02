import { motion } from 'framer-motion';
import { MapPin, Clock, Shield, CheckCircle } from 'lucide-react';

const features = [
  {
    icon: MapPin,
    title: 'Geofencing',
    description: 'Validación GPS con precisión de 1000m',
  },
  {
    icon: Clock,
    title: 'Tiempo Real',
    description: 'Registro instantáneo de asistencia',
  },
  {
    icon: Shield,
    title: 'Seguro',
    description: 'Datos encriptados y protegidos',
  },
  {
    icon: CheckCircle,
    title: 'Automatizado',
    description: 'Sincronización con Google Sheets',
  },
];

const HeroSection = () => {
  return (
    <div className="text-center mb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-6"
      >
        <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
        Sistema Activo
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight"
      >
        Control de Presentismo
        <br />
        <span className="text-primary">Universitario</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-lg text-muted-foreground max-w-lg mx-auto mb-10"
      >
        Registra tu asistencia de forma segura utilizando tu ubicación GPS.
        Compatible con Ingeniería y Maestría.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto"
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
            className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card/50 border border-border/50"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <feature.icon className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-medium text-sm text-foreground">
              {feature.title}
            </h3>
            <p className="text-xs text-muted-foreground text-center">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default HeroSection;
