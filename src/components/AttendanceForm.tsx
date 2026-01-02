import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, User, BookOpen, Loader2, CheckCircle, AlertCircle, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Carrera, Coordenadas } from '@/types';
import { getMateriasPorCarrera } from '@/data/materias';
import { obtenerUbicacionActual, validarUbicacion } from '@/utils/geolocation';

interface FormData {
  email: string;
  nombre: string;
  apellido: string;
  carrera: Carrera | '';
  materiaId: string;
}

const AttendanceForm = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    nombre: '',
    apellido: '',
    carrera: '',
    materiaId: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [ubicacion, setUbicacion] = useState<Coordenadas | null>(null);
  const { toast } = useToast();

  const materiasDisponibles = formData.carrera
    ? getMateriasPorCarrera(formData.carrera)
    : [];

  const handleCarreraChange = (value: Carrera) => {
    setFormData((prev) => ({
      ...prev,
      carrera: value,
      materiaId: '', // Resetear materia al cambiar carrera
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Paso 1: Obtener ubicación GPS
      const coords = await obtenerUbicacionActual();
      setUbicacion(coords);

      // Paso 2: Validar ubicación con fórmula de Haversine
      const resultado = validarUbicacion(coords);

      if (!resultado.esValido) {
        toast({
          variant: 'destructive',
          title: 'Ubicación fuera de rango',
          description: resultado.mensaje,
        });
        setIsLoading(false);
        return;
      }

      // Paso 3: Enviar datos al backend (simulated)
      const registroAsistencia = {
        fecha_hora: new Date().toISOString(),
        email_alumno: formData.email,
        nombre: formData.nombre,
        apellido: formData.apellido,
        carrera: formData.carrera,
        materia_id: formData.materiaId,
        latitud_gps: coords.latitud,
        longitud_gps: coords.longitud,
        ubicacion_aceptada: 'SI',
      };

      console.log('Registro de asistencia:', registroAsistencia);

      // Simular delay de red
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setIsSuccess(true);
      toast({
        title: '¡Asistencia registrada!',
        description: `${resultado.mensaje}`,
      });

      // Resetear formulario después de 3 segundos
      setTimeout(() => {
        setFormData({
          email: '',
          nombre: '',
          apellido: '',
          carrera: '',
          materiaId: '',
        });
        setUbicacion(null);
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      const mensaje = error instanceof Error ? error.message : 'Error desconocido';
      toast({
        variant: 'destructive',
        title: 'Error al registrar asistencia',
        description: mensaje,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid =
    formData.email &&
    formData.nombre &&
    formData.apellido &&
    formData.carrera &&
    formData.materiaId;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="glass-card rounded-2xl p-8 relative overflow-hidden">
        {/* Decoración de fondo */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/30 rounded-full translate-y-1/2 -translate-x-1/2" />

        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mb-4"
              >
                <CheckCircle className="w-10 h-10 text-success" />
              </motion.div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                ¡Asistencia Registrada!
              </h3>
              <p className="text-muted-foreground text-sm">
                Tu ubicación fue validada correctamente
              </p>
              {ubicacion && (
                <p className="text-xs text-muted-foreground mt-2">
                  📍 {ubicacion.latitud.toFixed(6)}, {ubicacion.longitud.toFixed(6)}
                </p>
              )}
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="space-y-5 relative z-10"
            >
              {/* Header */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-3">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">
                  Registro de Asistencia
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Completa tus datos para registrar tu presencia
                </p>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  Email institucional
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="alumno@universidad.edu"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="h-11"
                  required
                />
              </div>

              {/* Nombre y Apellido */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="nombre" className="text-sm font-medium">
                    Nombre
                  </Label>
                  <Input
                    id="nombre"
                    type="text"
                    placeholder="Juan"
                    value={formData.nombre}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, nombre: e.target.value }))
                    }
                    className="h-11"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="apellido" className="text-sm font-medium">
                    Apellido
                  </Label>
                  <Input
                    id="apellido"
                    type="text"
                    placeholder="Pérez"
                    value={formData.apellido}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, apellido: e.target.value }))
                    }
                    className="h-11"
                    required
                  />
                </div>
              </div>

              {/* Carrera */}
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-muted-foreground" />
                  Carrera
                </Label>
                <Select
                  value={formData.carrera}
                  onValueChange={(value) => handleCarreraChange(value as Carrera)}
                >
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Selecciona tu carrera" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ingeniería">
                      <span className="flex items-center gap-2">
                        🎓 Ingeniería
                      </span>
                    </SelectItem>
                    <SelectItem value="Maestría">
                      <span className="flex items-center gap-2">
                        📚 Maestría
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Materia (filtrada por carrera) */}
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-muted-foreground" />
                  Materia
                </Label>
                <Select
                  value={formData.materiaId}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, materiaId: value }))
                  }
                  disabled={!formData.carrera}
                >
                  <SelectTrigger className="h-11">
                    <SelectValue
                      placeholder={
                        formData.carrera
                          ? 'Selecciona la materia'
                          : 'Primero selecciona una carrera'
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {materiasDisponibles.map((materia) => (
                      <SelectItem key={materia.id} value={materia.id}>
                        {materia.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Indicador de GPS */}
              <div className="flex items-center gap-2 p-3 rounded-lg bg-accent/50 text-accent-foreground">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">
                  Tu ubicación GPS será capturada al enviar
                </span>
              </div>

              {/* Botón de envío */}
              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="w-full"
                disabled={!isFormValid || isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Validando ubicación...
                  </>
                ) : (
                  <>
                    <MapPin className="w-4 h-4" />
                    Registrar Asistencia
                  </>
                )}
              </Button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default AttendanceForm;
