// Tipos del Sistema de Asistencia Universitaria

export type Carrera = 'Ingeniería' | 'Maestría';

export interface Alumno {
  email: string;
  nombre: string;
  apellido: string;
}

export interface Materia {
  id: string;
  nombre: string;
  carrera: Carrera;
  carga_horaria_total: number;
}

export interface Ubicacion {
  id: string;
  nombre_sede: string;
  latitud: number;
  longitud: number;
  radio_metros: number;
}

export interface RegistroAsistencia {
  id: string;
  fecha_hora: string;
  email_alumno: string;
  carrera: Carrera;
  materia_id: string;
  materia_nombre?: string;
  latitud_gps: number;
  longitud_gps: number;
  ubicacion_aceptada: 'SI' | 'NO';
}

export interface UsuarioBedel {
  id: string;
  email: string;
}

export interface Coordenadas {
  latitud: number;
  longitud: number;
}

export interface ResultadoGeovalidacion {
  esValido: boolean;
  distanciaMetros: number;
  mensaje: string;
}
