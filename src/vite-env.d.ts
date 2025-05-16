declare module '*.jpeg' {
  const content: string;
  export default content;
}

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_FIREBASE_API_KEY: any;
  readonly VITE_PUBLIC_ONCHAINKIT_API_KEY: string
  readonly VITE_PROJECT_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
