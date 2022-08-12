import skillTranslation from './skill';
import skillTypeTranslation from './skill-type';

export default {
  app_title: 'MHRS - Talismans manager',
  menu: {
    header: 'Main Menu',
    talisman_manager: {
      label: 'My talismans',
    },
    talisman_import_export: {
      label: 'Import/Export talismans',
    },
    skills_translation: {
      label: 'Skills translation',
    },
    options: 'Options',
  },
  options: {
    language: {
      label: 'Language',
      en: {
        label: 'English',
      },
      fr: {
        label: 'French',
      },
    },
  },
  talisman: {
    export: {
      label: 'Export',
      title: 'Talismans exported',
      to_file: {
        label: 'Export to CSV',
        error: 'The browser is not allowed to download the file.',
      },
    },
    import: {
      errors: {
        skill1: {
          not_found: 'Primary skill doesn\'t exist on the following talisman: | Primary skill doesn\'t exist on the following talismans:',
          is_empty: 'Primary skill can\'t be empty on the following talisman: | Primary skill can\'t be empty on the following talismans:',
        },
        skill2: {
          not_found: 'Secondary skill doesn\'t exist on the following talisman: | Secondary skill doesn\'t exist on the following talismans:',
          is_empty: 'Secondary skill can\'t be empty (his level being filled) on the following talisman:',
        },
        skill1Level: {
          is_empty: 'Primary skill\'s level can\'t be empty or zero on the following talisman: | Primary skill\'s level can\'t be empty or zero on the following talismans:',
          exceeds_maximum: 'Primary skill\'s level is above the level cap for that skill on the following talisman: | Primary skill\'s level is above the level cap for that skill on the following talismans:',
        },
        skill2Level: {
          is_empty: 'Secondary skill\'s level can\'t be empty or zero on the following talisman: | Secondary skill\'s level can\'t be empty or zero on the following talismans:',
          exceeds_maximum: 'Secondary skill\'s level is above the level cap for that skill on the following talisman: | Secondary skill\'s level is above the level cap for that skill on the following talismans:',
        },
        slots: {
          not_found: 'Slots doesn\'t exist on the following talisman: | Slots doesn\'t exist on the following talismans:',
        },
      },
      label: 'Import',
      submit: 'Import',
      success: 'A successfully imported talisman. | {count} successfully imported talismans.',
      talismans_to_import: 'No talisman will be imported. | Only one talisman will be imported. | {count} talismans will be imported.',
      title: 'Talismans to import',
    },
    manager: {
      form_add: {
        label: 'Add a talisman',
        skill1: {
          label: 'Primary skill',
        },
        skill2: {
          label: 'Secondary skill',
        },
        button: {
          submit: 'Add',
          cancel: 'Cancel',
        },
      },
      melting_filter: {
        label: 'Melting Talismans',
      },
      table: {
        label: 'My talismans',
        search: 'Search',
        header: {
          skill1: 'Primary skill',
          skill2: 'Secondary skill',
          slots: 'Slots',
        },
      },
    },
    validation: {
      skill1: {
        not_found: 'Primary skill doesn\'t exist.',
        is_empty: 'Primary skill can\'t be empty.',
      },
      skill1Level: {
        is_empty: 'Primary skill\'s level can\'t be empty or zero.',
        exceeds_maximum: 'Primary skill\'s level ({level}) is above the level cap for that skill ({level_maximum}).',
      },
      skill2: {
        not_found: 'Secondary skill doesn\'t exist.',
      },
      skill2Level: {
        is_empty: 'Secondary skill\'s level can\'t be empty or zero.',
        exceeds_maximum: 'Secondary skill\'s level ({level}) is above the level cap for that skill ({level_maximum}).',
      },
      slots: {
        not_found: 'Slots doesn\'t exist.',
      },
    },
  },
  ...skillTranslation,
  ...skillTypeTranslation,
};
