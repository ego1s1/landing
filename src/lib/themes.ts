export interface ThemeColors {
  background: string;
  surface: string;
  surfaceAlt: string;
  border: string;
  borderSubtle: string;
  text: string;
  textMuted: string;
  textDim: string;
  accent: string;
  accentCyan: string;
  accentPurple: string;
  accentGreen: string;
  accentYellow: string;
  accentRed: string;
  dotGrid: string;
  shadow: string;
}

export interface Theme {
  id: string;
  name: string;
  colors: ThemeColors;
  wallpaper?: string; // public path, e.g. /wallpapers/gruvbox.jpg
}

export const THEMES: Theme[] = [
  {
    id: "tokyonight",
    name: "Tokyo Night",
    colors: {
      background: "#1a1b26",
      surface: "#1f2335",
      surfaceAlt: "#24283b",
      border: "#414868",
      borderSubtle: "#3b4261",
      text: "#c0caf5",
      textMuted: "#a9b1d6",
      textDim: "#565f89",
      accent: "#7aa2f7",
      accentCyan: "#7dcfff",
      accentPurple: "#bb9af7",
      accentGreen: "#9ece6a",
      accentYellow: "#e0af68",
      accentRed: "#f7768e",
      dotGrid: "#292e42",
      shadow: "#101014",
    },
  },
  {
    id: "nord",
    name: "Nord",
    colors: {
      background: "#2e3440",
      surface: "#3b4252",
      surfaceAlt: "#434c5e",
      border: "#4c566a",
      borderSubtle: "#434c5e",
      text: "#eceff4",
      textMuted: "#d8dee9",
      textDim: "#616e88",
      accent: "#81a1c1",
      accentCyan: "#88c0d0",
      accentPurple: "#b48ead",
      accentGreen: "#a3be8c",
      accentYellow: "#ebcb8b",
      accentRed: "#bf616a",
      dotGrid: "#3b4252",
      shadow: "#191c24",
    },
  },
  {
    id: "catppuccin-mocha",
    name: "Catppuccin Mocha",
    colors: {
      background: "#1e1e2e",
      surface: "#181825",
      surfaceAlt: "#313244",
      border: "#45475a",
      borderSubtle: "#313244",
      text: "#cdd6f4",
      textMuted: "#bac2de",
      textDim: "#585b70",
      accent: "#89b4fa",
      accentCyan: "#89dceb",
      accentPurple: "#cba6f7",
      accentGreen: "#a6e3a1",
      accentYellow: "#f9e2af",
      accentRed: "#f38ba8",
      dotGrid: "#313244",
      shadow: "#11111b",
    },
  },
  {
    id: "gruvbox",
    name: "Gruvbox Dark",
    colors: {
      background: "#282828",
      surface: "#32302f",
      surfaceAlt: "#3c3836",
      border: "#504945",
      borderSubtle: "#3c3836",
      text: "#ebdbb2",
      textMuted: "#d5c4a1",
      textDim: "#928374",
      accent: "#83a598",
      accentCyan: "#8ec07c",
      accentPurple: "#d3869b",
      accentGreen: "#b8bb26",
      accentYellow: "#fabd2f",
      accentRed: "#fb4934",
      dotGrid: "#3c3836",
      shadow: "#1d2021",
    },
    wallpaper: "/wallpapers/gruvbox.jpg",
  },
  {
    id: "dracula",
    name: "Dracula",
    colors: {
      background: "#282a36",
      surface: "#21222c",
      surfaceAlt: "#343746",
      border: "#44475a",
      borderSubtle: "#343746",
      text: "#f8f8f2",
      textMuted: "#cfcfcf",
      textDim: "#6272a4",
      accent: "#6272a4",
      accentCyan: "#8be9fd",
      accentPurple: "#bd93f9",
      accentGreen: "#50fa7b",
      accentYellow: "#f1fa8c",
      accentRed: "#ff5555",
      dotGrid: "#343746",
      shadow: "#191a21",
    },
  },
  {
    id: "solarized-dark",
    name: "Solarized Dark",
    colors: {
      background: "#002b36",
      surface: "#073642",
      surfaceAlt: "#094555",
      border: "#586e75",
      borderSubtle: "#094555",
      text: "#839496",
      textMuted: "#657b83",
      textDim: "#586e75",
      accent: "#268bd2",
      accentCyan: "#2aa198",
      accentPurple: "#6c71c4",
      accentGreen: "#859900",
      accentYellow: "#b58900",
      accentRed: "#dc322f",
      dotGrid: "#073642",
      shadow: "#00141a",
    },
  },
  {
    id: "one-dark",
    name: "One Dark",
    colors: {
      background: "#282c34",
      surface: "#21252b",
      surfaceAlt: "#2c313a",
      border: "#3e4451",
      borderSubtle: "#2c313a",
      text: "#abb2bf",
      textMuted: "#9da5b4",
      textDim: "#4b5263",
      accent: "#61afef",
      accentCyan: "#56b6c2",
      accentPurple: "#c678dd",
      accentGreen: "#98c379",
      accentYellow: "#e5c07b",
      accentRed: "#e06c75",
      dotGrid: "#2c313a",
      shadow: "#191c22",
    },
  },
  {
    id: "monokai",
    name: "Monokai Pro",
    colors: {
      background: "#272822",
      surface: "#1e1f1c",
      surfaceAlt: "#2d2e2b",
      border: "#49483e",
      borderSubtle: "#2d2e2b",
      text: "#f8f8f2",
      textMuted: "#cfcfc2",
      textDim: "#75715e",
      accent: "#66d9e8",
      accentCyan: "#a1efe4",
      accentPurple: "#ae81ff",
      accentGreen: "#a6e22e",
      accentYellow: "#e6db74",
      accentRed: "#f92672",
      dotGrid: "#2d2e2b",
      shadow: "#151510",
    },
  },
  {
    id: "rose-pine",
    name: "Rosé Pine",
    colors: {
      background: "#191724",
      surface: "#1f1d2e",
      surfaceAlt: "#26233a",
      border: "#403d52",
      borderSubtle: "#26233a",
      text: "#e0def4",
      textMuted: "#c4c0d4",
      textDim: "#6e6a86",
      accent: "#9ccfd8",
      accentCyan: "#31748f",
      accentPurple: "#c4a7e7",
      accentGreen: "#9ece6a",
      accentYellow: "#f6c177",
      accentRed: "#eb6f92",
      dotGrid: "#26233a",
      shadow: "#0f0e17",
    },
  },
  {
    id: "everforest",
    name: "Everforest Dark",
    colors: {
      background: "#272e33",
      surface: "#2e383c",
      surfaceAlt: "#374145",
      border: "#4a555b",
      borderSubtle: "#374145",
      text: "#d3c6aa",
      textMuted: "#9da9a0",
      textDim: "#5c6a72",
      accent: "#7fbbb3",
      accentCyan: "#83c092",
      accentPurple: "#d699b6",
      accentGreen: "#a7c080",
      accentYellow: "#dbbc7f",
      accentRed: "#e67e80",
      dotGrid: "#374145",
      shadow: "#1a2124",
    },
  },
];

export const DEFAULT_THEME_ID = "everforest";
