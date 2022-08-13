import _lowercase from 'lodash/lowerCase';
import _filter from 'lodash/filter';
import { translate, translateInEn } from 'src/utils/translation';
import { Talisman } from 'src/models/talisman';
import { MeltingFilterOptions, useMeltingFilter } from 'src/composables/talisman-filter-melting';

export interface TalismanFilter {
  search: string
  showFavorite: boolean
  showForMelting: boolean
  showMeltingFilter: boolean
  options: {
    meltingFilter: MeltingFilterOptions
  }
}

/**
 * Comparison function to find terms in skill1 or skill2 name of a talisman
 * Mostly used on Talisman's filter
 * @param talisman Talisman used for comparison
 * @param terms Terms to find
 */
function compareTalismanBySkill(talisman: Talisman, terms: string): boolean {
  const skill1Name = talisman.skill1?.id ?? '';
  const skill2Name = talisman.skill2?.id ?? '';

  // Always search into current locale translations
  return _lowercase(translate(skill1Name)).includes(_lowercase(terms))
    || _lowercase(translate(skill2Name)).includes(_lowercase(terms))
    // Always search into english translations
    || _lowercase(translateInEn(skill1Name)).includes(_lowercase(terms))
    || _lowercase(translateInEn(skill2Name)).includes(_lowercase(terms));
}

/**
 * Comparison function to find terms in slots of a talisman
 * Mostly used on Talisman's filter
 * @param talisman Talisman used for comparison
 * @param terms Terms to find
 */
function compareBySlots(talisman: Talisman, terms: string): boolean {
  return _lowercase(talisman.slots?.id).includes(_lowercase(terms));
}

export function useTalismanFilter() {
  /**
   * Filter Talisman's list
   * @param talismans Talisman's list to apply filters
   * @param filterOptions TalismanFilter options
   */
  function filterTalismans(talismans: Talisman[], filterOptions: TalismanFilter) {
    let filteredTalismans = talismans;

    const { applyMeltingFilter } = useMeltingFilter(filteredTalismans, filterOptions.options.meltingFilter);
    if (filterOptions.showMeltingFilter) {
      filteredTalismans = applyMeltingFilter();
    }

    filteredTalismans = _filter(filteredTalismans, (talisman: Talisman) => (
      // Search term in Skill's name or Slots
      (compareTalismanBySkill(talisman, filterOptions.search) || compareBySlots(talisman, filterOptions.search))
      // filter options : showFavorite and showForMelting
      && ((filterOptions.showFavorite ? talisman.favorite : true) && (filterOptions.showForMelting ? talisman.forMelting : true))));

    return filteredTalismans;
  }

  return {
    filterTalismans,
  };
}
