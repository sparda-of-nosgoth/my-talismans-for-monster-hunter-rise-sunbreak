import skillTranslation from './skill';
import skillTypeTranslation from './skill-type';

export default {
  error: {
    not_found: {
      code: '404',
      caption: 'La page demandée n\'a pas pu être localisée',
    },
    button: {
      return_to_homepage: {
        label: 'Retourner vers la page principale',
      },
    },
  },
  dialog: {
    button: {
      confirm: 'Confirmer',
      cancel: 'Annuler',
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
        sub_content_skill: 'La recherche s\'effectue dans la langue sélectionnée par l\'utilisateur, il n\'est pas nécessaire de renseigner le nom complet du talent, par exemple "mort" va afficher les talismans avec les talents "Trompe-la-mort", "Salve mortelle" ou "Mise à mort".',
        sub_title_slots: 'Les emplacements',
        sub_content_slots: 'La recherche s\'effectue en utilisant des chiffres et des tirets, par exemple "2-1" pour afficher les talismans avec des emplacements 2-1-0, 2-1-1, 2-2-1 ou 3-2-1.',
        sub_content_combine_search: 'Il est possible de combiner les recherches en utilisant une virgule, par exemple "mort, 2-1" pour afficher les talismans ayant les talents "Trompe-la-mort", "Salve mortelle" ou "Mise à mort", et avec les emplacements 2-1-0, 2-1-1, 2-2-1 ou 3-2-1.',
      },
      title: 'Aide',
      externals_tools: {
        title: 'Outils externes',
        content: 'Les données exportées peuvent être utilisés sur les outils suivant :',
        link_1: {
          title: 'Monster Hunter Rise : Sunbreak Armorset Search',
          caption: 'Outil permettant d\'optimiser les builds d\'armures via un moteur de recherche puissant.',
        },
        link_2: {
          title: 'MHR Builder',
          caption: 'Interface permettant de créer des builds.',
        },
        link_3: {
          title: 'Ping\'s MHRS Dex',
          caption: 'Ce logiciel intègre un outil permettant d\'optimiser les builds d\'armures, mais une conversion avec les ID des talents est nécessaire.',
        },
      },
    },
    import: {
      errors: {
        primary_skill: {
          not_found: 'Le talent principal n\'existe pas pour le talisman suivant : | Le talent principal n\'existe pas pour les talismans suivants :',
          is_empty: 'Le talent principal ne peut être vide pour le talisman suivant : | Le talent principal ne peut être vide pour les talismans suivants :',
        },
        primarySkillLevel: {
          is_empty: 'Le niveau du talent principal ne peut être vide ou zéro pour le talisman suivant : | Le niveau du talent principal ne peut être vide ou zéro pour les talismans suivants :',
          exceeds_maximum: 'Le niveau du talent principal est supérieur au niveau maximum pour ce talent pour le talisman suivant : | Le niveau du talent principal est supérieur au niveau maximum pour ce talent pour les talismans suivants :',
        },
        secondary_skill: {
          not_found: 'Le talent secondaire n\'existe pas pour le talisman suivant : | Le talent secondaire n\'existe pas pour les talismans suivants :',
          is_empty: 'Le talent secondaire ne peut être vide (son niveau étant renseigné) pour le talisman suivant :',
        },
        secondarySkillLevel: {
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
      form: {
        label: 'Ajouter un talisman',
        primary_skill: {
          label: 'Talent principal',
        },
        secondary_skill: {
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
      list: {
        header: {
          primary_skill: 'Talent principal',
          secondary_skill: 'Talent secondaire',
          slots: 'Emplacements',
        },
        label: 'Mes talismans',
        no_data: 'Aucun talisman à afficher',
        search: 'Rechercher',
      },
      validation: {
        primary_skill: {
          not_found: 'Le talent principal n\'existe pas.',
          is_empty: 'Le talent principal ne peut être vide.',
        },
        primarySkillLevel: {
          is_empty: 'Le niveau du talent principal ne peut être vide ou zéro.',
          exceeds_maximum: 'Le niveau du talent principal ({level}) est supérieur au niveau maximum pour ce talent ({level_maximum}).',
        },
        secondary_skill: {
          not_found: 'Le talent secondaire n\'existe pas.',
          is_empty: 'Le talent secondaire ne peut être vide, son niveau étant renseigné.',
        },
        secondarySkillLevel: {
          is_empty: 'Le niveau du talent secondaire ne peut être vide ou zéro.',
          exceeds_maximum: 'Le niveau du talent secondaire ({level}) est supérieur au niveau maximum pour ce talent ({level_maximum}).',
        },
        slots: {
          not_found: 'L\'emplacement {slots} n\'existe pas.',
        },
      },
    },
    title: 'Mes talismans',
    tooltip: {
      add_talisman: 'Ajouter un talisman',
      add_to_favorite: 'Ajouter aux favoris',
      add_to_for_melding: 'À fusionner',
      delete_talisman: 'Supprimer le talisman',
      import_export_talismans: 'Import/Export des talismans',
      toggle_show_favorite: 'Afficher les talismans favoris',
      toggle_show_to_meld: 'Afficher les talismans à fusionner',
    },
  },
  menu: {
    header: 'Menu principal',
    talisman_manager: {
      label: 'Mes talismans',
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
    remote_save: {
      conflict_dialog: {
        content: 'Il y a un ou plusieurs conflits entre la sauvegarde locale et la sauvegarde distante, veuillez-sélectionner une résolution.',
        local_save_title: 'Sauvegarde locale :',
        remote_save_title: 'Sauvegarde distante :',
        title: 'Conflits entre les sauvegardes',
        button: {
          keep_remote: 'Conserver la modification distante',
          keep_local: 'Conserver la modification locale',
        },
      },
      enabled: 'Sauvegarde activée avec le compte : {account}',
      login: {
        error: 'Impossible de se connecter avec le compte Google',
      },
      logout: {
        label: 'Se déconnecter',
      },
      title: 'Sauvegarde des données',
      tooltip: 'Se connecter avec un compte permet de retrouver ses données sur d\'autres appareils',
    },
  },
  ...skillTranslation,
  ...skillTypeTranslation,
};
