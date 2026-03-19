import type { Config } from 'tailwindcss';

// Tailwind CSS v4에서는 디자인 토큰을 globals.css @theme 블록에서 관리합니다.
// 이 파일은 content 경로만 유지합니다.
const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
};

export default config;
