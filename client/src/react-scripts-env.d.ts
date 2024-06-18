/// <reference types="react-scripts" />

declare module 'react-scripts' {
    export interface ResolvedConfigPaths {
      appHtml: string;
    }
  }
  
  // Set the correct path to index.html
  declare module 'react-scripts/config/paths' {
    interface Paths {
      appHtml: string;
    }
  }