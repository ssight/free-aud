import { sync as globSync } from 'glob';
import { resolve } from 'path';
import { readFileSync, writeFileSync } from 'fs';

export default function removeSentryInclude(rootDir: string) {
    let srcFiles = globSync(resolve(rootDir, "src") + "/**/*.cpp");
    srcFiles.forEach(srcFile => {
        let src = readFileSync(srcFile, 'utf-8');
        let patchSrc = src.replace(`#include "SentryHelper.h"`, "");

        writeFileSync(srcFile, patchSrc);
    })
}