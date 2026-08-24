import { Link } from "react-router";
import Button from "../components/ui/Button";

export function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-text-primary font-sans selection:bg-primary selection:text-background">
      {/* Hero */}
      <header className="flex flex-col items-center justify-center pt-24 pb-16 px-4 text-center border-b-2 border-border-strong">
        <h1 className="font-gothic-title text-5xl md:text-7xl uppercase tracking-widest text-text-selected mb-6 drop-shadow-sm">
          MONOLITH
        </h1>
        {/* CHANGE */}
        <p className="max-w-2xl font-sans text-base md:text-lg text-text-primary mb-8 leading-relaxed">
          Універсальний та зручний інструментарій, що не перевантажує своїм
          функціоналом. Лише практичні інструменти, що дійсно потрібні майстрам
          та гравцям незалежно від жанру, тону чи сетінгу - все в одному місці.
        </p>
        <div className="flex gap-4">
          <Button
            asChild
            variant="primary"
            className="h-12 px-8 font-heading text-lg uppercase tracking-wider"
          >
            <Link to="/auth" state={{ startMode: "register" }}>
              Почати
            </Link>
          </Button>
          {/* CHANGE honestly idk how to style it... */}
          <Button
            asChild
            variant="ghost"
            className="h-12 px-8 font-mono text-xs uppercase "
          >
            <Link to="/tools">Переглянути загальні інструменти</Link>
          </Button>
        </div>
      </header>

      {/* Z-pattern */}
      <section className="mx-auto max-w-7xl py-32 px-6 flex flex-col gap-32">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          <div className="w-full md:w-5/12 space-y-6">
            <h2 className="font-gothic-title text-4xl lg:text-5xl uppercase text-text-selected border-b-2 border-border-muted pb-4 inline-block break-words max-w-full">
              Дошка Квестів
            </h2>
            <p className="font-mono text-base text-text-primary leading-relaxed">
              Ваша партія обожнює знаходити собі купу друзів та ворогів,
              постійно погоджуватися комусь допомогти і ви втомилися пам'ятати
              (та нагадувати їм) кожний взятий квест і дану обіцянку? Можливо,
              знайдений дворянський перстень має зіграти свою роль тільки у
              третьому акті, до якого всі вже й забудуть про "дивне кільце" в
              інвентарі вашого мага? Створюйте та структуруйте завдання партії
              на зручній дошці, натхненній квестовими журналами із CRPG і
              зробіть кожний сюжетний гачок дійсно незабутнім!
            </p>
          </div>
          <div className="w-full md:w-7/12">
            <div className="aspect-video w-full bg-surface border-2 border-border-strong flex items-center justify-center p-6 relative overflow-hidden group">
              <div className="absolute inset-0 bg-background/20 transition-colors group-hover:bg-transparent" />
              <span className="font-mono text-base  text-text-primary/50 uppercase text-center">
                [ Плейсхолдер: Гіфка Дошки Квестів ]
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-20">
          <div className="w-full md:w-5/12 space-y-6">
            <h2 className="font-gothic-title text-4xl lg:text-5xl uppercase text-text-selected border-b-2 border-border-muted pb-4 inline-block break-words max-w-full">
              Ширма майстра
            </h2>
            <p className="font-mono text-base text-text-primary leading-relaxed">
              Універсальні інструменти, що будуть корисні для будь-якої системи
              незалежно від її правил. Швидкі нотатки, трекери ініціативи,
              таймери подій та генератори із можливістю ручного налаштування -
              усі в одному просторі зі зручним інтерфейсом!
            </p>
          </div>
          <div className="w-full md:w-7/12">
            <div className="aspect-video w-full bg-surface border-2 border-border-strong flex items-center justify-center p-6 relative overflow-hidden group">
              <div className="absolute inset-0 bg-background/20 transition-colors group-hover:bg-transparent" />
              <span className="font-mono text-base lg:text-lg text-text-primary/50 uppercase text-center">
                [ Плейсхолдер: Гіфка Ширми Майстра ]
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          <div className="w-full md:w-5/12 space-y-6">
            <h2 className="font-gothic-title text-4xl lg:text-5xl uppercase text-text-selected border-b-2 border-border-muted pb-4 inline-block break-words max-w-full">
              Відстеження Партії
            </h2>
            <p className="font-mono text-base text-text-primary leading-relaxed">
              Втомилися декілька разів звіряти очима вільні дні кожного гравця?
              Список спільних трофеїв групи перебуває у стані суперпозиції, або
              ж вам просто треба швидко перевірити сумки персонажів? Можливо, ви
              забули сказане мимохідь ім'я вартового, але його точно записував
              хтось із гравців? Сторінка партії містить усе, що вам потрібно -
              спільний заповнюваний розклад, "чат" ігрових нотаток та інвентарі
              персонажів, щоб вони завжди були під рукою!
            </p>
          </div>
          <div className="w-full md:w-7/12">
            <div className="aspect-video w-full bg-surface border-2 border-border-strong flex items-center justify-center p-6 relative overflow-hidden group">
              <div className="absolute inset-0 bg-background/20 transition-colors group-hover:bg-transparent" />
              <span className="font-mono text-base lg:text-lg text-text-primary/50 uppercase text-center">
                [ Плейсхолдер: Гіфка Керування Партією ]
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t-2 border-border-strong bg-surface py-32 px-4 text-center mt-12">
        <div className="mx-auto max-w-3xl flex flex-col items-center">
          <h2 className="font-gothic-title text-5xl md:text-6xl uppercase tracking-widest text-text-selected mb-6">
            Усе необхідне під рукою
          </h2>
          {/* CHANGE */}
          <p className="font-mono text-base md:text-lg text-text-muted mb-12 max-w-2xl leading-relaxed">
            Жодних комплексних налаштувань чи зайвої автоматизації - Monolith не
            намагається бути другим WorldAnvil чи Foundry та не претендує на
            місця і так відомих вам лідерів. Тільки потрібне - не більше і не
            менше.
          </p>
          <Button
            asChild
            variant="primary"
            className="w-full sm:w-auto h-16 px-16 font-gothic-title text-3xl uppercase tracking-widest transition-colors"
          >
            <Link to="/auth" state={{ startMode: "register" }}>
              ЗАРЕЄСТРУВАТИСЯ
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
