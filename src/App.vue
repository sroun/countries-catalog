<script setup lang="ts">
import { computed, ref, watch, watchEffect } from 'vue';
import { useCountryStore } from './stores/country';
import {
  OrderByEnum,
  orderBy,
  useOffsetPagination,
  fuzzyNameSearch
} from '@/cores/funtionality'

import InputSearch from './components/InputSearch.vue';
import ButtonComponent from './components/Button.vue';
import LoadingSpinner from './components/LoadingSpinner.vue';
import FlagCard from './components/FlagCard.vue';


const countryStore = useCountryStore();
const loading = ref(false);
const searchCriteria = ref("");
const orderNameBy = ref();

const countries = ref<Array<any>>([]);
const startIndex = ref(0);
const endIndex = ref(25);


const displayCountries = computed(() => orderBy(countries.value.slice(startIndex.value, endIndex.value),orderNameBy.value));

const isFirstPage = computed(() => startIndex.value === 0)
const isLastPage = computed(() => endIndex.value >= countries.value.length)

const { next, prev } = useOffsetPagination({
  data: countries,
  startIndex,
  endIndex
})

const initialLoad = async () => {
  loading.value = true;
  await countryStore.fetchCountry();
  countries.value = countryStore.resources;
  loading.value = false;
};

const orderCountryNameBy = async (order: OrderByEnum) => {
  orderNameBy.value = order;
  loading.value = true
  setTimeout(() => { loading.value = false }, 1000)
};

const searchCountries = () => {
  startIndex.value = 0
  endIndex.value = 25
  countries.value = fuzzyNameSearch(countryStore.resources, searchCriteria.value)
  loading.value = true
  setTimeout(() => { loading.value = false }, 1000)
};

watch(searchCriteria, searchCountries);
watchEffect(initialLoad);



</script>

<template>
  <main>
    <div class="container mx-auto sm:px-14">
      <header>
        <div class="px-4">
          <div class="mt-12 font-semibold font-popins text-2xl ">
            Countries Catalog
          </div>
          <!-- search block -->
          <InputSearch v-model:model-value="searchCriteria" />
          <!-- end search  -->

          <!-- sort block -->
          <div class="mt-8">
            <h3 class="font-popins font-semibold text-gray-500">Sort by name </h3>
            <div class="flex justify-between items-center">
              <div class="mt-2 flex space-x-2">
                <ButtonComponent @click="orderCountryNameBy(OrderByEnum.ASC)"
                  class="border border-blue-500 hover:bg-blue-50"
                  :class="{ 'bg-blue-50': orderNameBy == OrderByEnum.ASC }">Ascending</ButtonComponent>
                <ButtonComponent @click="orderCountryNameBy(OrderByEnum.DESC)"
                  class="border border-blue-500 hover:bg-blue-50"
                  :class="{ 'bg-blue-50': orderNameBy == OrderByEnum.DESC }">Descending</ButtonComponent>
              </div>
              <div class="mt-2 flex space-x-2">
                <ButtonComponent @click="prev" 
                  :disabled="isFirstPage"
                  :class="{
                    'bg-blue-500 text-white hover:bg-blue-700': !isFirstPage,
                    'bg-gray-200 hover:bg-gray-300': isFirstPage
                  }"
                >Previous</ButtonComponent>
                <ButtonComponent 
                  :disabled="isLastPage"
                  :class="{
                    'bg-gray-200 hover:bg-gray-300': isLastPage,
                    'bg-blue-500 text-white hover:bg-blue-700': !isLastPage,
                  }"

                  @click="next">Next</ButtonComponent>
              </div>
            </div>
          </div>
          <!-- end sort block -->
        </div>
      </header>
      <!-- grid wrapper catalog -->
      <div class="px-4">
        <div class="grid grid-col-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 xl:gap-6 my-4 md:mb-12 ">
          <FlagCard v-for="(country, index) in displayCountries" :key="country.cca2 + index" :country="country" />
        </div>
      </div>
      <!-- end grid wrapper -->
    </div>
  </main>
  <LoadingSpinner v-if="loading" />
</template>

