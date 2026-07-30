import Link from "next/link";
import { IconChevronLeft } from "@/components/icons";

export default function NotFound() {
  return (
    <div className="container-x flex max-w-2xl flex-col items-start py-24">
      <p className="pill border border-line bg-paper px-3.5 py-2 text-ink-faint">404</p>
      <h1 className="mt-6 font-display text-2xl font-semibold sm:text-3xl">
        Такой материал не найден
      </h1>
      <p className="mt-4 text-base leading-relaxed text-ink-soft">
        Возможно, ссылка устарела. Загляните в каталог — все бесплатные материалы
        собраны на главной странице.
      </p>
      <Link href="/" className="btn-primary mt-8 h-12 px-6 text-[15px]">
        <IconChevronLeft className="size-5" />
        Вернуться в каталог
      </Link>
    </div>
  );
}
