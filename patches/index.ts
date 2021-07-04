import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

export default function runPatches(rootDir: string) {
    let dynamicPatches = readdirSync("patches/dynamic").filter(i => i.endsWith(".js")), staticPatches = readdirSync("patches/static").filter(i => i.endsWith(".cpp"));

    console.log(`==== Running dynamic patches ====`);
    dynamicPatches.forEach(patch => {
        console.log(`Running patch '${patch.replace(".js", "")}'...`);
        require(resolve("patches/dynamic", patch))(rootDir);
    });

    console.log(`\n==== Running static patches ====`);
    staticPatches.forEach(patch => {
        let patchName = patch.replace(".cpp", "");
        if (patchName.includes(".")) patchName = patchName.split(".").pop();

        console.log(`Patching file '${patchName}'...`);
        runStaticPatch(patch, rootDir);
    });

    console.log(`\nComplete!`);
}

function runStaticPatch(patchName: string, rootDir: string) {
    let fileToPatch_path = resolve(rootDir, "src", patchName.replace(/\./g, "/").replace("/cpp", ".cpp"));
    
    let patchFile = readFileSync(resolve("patches/static", patchName), 'utf-8'), fileToPatch = readFileSync(fileToPatch_path, 'utf-8');
    
    let beforePatch = patchFile.split("// <before>").pop().split("// <after>")[0].trim(), afterPatch = patchFile.split("// <after>").pop().trim();
    let patchedFile = fileToPatch.replace(beforePatch, afterPatch);

    writeFileSync(fileToPatch_path, patchedFile);
}