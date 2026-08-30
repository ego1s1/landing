import { Cpu } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";

const sections = [
  {
    title: 'EMBEDDED SYSTEMS & FIRMWARE',
    items: [
      { name: 'Embedded C', icon: '', color: '#7dcfff', url: 'https://en.cppreference.com/w/c' },
      { name: 'Embedded C++', icon: '', color: '#7aa2f7', url: 'https://en.cppreference.com/w/cpp' },
      { name: 'ARM & MCUs', icon: '', color: '#e0af68', url: 'https://www.arm.com/' },
      { name: 'RTOS & Linux', icon: '', color: '#ff9e64', url: 'https://www.freertos.org/' },
      { name: 'SPI / I2C / CAN', icon: '󰒋', color: '#9ece6a', url: 'https://www.can-cia.org/' },
      { name: 'GDB & Debug', icon: '', color: '#bb9af7', url: 'https://www.sourceware.org/gdb/' },
    ],
  },
  {
    title: 'PROGRAMMING LANGUAGES',
    items: [
      { name: 'C++', icon: '', color: '#7aa2f7', url: 'https://en.cppreference.com/w/' },
      { name: 'Java', icon: '', color: '#f7768e', url: 'https://www.java.com/' },
      { name: 'Python', icon: '', color: '#e0af68', url: 'https://www.python.org/' },
      { name: 'TypeScript', icon: '', color: '#7dcfff', url: 'https://www.typescriptlang.org/' },
      { name: 'JavaScript', icon: '', color: '#ff9e64', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
      { name: 'HTML/CSS', icon: '', color: '#bb9af7', url: 'https://developer.mozilla.org/en-US/docs/Web' },
    ],
  },
  {
    title: 'BACKEND, DEVOPS & TOOLS',
    items: [
      { name: 'Docker', icon: '', color: '#7dcfff', url: 'https://www.docker.com/' },
      { name: 'PostgreSQL', icon: '', color: '#7aa2f7', url: 'https://www.postgresql.org/' },
      { name: 'Redis', icon: '', color: '#f7768e', url: 'https://redis.io/' },
      { name: 'Git', icon: '', color: '#f7768e', url: 'https://git-scm.com/' },
      { name: 'Vim / Neovim', icon: '', color: '#9ece6a', url: 'https://www.vim.org/' },
      { name: 'Linux Shell', icon: '', color: '#e0af68', url: 'https://www.gnu.org/software/coreutils/' },
    ],
  },
];

export function TechStack() {
  return (
    <GlassCard
      id="stack"
      title="ls -la ~/TECH_STACK/"
      shortTitle="STACK"
      nerdIcon="󰙲"
      icon={<Cpu className="size-4" />}
    >
      <div className="space-y-6 font-mono">
        {sections.map((section) => (
          <div key={section.title} className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#7dcfff] tracking-wider">
              <span>❯</span>
              <span>{section.title}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {section.items.map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center p-3 bg-[#24283b] hover:bg-[#292e42] border border-[#414868] hover:border-[#7aa2f7] shadow-[2px_2px_0px_#101014] rounded-[4px] group text-center select-none"
                >
                  <span
                    className="font-['Iosevka_Nerd_Font','Iosevka_Nerd_Font','Iosevka',monospace] text-2xl mb-1.5 leading-none flex items-center justify-center"
                    style={{ color: item.color }}
                  >
                    {item.icon}
                  </span>
                  <span className="text-xs font-mono text-[#a9b1d6] group-hover:text-[#7dcfff] truncate w-full">
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