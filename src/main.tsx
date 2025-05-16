import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Providers } from './providers.tsx'
import { Theme } from "@radix-ui/themes";
<<<<<<< HEAD
=======
import "@radix-ui/themes/styles.css";

>>>>>>> refs/remotes/origin/main

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    	<Theme>
    <Providers>
    <App />
    </Providers>
    </Theme>
  </StrictMode>,
)
