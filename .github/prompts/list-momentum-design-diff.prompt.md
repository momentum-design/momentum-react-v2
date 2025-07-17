---
mode: agent
tools: ['editFiles', 'fetch', 'search']
---

Important: 
- Always run every step, even if you think the result is already up to date or unchanged. Do not skip any step for any reason.
- Run the steps in the exact order specified below.
- The output of this prompt should be a changes.md markdown file that contains a summary of all changes between the current version and the latest version of the selected Momentum Design package.

This prompt is designed to list differences between versions of Momentum Design packages. 
It will help you identify changes made in the latest version compared to the current version used in package.json.

Instructions:
1. Ask for which package you want to list the differences between versions. Give the user a choice of packages.
   - The possible choices are:
     - "@momentum-design/components"
     - "@momentum-design/icons"
     - "@momentum-design/tokens"
     - "@momentum-design/animations"
     - "@momentum-design/fonts"
     - "@momentum-design/brand-visuals"
2. Once the user selects a package, follow the steps below to list differences between current and the latest version.
3. Save the last part of the selected package name (i.e. components, icons, ...) in a variable called SELECTED_PACKAGE_SHORT for later use.
4. Save the current version of the selected package in variable CURRENT_VERSION for later use (find the current version in package.json file).
5. Save the variable RELEASES_URL with value of https://github.com/momentum-design/momentum-design/releases?expanded=true&q="%40momentum-design%2F{SELECTED_PACKAGE_SHORT}". 
    - Replace {SELECTED_PACKAGE_SHORT} with the value of the SELECTED_PACKAGE_SHORT variable.
    - Keep the url exactly as is, do not remove " or ' from it. 
    - Do not replace special chars with their URL encoded equivalents.
6. Fetch RELEASES_URL and traverse all paginated results to generate a summary of all changes between the CURRENT_VERSION and LATEST_VERSION.
    - Always start from page 1 and continue incrementing the page number using the "&page=PAGE_NUMBER" URL parameter (append at the end) until you have found the release entry for CURRENT_VERSION or there are no more pages.
    - On each page, collect all release notes for the selected package between CURRENT_VERSION and LATEST_VERSION (inclusive of LATEST_VERSION, exclusive of CURRENT_VERSION).
    - If the release for CURRENT_VERSION is not found, continue to the next page.
    - Do not stop after a fixed number of pages; keep paginating until the release for CURRENT_VERSION is found or there are no more results.
    - Stop traversing pages once you have found the release for CURRENT_VERSION or there are no more results.
    - Generate a changes.md markdown file locally with the changes (summarise them in a logical way).