# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

#### Global
- Added a **Talisman** icon to **Talisman Manager** menu.
-
#### Talismans manager
- Added a **Talisman** icon to **Talisman Manager** title.
- Added **Slots** icons to **Talisman Manager**.

### Changed

#### Talismans manager
- In **Talisman form's** section, **Skills** are now filtered on found on talisman only.

## [0.2.1] - 2022-08-16

### Added

#### Global
- In **settings** section, a button to **clear all data** was added.
- **Settings** are now saved into a store, and local storage.

#### Talismans manager
- A badge to display **Talismans** number, changes according to filters.

### Changed

#### Misc
- Some refactoring on tests and local storage.
- Test coverage to 100%.

### Fixed

#### Talismans manager
- Fixed a bug on header translations when local is changed.

#### Misc
- Fixed a bug that re-add cache data to stores instead of replace it.

## [0.2.0] - 2022-08-13

### Added

#### Global

- **Options** section in menu, with locale selector, and display app current version.
- Full support of English translation.

#### Talismans manager

- **Talismans** are now displayed on **rows** when screen size is more than sm.
- **Talisman**'s list can be filtered by favorite or for melting, combined with search.
- On **Talisman**'s form, a filter to easily find skill's was added to selectors.
- On each **Skill**, **Decoration** props was added, used for melting filter for now.
- A button to filter **Talismans** to melt.

#### Talismans Import/Export

- A button to export **Talismans** on CSV file.

#### Misc

- A new boot file **config**, to add a global properties **$appVersion** with the package version.
- More unit tests for components, composables, layout, pages, stores and utils.
- Added Sunbreak data for **Skill**, **Decoration** and **Slots**.

### Changed

#### Talismans manager
- **Talismans** are displayed on **cards** when screen size is **xs** or **sm**.
- On **Talisman**'s form, **Skills** select now display a list in alphabetical order.

#### Misc
- Improved **CHANGELOG** with some subsections to be easily read where modifications happen.
- Improved **Talisman** interface to class, with **weight** props for **Melting Filter**.
- Refactoring on composables, stores, models and tests.

### Fixed

#### Misc
- Fixed missing **Skills** translations.
- Fixed a bug that display null instead of an empty string in **import**.
- Fixed some minor bugs.

## [0.1.1] - 2022-07-28

### Added

#### Misc
- Some unit tests for **Talisman** store.

### Changed

#### Misc
- Minor adjustments to release-it configuration.
- Improved **README** with some highlighting, coverage badge, and minor changes on **Support** section.

### Fixed

#### Talismans manager

- Fixed a bug that prevent to remove **favorite** or **to melting** to be marked.

## [0.1.0] - 2022-07-28

### Added

#### Global
 - Main layout, and menu to select app sections.

#### Talismans manager
- A new page to manage **Talismans**, where users can :
  - add a new **Talisman**, with some validations.
  - delete a **Talisman**.
  - mark a **Talisman** has a **favorite**.
  - mark a **Talisman** has **to melting**.
  - search for **Talisman** based on **Skills** names, or by **Slots**.
  - sort **Talismans** by primary **skill**, secondary **Skill** or **Slots**.

#### Talismans Import/Export
- A new page to exports **Talismans** and to import **Talismans**, with some validations.

#### Skills Translation
- A new page to display **Skills** translation, based on current locale to english.

#### Misc

- **README** for usage, install and contributing.
- **CHANGELOG** based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
- **French** translation.
- QA, CI, scripts and others.
- Some unit tests for **Talisman** export, import and validation.


[unreleased]: https://gitlab.com/sparda-of-nosgoth/mhrs-talismans-manager/-/compare/0.2.1...main
[0.2.1]: https://gitlab.com/sparda-of-nosgoth/mhrs-talismans-manager/-/compare/0.2.0...0.2.1
[0.2.0]: https://gitlab.com/sparda-of-nosgoth/mhrs-talismans-manager/-/compare/0.1.1...0.2.0
[0.1.1]: https://gitlab.com/sparda-of-nosgoth/mhrs-talismans-manager/-/compare/0.1.0...0.1.1
[0.1.0]: https://gitlab.com/sparda-of-nosgoth/mhrs-talismans-manager/-/tags/0.1.0
