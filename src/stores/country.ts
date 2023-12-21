
import { defineStore } from 'pinia'

import { getCountry } from '@/api/countryApi';

export const useCountryStore = defineStore({
  id: 'country',
  state: () => ({
    resources: [],
  }),
  actions: {
    async fetchCountry(){
      const { data } = await getCountry();
      return this.resources = data;
    }
  }
})
