import { buttonDemos } from "@/data/buttons";
import { ButtonShowcaseCard } from "@/components/ButtonShowcaseCard";

export function ButtonGrid() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {buttonDemos.map((demo, index) => (
        <ButtonShowcaseCard key={demo.id} demo={demo} index={index} />
      ))}
    </section>
  );
}
