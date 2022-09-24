# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- A new section for external tools into help modal.
- A new page for 404 Not Found error.
- A remote save management, with a Google account sign-in button.

### Changed

- Changed project name to My Talismans for Monster Hunter Rise Sunbreak.
- Changed primary and secondary colors, to fit with Sunbreak style.
- Updated help with new feature on search filter.
- Updated search filter to use combine terms to refine search, using comma to separate each term.
- Cleaning on translations keys.
- Cleaning on Changelog: removed sections separators, added more details.
- Changed icons from images folder to icons folder.
- Updated Favicon.
- Import improvement.
- Some refactoring on components.
- Some changes to skill's type :
  - Defiance change from Survival to Stats Defensive.
  - Element Exploit change from Survival to Battle.
- Updated readme.

### Removed

- Removed search on English Skill's name when current locale is not English, source of misunderstandings.
- Removed table header on mobile device.
- Removed unused images and icons.

### Fixed

- Fixed app header style.
- Fixed Talisman card style.
- Fixed Talisman Import tab style.
- Fixed table update when data is cleared.
- Fixed reloading when import form is submitted.

## [0.3.0] - 2022-08-24

### Added

- Added a Talisman's icon to Talisman Manager menu.
- Added a Skill's icon to Skill's Translation menu.
- Added a Talisman's icon to header title.
- Added a button in header's toolbar, to open Import / Export Talismans modal.
- Added tooltips to help on buttons and toggles in header's toolbar.
- Added a button to display a help dialog that explain how to use filters.
- Added Slots icons to Talisman Manager.

### Changed

- Talismans Manager pqge is now the homepage.
- Renamed App temporary name by My Talismans, or Mes Talismans in French, a badge display current Talismans rows.
- Upgraded header with Talismans Manager's toolbar, which include a button to open Talisman's form, filters like Melding, Favorite and input search and a button to display help.
- In Talisman form, Skills are now filtered on found on talisman only.
- In Talisman form, Slots are now displayed with select buttons, icons added.
- Refactoring on components names, changes applied on tests.

### Removed

- Removed Import / Export Talismans from menu.
- Removed page name on Talismans manager page.
- Removed all filters toggles, input search and sticky button to display Talisman's form on Talismans manager page.

### Fixed

- Fixed misreading in translations, like replaced melting by melding, and others.

## [0.2.1] - 2022-08-16

### Added

- A badge to display Talismans number in table header, changes according to filters.
- In settings section, a button to clear all data was added.
- Settings are now saved into a store, and local storage.

### Changed

- Some refactoring on tests and local storage.
- Test coverage to 100%.

### Fixed

- Fixed a bug on header translations when local is changed.
- Fixed a bug that re-add cache data to stores instead of replace it.

## [0.2.0] - 2022-08-13

### Added

- Options section in menu, with locale selector, and display app current version.
- Talismans are now displayed on cards when screen size is xs or sm.
- Talismans are now displayed on rows when screen size is more than sm.
- Talisman's list can be filtered by favorite or for melting, combined with search.
- On Talisman's form, a filter to easily find skill's was added to selectors.
- On each Skill, Decoration props was added, used for melting filter for now.
- A button to filter Talismans to melt.
- A button to export Talismans on CSV file.
- Full support of English translation.
- A new boot file config, to add a global properties $appVersion with the package version.
- More unit tests for components, composables, layout, pages, stores and utils.
- Added Sunbreak data for Skill, Decoration and Slots.

### Changed

- On Talisman's form, Skills select now display a list in alphabetical order.
- Improved CHANGELOG with some subsections to be easily read where modifications happen.
- Improved Talisman interface to class, with weight props for Melting Filter.
- Refactoring on composables, stores, models and tests.

### Fixed

- Fixed missing Skills translations.
- Fixed a bug that display null instead of an empty string in import.
- Fixed some minor bugs.

## [0.1.1] - 2022-07-28

### Added

- Some unit tests for Talisman store.

### Changed

- Minor adjustments to release-it configuration.
- Improved README with some highlighting, coverage badge, and minor changes on Support section.

### Fixed

- Fixed a bug that prevent to remove favorite or to melting to be marked.

## [0.1.0] - 2022-07-28

### Added

- Main layout, and menu to select app sections.
- A new page to manage Talismans, where users can :
  - add a new Talisman, with some validations.
  - delete a Talisman.
  - mark a Talisman has a favorite.
  - mark a Talisman has to melting.
  - search for Talisman based on Skills names, or by Slots.
  - sort Talismans by primary skill, secondary Skill or Slots.
- A new page to exports Talismans and to import Talismans, with some validations.
- A new page to display Skills translation, based on current locale to english.
- README for usage, install and contributing.
- CHANGELOG based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
- French translation.
- QA, CI, scripts and others.
- Some unit tests for Talisman export, import and validation.

[unreleased]: https://gitlab.com/sparda-of-nosgoth/my-talismans-for-monster-hunter-rise-sunbreak/-/compare/0.3.0...main
[0.3.0]: https://gitlab.com/sparda-of-nosgoth/my-talismans-for-monster-hunter-rise-sunbreak/-/compare/0.2.1...0.3.0
[0.2.1]: https://gitlab.com/sparda-of-nosgoth/my-talismans-for-monster-hunter-rise-sunbreak/-/compare/0.2.0...0.2.1
[0.2.0]: https://gitlab.com/sparda-of-nosgoth/my-talismans-for-monster-hunter-rise-sunbreak/-/compare/0.1.1...0.2.0
[0.1.1]: https://gitlab.com/sparda-of-nosgoth/my-talismans-for-monster-hunter-rise-sunbreak/-/compare/0.1.0...0.1.1
[0.1.0]: https://gitlab.com/sparda-of-nosgoth/my-talismans-for-monster-hunter-rise-sunbreak/-/tags/0.1.0
