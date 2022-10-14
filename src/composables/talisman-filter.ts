import _lowercase from 'lodash/lowerCase';
import _each from 'lodash/each';
import _filter from 'lodash/filter';
import _split from 'lodash/split';
import { translate } from 'src/utils/translation';
import { Talisman } from 'src/models/talisman';
import { MeldingFilterOptions, useMeldingFilter } from 'src/composables/talisman-filter-melding';

export interface TalismanFilter {
  search: string
  showFavorite: boolean
  showMeldingFilter: boolean
  options: {
    meldingFilter: MeldingFilterOptions
  }
}

/**
 * Comparison function to find terms in primarySkill or secondarySkill name of a talisman
 * Mostly used on Talisman's filter
 * @param talisman Talisman used for comparison
 * @param term Term to find
 */
function compareTalismanBySkill(talisman: Talisman, term: string): boolean {
  // Always search into current locale translations
  return _lowercase(translate(talisman.primarySkill?.id)).includes(_lowercase(term))
    || _lowercase(translate(talisman.secondarySkill?.id)).includes(_lowercase(term));
  // // Always search into english translations (Disabled) TODO: maybe return has an option
  // || _lowercase(translateInEn(talisman.primarySkill?.id)).includes(_lowercase(terms))
  // || _lowercase(translateInEn(talisman.secondarySkill?.id)).includes(_lowercase(terms));
}

/**
 * Comparison function to find terms in slots of a talisman
 * Mostly used on Talisman's filter
 * @param talisman Talisman used for comparison
 * @param term Term to find
 */
function compareBySlots(talisman: Talisman, term: string): boolean {
  return _lowercase(talisman.slots?.id).includes(_lowercase(term));
}

export function useTalismanFilter() {
  /**
   * Filter Talisman's list
   * @param talismans Talisman's list to apply filters
   * @param filterOptions TalismanFilter options
   */
  function filterTalismans(talismans: Talisman[], filterOptions: TalismanFilter) {
    let filteredTalismans = talismans;

    if (filterOptions.showMeldingFilter) {
      const { applyMeldingFilter } = useMeldingFilter(filteredTalismans, filterOptions.options.meldingFilter);
      filteredTalismans = applyMeldingFilter();
    }

    _each(_split(filterOptions.search, ','), (term: string) => {
      filteredTalismans = _filter(filteredTalismans, (talisman: Talisman) => (
        // Search term in Skill's name or Slots
        (compareTalismanBySkill(talisman, term) || compareBySlots(talisman, term))
        // filter options : showFavorite
        && (filterOptions.showFavorite ? talisman.favorite : true)));
    });

    return filteredTalismans;
  }

  return {
    filterTalismans,
  };
}
