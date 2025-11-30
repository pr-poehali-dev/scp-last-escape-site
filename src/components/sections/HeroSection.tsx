import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface HeroSectionProps {
  scrollToSection: (section: string) => void;
}

const HeroSection = ({ scrollToSection }: HeroSectionProps) => {
  return (
    <section id="main" className="pt-32 pb-20 px-4">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          <Badge variant="destructive" className="text-lg px-4 py-2 glow">
            ⚠️ LEVEL 4 CLEARANCE REQUIRED
          </Badge>
          <h1 className="text-6xl md:text-8xl font-bold glow-text glitch">
            LAST ESCAPE
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Добро пожаловать в закрытый объект SCP Foundation. 
            Выживи, сдержи, защити. Или попытайся сбежать.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-8">
            <Button size="lg" className="text-lg glow" onClick={() => scrollToSection('register')}>
              <Icon name="UserPlus" className="mr-2" />
              Присоединиться
            </Button>
            <Button size="lg" variant="outline" className="text-lg">
              <Icon name="Play" className="mr-2" />
              IP: 194.93.2.148:27015
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
