import { readFileSync, writeFileSync } from 'fs';
import { getSrcFiles } from '../util';

export default function removeDBException(rootDir: string) {
    let srcFiles = getSrcFiles(rootDir);

    srcFiles.forEach(srcFile => {
        let src = readFileSync(srcFile, 'utf-8');
        
        let patchSrc = src.replace(/ADD_EXCEPTION_CONTEXT\([\s\S]*?\);/g, "");

        if (patchSrc.includes("ADD_EXCEPTION_CONTEXT"))  console.log("NO!");

        writeFileSync(srcFile, patchSrc);
    })
}