import { readFileSync, writeFileSync } from 'fs';
import { getSrcFiles } from '../util';

export default function removeSentryInclude(rootDir: string) {
    let srcFiles = getSrcFiles(rootDir);

    srcFiles.forEach(srcFile => {
        let src = readFileSync(srcFile, 'utf-8');
        let patchSrc = src.replace(`#include "SentryHelper.h"`, "");

        writeFileSync(srcFile, patchSrc);
    })
}