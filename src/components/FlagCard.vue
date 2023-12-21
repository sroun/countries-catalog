<script setup lang="ts">
import { ref } from 'vue';
import Modal from './Modal.vue';

const props = defineProps({
	country: {}
})

const isDialog = ref(false)

const  { country } = props

const illiterateNativeName = (obj:any) => {
	if(obj == null) return
	
  const values = Object.values(obj);

if (values.length > 0) {
  const { official } = values[values.length - 1];
  return official;
}

// Return undefined if the object has no properties
return undefined;
}

const openModal = () => {
	isDialog.value = true
}
</script>

<template>
	<div class="bg-gray-50 w-full rounded-xl">
		<div class="aspect-[1.5] p-4 cursor-pointer">
			<img :src="country.flags.png" alt="" class="w-full h-full rounded-md">
		</div>
		<div class="p-4">
			<a href="#" @click.prevent="openModal" class="text-blue-400 hover:text-blue-500 duration-150 transition-all">
				<p class="font-semibold truncate font-popins">
				{{ country.name.official }}
			</p>
		</a>
			<p class="font-semibold truncate font-popins text-sm">
				{{ illiterateNativeName(country.name.nativeName) }}
			</p>
			<p class="text-sm text-gray-500 mt-2">
				{{ country.cca2 }},
				{{ country.cca3 }}
			</p>
			<p class="text-xs text-gray-500 font-popins mt-4">
				<span v-for="(spell, sIndex) in country.altSpellings" :key="sIndex" class="mr-2">{{ spell }}</span>
			</p>
		</div>
	</div>
	<Modal v-if="isDialog" />
</template>