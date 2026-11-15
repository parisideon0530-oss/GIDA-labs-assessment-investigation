# GIDA v8 — Testing branch package

This package preserves the existing v8 interface and modules, with the assessment tracker integrated into each existing student portfolio. The student profile now shows all three CKLA question banks and a link to that student’s editable records.

## Installation

Use only the `gida-v8-testing` branch while testing. Upload the contents of this ZIP **to the repository root** (not a nested folder). Keep `index.html` and all three `gida-*.js` files at the same level; keep the `assets` folder intact. Do not change GitHub Pages from `main` to the testing branch until ready to publish.

## Testing

Open the testing branch preview locally or through a separate test deployment. Open Student Portfolios, choose a student, and expand the Plants, Farms, and Kings and Queens question banks. Open assessment records, edit an entry, save, reload, and confirm it persists. Add another attempt; export JSON and CSV; import a JSON backup after exporting the current records. Check audio controls and curriculum studio.

## Privacy and data storage

The existing profiles and starter records are fictional demonstration content. Edits are saved to localStorage on the current browser/device, not GitHub. Do not enter real student names or identifying assessment records into public GitHub files. Browser storage is not encrypted or centrally backed up; use a district-approved secure system for actual student records.

## Publishing

When satisfied, merge the testing branch into main through a pull request. GitHub Pages is currently configured to publish from main/root, so changes to the testing branch alone will not change the live website.
