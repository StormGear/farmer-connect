<<<<<<< HEAD
/// <reference types="vite/client" />
=======
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

>>>>>>> refs/remotes/origin/main
