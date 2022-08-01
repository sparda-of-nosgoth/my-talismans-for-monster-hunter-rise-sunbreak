# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- A new boot file **config**, to add a global properties **$appVersion** with the package version.
- **Options** section in menu, with locale selector, and display app current version.
- **Talismans** are now displayed on **rows** when screen size is more than sm.
- More unit tests for components, composables, layout and pages.

### Changed

- **Talismans** are displayed on **cards** when screen size is xs or sm.
- **Skills** select now display a list in alphabetical order.

### Fixed

- Fixed missing translations.
- Fixed a bug that display null instead of an empty string in **import**.
- Fixed some minor bugs.

## [0.1.1] - 2022-07-28

### Added
- Some unit tests for **Talisman** store.

### Changed

- Minor adjustments to release-it configuration.
- Improved **README** with some highlighting, coverage badge, and minor changes on **Support** section.

### Fixed

- Fixed a bug that prevent to remove **favorite** or **to melting** to be marked.

## [0.1.0] - 2022-07-28

### Added

- **README** for usage, install and contributing.
- **CHANGELOG** based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
- A new page to manage **Talismans**, where users can :
  - add a new **Talisman**, with some validations.
  - delete a **Talisman**.
  - mark a **Talisman** has a **favorite**.
  - mark a **Talisman** has **to melting**.
  - search for **Talisman** based on **Skills** names, or by **Slots**.
  - sort **Talismans** by primary **skill**, secondary **Skill** or **Slots**.
- A new page to exports **Talismans** and to import **Talismans**, with some validations.
- A new page to display **Skills** translation, based on current locale to english.
- **French** translation.
- QA, CI, scripts and others.
- Some unit tests for **Talisman** export, import and validation.


[Unreleased]: https://gitlab.com/sparda-of-nosgoth/mhrs-talismans-manager/-/compare/0.1.1...main
[0.1.1]: https://gitlab.com/sparda-of-nosgoth/mhrs-talismans-manager/-/compare/0.1.0...0.1.1
[0.1.0]: https://gitlab.com/sparda-of-nosgoth/mhrs-talismans-manager/-/tags/0.1.0
