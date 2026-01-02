import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Download,
  Filter,
  Users,
  BookOpen,
  MapPin,
  Calendar,
  Search,
  FileText,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { RegistroAsistencia, Carrera } from '@/types';
import { materias } from '@/data/materias';

// Datos de ejemplo para el dashboard
const registrosEjemplo: RegistroAsistencia[] = [
  {
    id: '1',
    fecha_hora: '2025-01-02T09:15:00',
    email_alumno: 'juan.perez@universidad.edu',
    carrera: 'Ingeniería',
    materia_id: 'ING006',
    materia_nombre: 'Programación I',
    latitud_gps: -34.6037,
    longitud_gps: -58.3816,
    ubicacion_aceptada: 'SI',
  },
  {
    id: '2',
    fecha_hora: '2025-01-02T09:18:00',
    email_alumno: 'maria.garcia@universidad.edu',
    carrera: 'Maestría',
    materia_id: 'MAE003',
    materia_nombre: 'Machine Learning',
    latitud_gps: -34.6040,
    longitud_gps: -58.3820,
    ubicacion_aceptada: 'SI',
  },
  {
    id: '3',
    fecha_hora: '2025-01-02T09:22:00',
    email_alumno: 'carlos.lopez@universidad.edu',
    carrera: 'Ingeniería',
    materia_id: 'ING008',
    materia_nombre: 'Estructuras de Datos',
    latitud_gps: -34.6035,
    longitud_gps: -58.3810,
    ubicacion_aceptada: 'SI',
  },
  {
    id: '4',
    fecha_hora: '2025-01-02T10:05:00',
    email_alumno: 'ana.martinez@universidad.edu',
    carrera: 'Maestría',
    materia_id: 'MAE004',
    materia_nombre: 'Deep Learning',
    latitud_gps: -34.6042,
    longitud_gps: -58.3825,
    ubicacion_aceptada: 'SI',
  },
  {
    id: '5',
    fecha_hora: '2025-01-02T10:12:00',
    email_alumno: 'pedro.sanchez@universidad.edu',
    carrera: 'Ingeniería',
    materia_id: 'ING013',
    materia_nombre: 'Inteligencia Artificial',
    latitud_gps: -34.6038,
    longitud_gps: -58.3818,
    ubicacion_aceptada: 'SI',
  },
];

const Dashboard = () => {
  const [busqueda, setBusqueda] = useState('');
  const [filtroCarrera, setFiltroCarrera] = useState<Carrera | 'todas'>('todas');
  const [filtroMateria, setFiltroMateria] = useState<string>('todas');

  const registrosFiltrados = useMemo(() => {
    return registrosEjemplo.filter((registro) => {
      const matchBusqueda =
        registro.email_alumno.toLowerCase().includes(busqueda.toLowerCase()) ||
        registro.materia_nombre?.toLowerCase().includes(busqueda.toLowerCase());

      const matchCarrera =
        filtroCarrera === 'todas' || registro.carrera === filtroCarrera;

      const matchMateria =
        filtroMateria === 'todas' || registro.materia_id === filtroMateria;

      return matchBusqueda && matchCarrera && matchMateria;
    });
  }, [busqueda, filtroCarrera, filtroMateria]);

  const materiasFiltradasPorCarrera = useMemo(() => {
    if (filtroCarrera === 'todas') return materias;
    return materias.filter((m) => m.carrera === filtroCarrera);
  }, [filtroCarrera]);

  const formatFecha = (fechaISO: string) => {
    const fecha = new Date(fechaISO);
    return fecha.toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const stats = [
    {
      label: 'Total Registros',
      value: registrosEjemplo.length,
      icon: Users,
      color: 'bg-primary/10 text-primary',
    },
    {
      label: 'Ingeniería',
      value: registrosEjemplo.filter((r) => r.carrera === 'Ingeniería').length,
      icon: BookOpen,
      color: 'bg-accent text-accent-foreground',
    },
    {
      label: 'Maestría',
      value: registrosEjemplo.filter((r) => r.carrera === 'Maestría').length,
      icon: BookOpen,
      color: 'bg-secondary text-secondary-foreground',
    },
    {
      label: 'Validados GPS',
      value: registrosEjemplo.filter((r) => r.ubicacion_aceptada === 'SI').length,
      icon: MapPin,
      color: 'bg-success/10 text-success',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/">
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </Button>
            <div>
              <h1 className="font-semibold text-lg text-foreground">
                Dashboard de Gestión
              </h1>
              <p className="text-sm text-muted-foreground">
                Panel de control para bedeles
              </p>
            </div>
          </div>

          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Exportar CSV
          </Button>
        </div>
      </header>

      <main className="container max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card rounded-xl p-5"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Filtros */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-xl p-5 mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <h2 className="font-medium text-foreground">Filtros</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Búsqueda */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por email o materia..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Carrera */}
            <Select
              value={filtroCarrera}
              onValueChange={(value) => {
                setFiltroCarrera(value as Carrera | 'todas');
                setFiltroMateria('todas');
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Carrera" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas las carreras</SelectItem>
                <SelectItem value="Ingeniería">Ingeniería</SelectItem>
                <SelectItem value="Maestría">Maestría</SelectItem>
              </SelectContent>
            </Select>

            {/* Materia */}
            <Select value={filtroMateria} onValueChange={setFiltroMateria}>
              <SelectTrigger>
                <SelectValue placeholder="Materia" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas las materias</SelectItem>
                {materiasFiltradasPorCarrera.map((materia) => (
                  <SelectItem key={materia.id} value={materia.id}>
                    {materia.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Fecha */}
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input type="date" className="pl-10" />
            </div>
          </div>
        </motion.div>

        {/* Tabla de registros */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-xl overflow-hidden"
        >
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Fecha/Hora</TableHead>
                <TableHead>Alumno</TableHead>
                <TableHead>Carrera</TableHead>
                <TableHead>Materia</TableHead>
                <TableHead>Ubicación</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {registrosFiltrados.map((registro) => (
                <TableRow key={registro.id} className="hover:bg-muted/30">
                  <TableCell className="font-medium">
                    {formatFecha(registro.fecha_hora)}
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{registro.email_alumno}</span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={registro.carrera === 'Ingeniería' ? 'default' : 'secondary'}
                    >
                      {registro.carrera}
                    </Badge>
                  </TableCell>
                  <TableCell>{registro.materia_nombre}</TableCell>
                  <TableCell>
                    <span className="text-xs text-muted-foreground font-mono">
                      {registro.latitud_gps.toFixed(4)}, {registro.longitud_gps.toFixed(4)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        registro.ubicacion_aceptada === 'SI'
                          ? 'border-success text-success'
                          : 'border-destructive text-destructive'
                      }
                    >
                      {registro.ubicacion_aceptada === 'SI' ? '✓ Validado' : '✗ Rechazado'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <FileText className="w-4 h-4 mr-1" />
                      PDF
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {registrosFiltrados.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p>No se encontraron registros con los filtros aplicados</p>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
