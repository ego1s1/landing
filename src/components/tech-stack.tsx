import { GlassCard } from "@/components/ui/glass-card";
import { GlassIcon } from "@/components/ui/glass-icon";

const sections = [
  {
    title: 'Languages',
    items: [
      { name: 'C++', icon: '󰙲', color: 'var(--blue)' },
      { name: 'Java', icon: '󰬷', color: 'var(--red)' },
      { name: 'Python', icon: '󰌠', color: 'var(--yellow)' },
      { name: 'TypeScript', icon: '󰛦', color: 'var(--sapphire)' },
      { name: 'JavaScript', icon: '󰌞', color: 'var(--peach)' },
      { name: 'HTML/CSS', icon: '󰌝', color: 'var(--mauve)' },
    ],
  },
  {
    title: 'Frameworks',
    items: [
      { name: 'React', icon: '󰜈', color: 'var(--sky)' },
      { name: 'Next.js', icon: '󰎯', color: 'var(--lavender)' },
      { name: 'Tailwind CSS', icon: '󱏿', color: 'var(--teal)' },
      { name: 'tRPC', icon: '󰚲', color: 'var(--pink)' },
      { name: 'Prisma', icon: '󰄛', color: 'var(--green)' },
      { name: 'PostgreSQL', icon: '󱤢', color: 'var(--blue)' },
    ],
  },
  {
    title: 'Tools & OS',
    items: [
      { name: 'Git', icon: '󰊢', color: 'var(--maroon)' },
      { name: 'Vim', icon: '󰕷', color: 'var(--green)' },
      { name: 'Linux', icon: '󰌽', color: 'var(--flamingo)' },
      { name: 'VS Code', icon: '󰨞', color: 'var(--sapphire)' },
      { name: 'GNU Utils', icon: '󰣖', color: 'var(--yellow)' },
      { name: 'macOS', icon: '󰀵', color: 'var(--mauve)' },
    ],
  },
];

export function TechStack() {
  return (
    <GlassCard title="TECH_STACK.md">
      <div className="space-y-6">
        {sections.map((section) => (
          <div key={section.title} className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground/90 font-[var(--font-serif)] tracking-wide">
              {section.title}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {section.items.map((item) => (
                <div key={item.name} className="flex flex-col items-center gap-2">
                  <GlassIcon className="w-16 h-16" label={item.name}>
                    <span
                      className="font-['JetBrainsMono_Nerd_Font'] text-xl"
                      style={{ color: item.color }}
                    >
                      {item.icon}
                    </span>
                  </GlassIcon>
                  <span className="text-xs font-mono text-foreground/70">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
} 