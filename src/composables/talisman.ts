import { Skill } from 'src/composables/skill';
import { Slots } from 'src/composables/slots';
import _lowercase from 'lodash/lowerCase';
import { useTalismanStore } from 'stores/talismans';
import { onMounted } from 'vue';
import * as localforage from 'localforage';
import _filter from 'lodash/filter';
import _now from 'lodash/now';
import { translate, translateInEn } from 'src/utils/translation';

export interface Talisman {
  id: number
  skill1: Skill | null
  skill1Level: number
  skill2: Skill | null
  skill2Level: number | null
  slots: Slots
  forMelting: boolean
  favorite: boolean
}

export function useTalisman() {
  const talismanStore = useTalismanStore();

  onMounted(() => {
    localforage.getItem<string>('mhrs-talismans')
      .then((value) => {
        talismanStore.talismans = JSON.parse(value ?? '[]');
      })
      .catch(/* TODO catch error, use notify ? */);
  });

  talismanStore.$onAction(({ after }) => {
    after(() => {
      localforage.setItem('mhrs-talismans', JSON.stringify(talismanStore.talismans))
        .then((value) => {
          talismanStore.talismans = JSON.parse(value);
        })
        .catch(/* TODO catch error, use notify ? */);
    });
  });

  const newTalisman: Talisman = {
    id: _now(),
    skill1: null,
    skill1Level: 1,
    skill2: null,
    skill2Level: 0,
    slots: {
      slot1: 0,
      slot2: 0,
      slot3: 0,
    },
    favorite: false,
    forMelting: false,
  };

  function findTalismanBySkill(talisman: Talisman, terms: string): boolean {
    const skill1Name = talisman.skill1?.name ?? '';
    const skill2Name = talisman.skill2?.name ?? '';

    // Always search into current locale translations
    return _lowercase(translate(skill1Name)).includes(_lowercase(terms))
      || _lowercase(translate(skill2Name)).includes(_lowercase(terms))
      // Always search into english translations
      || _lowercase(translateInEn(skill1Name)).includes(_lowercase(terms))
      || _lowercase(translateInEn(skill2Name)).includes(_lowercase(terms));
  }

  function findTalismanBySlots(talisman: Talisman, terms: string): boolean {
    return _lowercase(`${talisman.slots?.slot1}-${talisman.slots?.slot2}-${talisman.slots?.slot3}`).includes(_lowercase(terms));
  }

  function filterTalismans(talismans: Talisman[], terms: string) {
    return _filter(talismans, (talisman: Talisman) => findTalismanBySkill(talisman, terms) || findTalismanBySlots(talisman, terms));
  }

  return {
    newTalisman,
    talismans: talismanStore.talismans,
    filterTalismans,
  };
}
