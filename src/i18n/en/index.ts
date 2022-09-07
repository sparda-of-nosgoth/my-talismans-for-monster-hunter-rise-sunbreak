import skillTranslation from './skill';
import skillTypeTranslation from './skill-type';

export default {
  error: {
    not_found: {
      code: '404',
      caption: 'The requested page couldn\'t be found',
    },
    button: {
      return_to_homepage: {
        label: 'Return to homepage',
      },
    },
  },
  dialog: {
    button: {
      confirm: 'Confirm',
      cancel: 'Cancel',
    },
  },
  manager: {
    export: {
      label: 'Export',
      title: 'Talismans exported',
      to_file: {
        label: 'Export to CSV',
        error: 'The browser is not allowed to download the file.',
      },
    },
    help: {
      filter_favorites: {
        title: 'Filter : Favorite talismans',
        content: 'This filter only displays talismans that have been added as favourites.',
      },
      filter_to_meld: {
        title: 'Filter : Talismans to meld',
        content: 'This filter allows to display talismans which are not interesting enough to keep, and which should be used in the melding pot.',
        sub_content: 'The selection is based on:',
        sub_content_part_1: '- The skill\'s value according to the level, ie the greater slots necessary to obtain one skill\'s point with a decoration, the greater the skill\'s value.',
        sub_content_part_2: '- Consistency between two skills, for example, if a swordsman\'s skill and a gunner\'s skill are on the same talisman, it drops its value.',
        sub_content_part_3: '- The quality of slots available on the talisman.',
        sub_content_part_4: '- The availability of skills on other better talismans.',
        sub_content_part_5: '- Favorite talismans are not taken into account.',
      },
      search: {
        title: 'Search',
        content: 'This field allows you to search for:',
        sub_title_skill: 'Skill\'s name',
        sub_content_skill: 'The search is carried out in the user\'s selected language, it\'s not necessary to fulfill the skill\'s full name, for example "sharp" will display the talismans with the talents "Razor Sharp" or "Speed Sharpening".',
        sub_title_slots: 'Slots',
        sub_content_slots: 'The search is performed by using numbers and dashes, for example "2-1" to display talismans with slots 2-1-0, 2-1-1, 2-2-1 or 3-2-1.',
        sub_content_combine_search: 'It\'s possible to combine searches using a comma, for example "sharp, 2-1" to display talismans with the talents "Razor Sharp" or "Speed Sharpening", and with slots 2-1-0, 2-1-1, 2-2-1 or 3-2-1.',
      },
      title: 'Help',
      externals_tools: {
        title: 'External tools',
        content: 'Exported data can be used on the following tools :',
        link_1: {
          title: 'Monster Hunter Rise : Sunbreak Armorset Search',
          caption: 'Tool to optimize armor builds through a powerful search engine.',
        },
        link_2: {
          title: 'MHR Builder',
          caption: 'Tool to create builds.',
        },
        link_3: {
          title: 'Ping\'s MHRS Dex',
          caption: 'A software that includes a tool to optimize armor builds, but require a skill\'s IDs conversion.',
        },
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
    talisman: {
      form: {
        label: 'Add a talisman',
        skill1: {
          label: 'Primary skill',
        },
        skill2: {
          label: 'Secondary skill',
        },
        slots: {
          label: 'Slots',
        },
        button: {
          cancel: {
            label: 'Cancel',
          },
          submit: {
            label: 'Add',
          },
        },
      },
      list: {
        header: {
          skill1: 'Primary skill',
          skill2: 'Secondary skill',
          slots: 'Slots',
        },
        label: 'My talismans',
        no_data: 'No talisman to display',
        search: 'Search',
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
          is_empty: 'Secondary skill can\'t be empty, his level being filled.',
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
    title: 'My talismans',
    tooltip: {
      add_talisman: 'Add a new talisman',
      add_to_favorite: 'Add to favorites',
      add_to_for_melding: 'To meld',
      delete_talisman: 'Remove talisman',
      import_export_talismans: 'Import / Export talismans',
      toggle_show_favorite: 'Display favorites talismans',
      toggle_show_to_meld: 'Show talismans to meld',
    },
  },
  menu: {
    header: 'Main Menu',
    talisman_manager: {
      label: 'My talismans',
    },
    skills_translation: {
      label: 'Skills translation',
    },
    settings: 'Settings',
  },
  settings: {
    clear_data: {
      dialog: {
        warning_title: 'Warning !',
        warning_message: 'This action is irreversible, do you really want to delete all data?',
      },
      label: 'Erase all data',
    },
    language: {
      label: 'Language',
      en: {
        label: 'English',
      },
      fr: {
        label: 'French',
      },
    },
    remote_save: {
      conflict_dialog: {
        content: 'There are one or more conflicts between local save and remote save, please select a resolution.',
        local_save_title: 'Local save :',
        remote_save_title: 'Remote save :',
        title: 'Conflicts between saves',
        button: {
          keep_remote: 'Keep remote save',
          keep_local: 'Keep local save',
        },
      },
      enabled: 'Backup enabled with account : {account}',
      login: {
        error: 'Unable to sign in with Google account',
      },
      logout: {
        label: 'Logout',
      },
      title: 'Data saving',
      tooltip: 'Login with an account to be able to retrieve your data on other devices',
    },
  },
  ...skillTranslation,
  ...skillTypeTranslation,
};
