import { rmSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

export default function patchRemoveNetworkLib(rootDir: string) {
    let libDir = resolve(rootDir, "libraries"), libCMakePath = resolve(libDir, "CMakeLists.txt");

    rmSync(resolve(libDir, "lib-network-manager"), { recursive: true });
    rmSync(resolve(libDir, "lib-sentry-reporting"), { recursive: true });

    let libCMake: string = readFileSync(libCMakePath, 'utf-8');
    let patchCMake = libCMake
        .replace(`if ( \${_OPT}has_networking )`, "").replace(`list( APPEND LIBRARIES lib-network-manager)`, "").replace(`endif()`, "")
        .replace(`list( APPEND LIBRARIES lib-sentry-reporting)`, "");


    writeFileSync(libCMakePath, patchCMake);
}