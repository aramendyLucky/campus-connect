import { Coordenadas, ResultadoGeovalidacion } from '@/types';

// Coordenadas de la sede principal (ejemplo: Buenos Aires)
// En producción, esto vendría de la base de datos
export const SEDE_PRINCIPAL: Coordenadas = {
  latitud: -34.6037,
  longitud: -58.3816,
};

// Radio máximo permitido en metros
export const RADIO_MAXIMO_METROS = 1000;

/**
 * Calcula la distancia entre dos puntos geográficos usando la fórmula de Haversine
 * @param coord1 - Coordenadas del primer punto
 * @param coord2 - Coordenadas del segundo punto
 * @returns Distancia en metros
 */
export const calcularDistanciaHaversine = (
  coord1: Coordenadas,
  coord2: Coordenadas
): number => {
  const R = 6371000; // Radio de la Tierra en metros

  // Convertir grados a radianes
  const lat1Rad = (coord1.latitud * Math.PI) / 180;
  const lat2Rad = (coord2.latitud * Math.PI) / 180;
  const deltaLat = ((coord2.latitud - coord1.latitud) * Math.PI) / 180;
  const deltaLon = ((coord2.longitud - coord1.longitud) * Math.PI) / 180;

  // Fórmula de Haversine
  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1Rad) *
      Math.cos(lat2Rad) *
      Math.sin(deltaLon / 2) *
      Math.sin(deltaLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

/**
 * Valida si las coordenadas del alumno están dentro del radio permitido
 * @param coordenadasAlumno - Coordenadas GPS del alumno
 * @param coordenadasSede - Coordenadas de la sede (opcional, usa sede principal por defecto)
 * @param radioMaximo - Radio máximo en metros (opcional, usa 1000m por defecto)
 * @returns Resultado de la geovalidación
 */
export const validarUbicacion = (
  coordenadasAlumno: Coordenadas,
  coordenadasSede: Coordenadas = SEDE_PRINCIPAL,
  radioMaximo: number = RADIO_MAXIMO_METROS
): ResultadoGeovalidacion => {
  const distancia = calcularDistanciaHaversine(coordenadasAlumno, coordenadasSede);

  if (distancia > radioMaximo) {
    return {
      esValido: false,
      distanciaMetros: Math.round(distancia),
      mensaje: `Ubicación fuera del rango permitido. Distancia: ${Math.round(distancia)}m (máximo: ${radioMaximo}m)`,
    };
  }

  return {
    esValido: true,
    distanciaMetros: Math.round(distancia),
    mensaje: `Ubicación validada correctamente. Distancia: ${Math.round(distancia)}m`,
  };
};

/**
 * Obtiene la ubicación actual del usuario usando la API de geolocalización
 * @returns Promesa con las coordenadas del usuario
 */
export const obtenerUbicacionActual = (): Promise<Coordenadas> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('La geolocalización no está soportada en este navegador'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitud: position.coords.latitude,
          longitud: position.coords.longitude,
        });
      },
      (error) => {
        let mensaje = 'Error al obtener la ubicación';
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            mensaje = 'Permiso de ubicación denegado. Por favor, habilite el acceso a la ubicación para registrar su asistencia.';
            break;
          case error.POSITION_UNAVAILABLE:
            mensaje = 'La información de ubicación no está disponible.';
            break;
          case error.TIMEOUT:
            mensaje = 'Tiempo de espera agotado al obtener la ubicación.';
            break;
        }
        
        reject(new Error(mensaje));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  });
};
