import skillTranslation from './skill';
import skillTypeTranslation from './skill-type';

export default {
  app_title: 'MHRS - Gestionnaire de talismans',
  dialog: {
    button: {
      confirm: 'Confirmer',
      cancel: 'Annuler',
    },
  },
  menu: {
    header: 'Menu principal',
    talisman_manager: {
      label: 'Mes talismans',
    },
    talisman_import_export: {
      label: 'Import/Export des talismans',
    },
    skills_translation: {
      label: 'Traduction des talents',
    },
    settings: 'Options',
  },
  settings: {
    clear_data: {
      dialog: {
        warning_title: 'Attention !',
        warning_message: 'Cette action est irréversible, voulez-vous vraiment supprimer l\'intégralité des données ?',
      },
      label: 'Supprimer les données',
    },
    language: {
      label: 'Langue',
      en: {
        label: 'Anglais',
      },
      fr: {
        label: 'Français',
      },
    },
  },
  talisman: {
    export: {
      label: 'Export',
      title: 'Talismans exportées',
      to_file: {
        label: 'Exporter en CSV',
        error: 'Le navigateur a refusé le téléchargement du fichier.',
      },
    },
    import: {
      errors: {
        skill1: {
          not_found: 'Le talent principal n\'existe pas pour le talisman suivant : | Le talent principal n\'existe pas pour les talismans suivants :',
          is_empty: 'Le talent principal ne peut être vide pour le talisman suivant : | Le talent principal ne peut être vide pour les talismans suivants :',
        },
        skill2: {
          not_found: 'Le talent secondaire n\'existe pas pour le talisman suivant : | Le talent secondaire n\'existe pas pour les talismans suivants :',
          is_empty: 'Le talent secondaire ne peut être vide (son niveau étant renseigné) pour le talisman suivant :',
        },
        skill1Level: {
          is_empty: 'Le niveau du talent principal ne peut être vide ou zéro pour le talisman suivant : | Le niveau du talent principal ne peut être vide ou zéro pour les talismans suivants :',
          exceeds_maximum: 'Le niveau du talent principal est supérieur au niveau maximum pour ce talent pour le talisman suivant : | Le niveau du talent principal est supérieur au niveau maximum pour ce talent pour les talismans suivants :',
        },
        skill2Level: {
          is_empty: 'Le niveau du talent secondaire ne peut être vide ou zéro pour le talisman suivant : | Le niveau du talent secondaire ne peut être vide ou zéro pour les talismans suivants :',
          exceeds_maximum: 'Le niveau du talent secondaire est supérieur au niveau maximum pour ce talent pour le talisman suivant : | Le niveau du talent secondaire est supérieur au niveau maximum pour ce talent pour les talismans suivants :',
        },
        slots: {
          not_found: 'L\'emplacement n\'existe pas pour le talisman suivant : | L\'emplacement n\'existe pas pour les talismans suivants :',
        },
      },
      label: 'Import',
      submit: 'Importer',
      success: 'Un talisman importé avec succès. | {count} talismans importés avec succès.',
      talismans_to_import: 'Aucun talisman ne sera importé. | Un seul talisman sera importé. | {count} talismans seront importés.',
      title: 'Talismans à importer',
    },
    manager: {
      form_add: {
        label: 'Ajouter un talisman',
        skill1: {
          label: 'Talent principal',
        },
        skill2: {
          label: 'Talent secondaire',
        },
        button: {
          cancel: {
            label: 'Annuler',
          },
          submit: {
            label: 'Ajouter',
          },
        },
      },
      melting_filter: {
        label: 'Fusion de talisman',
      },
      table: {
        header: {
          skill1: 'Talent principal',
          skill2: 'Talent secondaire',
          slots: 'Emplacements',
        },
        label: 'Mes talismans',
        no_data: 'Aucun talisman à afficher',
        search: 'Rechercher',
      },
      tooltip: {
        add_talisman: 'Ajouter un talisman',
        add_to_favorite: 'Ajouter aux favoris',
        add_to_for_melting: 'À fusionner',
        delete_talisman: 'Supprimer le talisman',
        toggle_show_favorite: 'Afficher les talismans favoris',
        toggle_show_melting_filter: 'Afficher les talismans à fusionner',
      },
    },
    validation: {
      skill1: {
        not_found: 'Le talent principal n\'existe pas.',
        is_empty: 'Le talent principal ne peut être vide.',
      },
      skill1Level: {
        is_empty: 'Le niveau du talent principal ne peut être vide ou zéro.',
        exceeds_maximum: 'Le niveau du talent principal ({level}) est supérieur au niveau maximum pour ce talent ({level_maximum}).',
      },
      skill2: {
        not_found: 'Le talent secondaire n\'existe pas.',
        is_empty: 'Le talent secondaire ne peut être vide, son niveau étant renseigné.',
      },
      skill2Level: {
        is_empty: 'Le niveau du talent secondaire ne peut être vide ou zéro.',
        exceeds_maximum: 'Le niveau du talent secondaire ({level}) est supérieur au niveau maximum pour ce talent ({level_maximum}).',
      },
      slots: {
        not_found: 'L\'emplacement {slots} n\'existe pas.',
      },
    },
  },
  ...skillTranslation,
  ...skillTypeTranslation,
};
