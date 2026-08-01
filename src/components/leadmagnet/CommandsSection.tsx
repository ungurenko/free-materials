import { commands } from "@/content/leadmagnet";
import PromptBlock from "@/components/PromptBlock";
import Reveal from "@/components/Reveal";

export default function CommandsSection() {
  return (
    <div className="mt-10 grid gap-5 sm:mt-12 sm:gap-6 lg:grid-cols-2">
      {commands.map((command, i) => (
        <Reveal key={command.id} delay={(i % 2) * 110}>
          <PromptBlock
            id={command.id}
            index={i}
            title={command.title}
            prompt={command.prompt}
            collapsed
            materialSlug="leadmagnet"
          />
        </Reveal>
      ))}
    </div>
  );
}
