import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const FooterSections = () => {
  return (
    <>
      <section id="register" className="py-20 px-4">
        <div className="container mx-auto max-w-md">
          <Card className="border-primary/20 glow">
            <CardHeader>
              <CardTitle className="text-3xl text-center">Регистрация</CardTitle>
              <CardDescription className="text-center">
                Создайте аккаунт для доступа ко всем функциям
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username">Имя пользователя</Label>
                <Input id="username" placeholder="Введите никнейм" className="bg-secondary" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your@email.com" className="bg-secondary" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <Input id="password" type="password" placeholder="••••••••" className="bg-secondary" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="steamid">Steam ID (опционально)</Label>
                <Input id="steamid" placeholder="STEAM_0:0:12345678" className="bg-secondary" />
              </div>
              <Button className="w-full glow" size="lg">
                <Icon name="UserPlus" className="mr-2" />
                Зарегистрироваться
              </Button>
              <div className="text-center text-sm text-muted-foreground">
                Уже есть аккаунт?{' '}
                <Button variant="link" className="text-primary p-0 h-auto">
                  Войти
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="contacts" className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-12 glow-text">Контакты и связь</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-primary/20 hover:border-primary/50 transition-all hover:glow cursor-pointer">
              <CardContent className="pt-6 space-y-4">
                <Icon name="MessageCircle" className="w-12 h-12 mx-auto text-primary" />
                <h3 className="text-xl font-semibold">Discord</h3>
                <p className="text-muted-foreground">discord.gg/secure-contain-protect</p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover:border-primary/50 transition-all hover:glow cursor-pointer">
              <CardContent className="pt-6 space-y-4">
                <Icon name="Send" className="w-12 h-12 mx-auto text-primary" />
                <h3 className="text-xl font-semibold">Telegram</h3>
                <p className="text-muted-foreground">t.me/scplast_official</p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover:border-primary/50 transition-all hover:glow cursor-pointer">
              <CardContent className="pt-6 space-y-4">
                <Icon name="Mail" className="w-12 h-12 mx-auto text-primary" />
                <h3 className="text-xl font-semibold">Email</h3>
                <p className="text-muted-foreground">admin@scplast.ru</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8 px-4">
        <div className="container mx-auto text-center text-muted-foreground">
          <p className="mb-4">
            © 2025 SCP Foundation: Last Escape. Все права защищены.
          </p>
          <p className="text-sm">
            Данный проект является фан-работой и не связан с официальным SCP Foundation.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <Icon name="Shield" className="text-primary w-5 h-5" />
            <span className="text-xs">SECURE. CONTAIN. PROTECT.</span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterSections;
