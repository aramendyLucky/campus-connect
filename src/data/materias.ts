import { Materia, Carrera } from '@/types';

// Materias de ejemplo para el sistema
// En producción, estos datos vendrán de la base de datos

export const materias: Materia[] = [
  // Ingeniería (25 materias)
  { id: 'ING001', nombre: 'Cálculo I', carrera: 'Ingeniería', carga_horaria_total: 64 },
  { id: 'ING002', nombre: 'Cálculo II', carrera: 'Ingeniería', carga_horaria_total: 64 },
  { id: 'ING003', nombre: 'Álgebra Lineal', carrera: 'Ingeniería', carga_horaria_total: 48 },
  { id: 'ING004', nombre: 'Física I', carrera: 'Ingeniería', carga_horaria_total: 64 },
  { id: 'ING005', nombre: 'Física II', carrera: 'Ingeniería', carga_horaria_total: 64 },
  { id: 'ING006', nombre: 'Programación I', carrera: 'Ingeniería', carga_horaria_total: 80 },
  { id: 'ING007', nombre: 'Programación II', carrera: 'Ingeniería', carga_horaria_total: 80 },
  { id: 'ING008', nombre: 'Estructuras de Datos', carrera: 'Ingeniería', carga_horaria_total: 64 },
  { id: 'ING009', nombre: 'Base de Datos', carrera: 'Ingeniería', carga_horaria_total: 64 },
  { id: 'ING010', nombre: 'Sistemas Operativos', carrera: 'Ingeniería', carga_horaria_total: 48 },
  { id: 'ING011', nombre: 'Redes de Computadoras', carrera: 'Ingeniería', carga_horaria_total: 48 },
  { id: 'ING012', nombre: 'Ingeniería de Software', carrera: 'Ingeniería', carga_horaria_total: 64 },
  { id: 'ING013', nombre: 'Inteligencia Artificial', carrera: 'Ingeniería', carga_horaria_total: 48 },
  { id: 'ING014', nombre: 'Seguridad Informática', carrera: 'Ingeniería', carga_horaria_total: 48 },
  { id: 'ING015', nombre: 'Arquitectura de Computadoras', carrera: 'Ingeniería', carga_horaria_total: 48 },
  { id: 'ING016', nombre: 'Matemática Discreta', carrera: 'Ingeniería', carga_horaria_total: 48 },
  { id: 'ING017', nombre: 'Probabilidad y Estadística', carrera: 'Ingeniería', carga_horaria_total: 48 },
  { id: 'ING018', nombre: 'Métodos Numéricos', carrera: 'Ingeniería', carga_horaria_total: 48 },
  { id: 'ING019', nombre: 'Electrónica Digital', carrera: 'Ingeniería', carga_horaria_total: 64 },
  { id: 'ING020', nombre: 'Diseño de Sistemas', carrera: 'Ingeniería', carga_horaria_total: 64 },
  { id: 'ING021', nombre: 'Gestión de Proyectos', carrera: 'Ingeniería', carga_horaria_total: 32 },
  { id: 'ING022', nombre: 'Desarrollo Web', carrera: 'Ingeniería', carga_horaria_total: 64 },
  { id: 'ING023', nombre: 'Desarrollo Móvil', carrera: 'Ingeniería', carga_horaria_total: 48 },
  { id: 'ING024', nombre: 'Cloud Computing', carrera: 'Ingeniería', carga_horaria_total: 48 },
  { id: 'ING025', nombre: 'Proyecto Final', carrera: 'Ingeniería', carga_horaria_total: 128 },

  // Maestría (25 materias)
  { id: 'MAE001', nombre: 'Metodología de la Investigación', carrera: 'Maestría', carga_horaria_total: 48 },
  { id: 'MAE002', nombre: 'Estadística Avanzada', carrera: 'Maestría', carga_horaria_total: 48 },
  { id: 'MAE003', nombre: 'Machine Learning', carrera: 'Maestría', carga_horaria_total: 64 },
  { id: 'MAE004', nombre: 'Deep Learning', carrera: 'Maestría', carga_horaria_total: 64 },
  { id: 'MAE005', nombre: 'Big Data Analytics', carrera: 'Maestría', carga_horaria_total: 48 },
  { id: 'MAE006', nombre: 'Data Mining', carrera: 'Maestría', carga_horaria_total: 48 },
  { id: 'MAE007', nombre: 'Procesamiento de Lenguaje Natural', carrera: 'Maestría', carga_horaria_total: 48 },
  { id: 'MAE008', nombre: 'Visión por Computadora', carrera: 'Maestría', carga_horaria_total: 48 },
  { id: 'MAE009', nombre: 'Redes Neuronales', carrera: 'Maestría', carga_horaria_total: 48 },
  { id: 'MAE010', nombre: 'Optimización', carrera: 'Maestría', carga_horaria_total: 48 },
  { id: 'MAE011', nombre: 'Algoritmos Avanzados', carrera: 'Maestría', carga_horaria_total: 48 },
  { id: 'MAE012', nombre: 'Computación Cuántica', carrera: 'Maestría', carga_horaria_total: 32 },
  { id: 'MAE013', nombre: 'Sistemas Distribuidos', carrera: 'Maestría', carga_horaria_total: 48 },
  { id: 'MAE014', nombre: 'Arquitectura de Software', carrera: 'Maestría', carga_horaria_total: 48 },
  { id: 'MAE015', nombre: 'DevOps y MLOps', carrera: 'Maestría', carga_horaria_total: 48 },
  { id: 'MAE016', nombre: 'Ética en IA', carrera: 'Maestría', carga_horaria_total: 32 },
  { id: 'MAE017', nombre: 'Innovación Tecnológica', carrera: 'Maestría', carga_horaria_total: 32 },
  { id: 'MAE018', nombre: 'Liderazgo y Gestión', carrera: 'Maestría', carga_horaria_total: 32 },
  { id: 'MAE019', nombre: 'Emprendimiento Tech', carrera: 'Maestría', carga_horaria_total: 32 },
  { id: 'MAE020', nombre: 'Seminario de Investigación I', carrera: 'Maestría', carga_horaria_total: 32 },
  { id: 'MAE021', nombre: 'Seminario de Investigación II', carrera: 'Maestría', carga_horaria_total: 32 },
  { id: 'MAE022', nombre: 'Escritura Científica', carrera: 'Maestría', carga_horaria_total: 24 },
  { id: 'MAE023', nombre: 'Robótica Inteligente', carrera: 'Maestría', carga_horaria_total: 48 },
  { id: 'MAE024', nombre: 'IoT y Edge Computing', carrera: 'Maestría', carga_horaria_total: 48 },
  { id: 'MAE025', nombre: 'Tesis de Maestría', carrera: 'Maestría', carga_horaria_total: 200 },
];

export const getMateriasPorCarrera = (carrera: Carrera): Materia[] => {
  return materias.filter(m => m.carrera === carrera);
};

export const getMateriaPorId = (id: string): Materia | undefined => {
  return materias.find(m => m.id === id);
};
