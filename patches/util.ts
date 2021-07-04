import { sync as globSync } from 'glob';
import { resolve } from 'path';

let srcCache: string[] = null;

export function getSrcFiles(rootDir: string): string[] {
    if (srcCache) return srcCache;
    
    srcCache = globSync(resolve(rootDir, "src") + "/**/*.cpp");
    return srcCache;
}