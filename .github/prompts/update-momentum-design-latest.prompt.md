---
mode: agent
tools: ['changes', 'editFiles', 'fetch', 'runCommands', 'search']
---

Important: 
- Always run every step, even if you think the result is already up to date or unchanged. Do not skip any step for any reason.
- Run the steps in the exact order specified below.

Instructions:
1. Ask for which package you want to update to the latest version. Give the user a choice of packages to update.
   - The possible choices are:
     - "@momentum-design/components"
     - "@momentum-design/icons"
     - "@momentum-design/tokens"
     - "@momentum-design/animations"
     - "@momentum-design/fonts"
     - "@momentum-design/brand-visuals"
2. Once the user selects a package, follow the steps below to update it to the latest version.
3. Get the latest version number of the selected package from here: https://github.com/momentum-design/momentum-design/releases
4. Replace the existing version of the selected package in package.json with the latest and save the file. 
   - Update the version in both "resolutions" and "dependencies" sections if it exists in both.
   - Don't use a range or tilde, use the exact version number.
   - If the version is already the latest, do not make any changes.
   - If the version is not the latest, update it to the latest version.
   - If the package is not present in package.json, do nothing.
5. Run yarn in the terminal
6. Verify that the only changes made are in package.json and yarn.lock files - if other changes have been made, revert them.
