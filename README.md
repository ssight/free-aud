# free-aud
A collection of open source patches that aim to remove all tracking in the free, "open source" audio editor, Audacity.

# Usage
1. Grab the source code for Audacity, either by running `git clone https://github.com/audacity/audacity`, or by going to the [releases section](https://github.com/audacity/audacity/releases/) and downloading the source for the version you want

2. Download free-aud, either by building it yourself ([see here for instructions](https://github.com/ssight/free-aud/wiki/Building-free-aud)) or by downloading the built Typescript from the [releases section](https://github.com/ssight/free-aud/releases)

3. Install [node.js](https://nodejs.org) and add it to your path

4. Run `node . path_to_audacity_source`, where `path_to_audacity_source` is the root directory of where you downloaded the Audacity source

5. free-aud will cleanse the Audacity source from any tracking implemented

6. Follow the regular [Audacity build instructions](https://github.com/audacity/audacity/blob/master/BUILDING.md)


# Types of patches
## Synopsis
### Dynamic
These are patches with logic that apply to all files in the Audacity source, automatically removing any references to tracking. They are located within the `patches/dynamic` directory.
### Static
These are patches that have specific source files bound to them. They patch specific areas of the Audacity source code with different text. They are located within the `patches/static` directory.

## Adding custom patches
### Dynamic
Dynamic patches are written in Typescript and are written with the follow syntax, where `rootDir` is defined as the root directory of the Audacity source code:
```ts
export default function somePatch(rootDir: string) {
    // Your patch code here
}
```
### Static
Static patches have the `.cpp` extension and are written in the following syntax, where `// <before>` is the code that you want to patch, and `// <after>` is the patched code:
```cpp
// <before>
int x = 3;
printf("This is the code before");

// <after>
int x = 4;
printf("This is the patched code");
```

free-aud will automatically detect your patches and apply them accordingly.

# Have improvements?
If you have improvements to the code or have new patches you would like to submit, please feel free to open a pull request with your changes. If you have any problems, don't hesitate to open an issue and I'll try to help as soon as I can.