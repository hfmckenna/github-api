/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly GITHUB_TOKEN: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
