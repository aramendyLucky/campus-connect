import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AttendanceForm from '@/components/AttendanceForm';

const Index = () => {
  return (
    <div className="min-h-screen gradient-hero">
      <Header />
      
      <main className="container max-w-6xl mx-auto px-4 py-12">
        <HeroSection />
        <AttendanceForm />
        
        {/* Footer info */}
        <div className="text-center mt-16 text-sm text-muted-foreground">
          <p>
            Sistema desarrollado para control de asistencia con geofencing
          </p>
          <p className="mt-1">
            50 materias disponibles • Ingeniería y Maestría
          </p>
        </div>
      </main>
    </div>
  );
};

export default Index;
