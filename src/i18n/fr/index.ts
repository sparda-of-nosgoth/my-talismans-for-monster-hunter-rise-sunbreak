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
  manager: {
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
    talisman: {
      form_add: {
        label: 'Ajouter un talisman',
        skill1: {
          label: 'Talent principal',
        },
        skill2: {
          label: 'Talent secondaire',
        },
        slots: {
          label: 'Emplacements',
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
      help: {
        filter_favorites: {
          title: 'Filtre : Talismans favoris',
          content: 'Ce filtre permet d\'afficher uniquement les talismans qui ont été ajoutés en tant que favoris.',
        },
        filter_to_meld: {
          title: 'Filtre : Talismans à fusionner',
          content: 'Ce filtre permet d\'afficher les talismans qui ne sont pas assez intéressants pour être gardés, et qui devraient être utilisés dans le centre de fusion.',
          sub_content: 'La sélection se base sur :',
          sub_content_part_1: '- La valeur des talents en fonction du niveau, c\'est à dire que plus l\'emplacement nécessaire pour obtenir un point du talent avec un joyau est grand, plus grande est la valeur du talent.',
          sub_content_part_2: '- La cohérence entre les deux talents, par exemple, si un talent épéiste et un talent artilleur sont sur un même talisman, cela fait chuter sa valeur.',
          sub_content_part_3: '- La qualité des emplacements disponible sur le talisman.',
          sub_content_part_4: '- La disponibilité des talents sur d\'autres talismans de meilleurs qualités.',
          sub_content_part_5: '- Les talismans favoris ne sont pas pris en compte.',
        },
        search: {
          title: 'Recherche',
          content: 'Ce champ permet d\'effectuer des recherches sur :',
          sub_title_skill: 'Le nom des talents',
          sub_content_skill: 'Il est possible de faire une recherche dans la langue sélectionnée par l\'utilisateur mais aussi en anglais.',
          sub_title_slots: 'Les emplacements',
          sub_content_slots: 'La recherche s\'effectue en utilisant des chiffres et des tirets, par exemple "2-1" pour afficher les talismans avec des emplacements 2-1-0, 2-1-1, 2-2-1 ou 3-2-1.',
        },
        title: 'Aide',
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
        add_to_for_melding: 'À fusionner',
        delete_talisman: 'Supprimer le talisman',
        import_export_talismans: 'Import/Export des talismans',
        toggle_show_favorite: 'Afficher les talismans favoris',
        toggle_show_to_meld: 'Afficher les talismans à fusionner',
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
  },
  ...skillTranslation,
  ...skillTypeTranslation,
};
