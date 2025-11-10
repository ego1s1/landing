import { GlassCard } from "@/components/ui/glass-card";
import { GlassIcon } from "@/components/ui/glass-icon";

const sections = [
  {
    title: 'Languages',
    items: [
      { name: 'C++', icon: '󰙲', color: 'var(--blue)', url: 'https://en.cppreference.com/w/' },
      { name: 'Java', icon: '󰬷', color: 'var(--red)', url: 'https://www.java.com/' },
      { name: 'Python', icon: '󰌠', color: 'var(--yellow)', url: 'https://www.python.org/' },
      { name: 'TypeScript', icon: '󰛦', color: 'var(--sapphire)', url: 'https://www.typescriptlang.org/' },
      { name: 'JavaScript', icon: '󰌞', color: 'var(--peach)', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
      { name: 'HTML/CSS', icon: '󰌝', color: 'var(--mauve)', url: 'https://developer.mozilla.org/en-US/docs/Web' },
    ],
  },
  {
    title: 'Frameworks',
    items: [
      { name: 'React', icon: '󰜈', color: 'var(--sky)', url: 'https://react.dev/' },
      { name: 'Next.js', icon: '󰎯', color: 'var(--lavender)', url: 'https://nextjs.org/' },
      { name: 'Tailwind CSS', icon: '󱏿', color: 'var(--teal)', url: 'https://tailwindcss.com/' },
      { name: 'tRPC', icon: '󰚲', color: 'var(--pink)', url: 'https://trpc.io/' },
      { name: 'Prisma', icon: '󰄛', color: 'var(--green)', url: 'https://www.prisma.io/' },
      { name: 'PostgreSQL', icon: '󱤢', color: 'var(--blue)', url: 'https://www.postgresql.org/' },
    ],
  },
  {
    title: 'Tools & OS',
    items: [
      { name: 'Git', icon: '󰊢', color: 'var(--maroon)', url: 'https://git-scm.com/' },
      { name: 'Vim', icon: '󰕷', color: 'var(--green)', url: 'https://www.vim.org/' },
      { name: 'Linux', icon: '󰌽', color: 'var(--flamingo)', url: 'https://www.linux.org/' },
      { name: 'VS Code', icon: '󰨞', color: 'var(--sapphire)', url: 'https://code.visualstudio.com/' },
      { name: 'GNU Utils', icon: '󰣖', color: 'var(--yellow)', url: 'https://www.gnu.org/software/coreutils/' },
      { name: 'macOS', icon: '󰀵', color: 'var(--mauve)', url: 'https://www.apple.com/macos/' },
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
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 group cursor-pointer"
                >
                  <GlassIcon className="w-16 h-16" label={item.name}>
                    <span
                      className="font-['JetBrainsMono_Nerd_Font'] text-xl"
                      style={{ color: item.color }}
                    >
                      {item.icon}
                    </span>
                  </GlassIcon>
                  <span className="text-xs font-mono text-foreground/70 group-hover:text-foreground transition-colors">
                    {item.name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
} 