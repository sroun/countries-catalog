<script setup lang="ts">
import { ref } from 'vue';
import Modal from './Modal.vue';

const props = defineProps({
	country: {}
})

const isDialog = ref(false)

const { country } = props

const illiterateNativeName = (obj: any) => {
	if (obj == null) return

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
		<div class="aspect-[1.5] p-4 cursor-pointer"
			@click.prevent="openModal"
		>
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
	<Modal v-if="isDialog" @close="(v) => isDialog = v">
		<div class="w-full">
			<img :src="country.flags.png" alt="" class="w-full h-1/2 rounded-md">
			<div class="mt-4">
				<p class="font-semibold text-2xl truncate font-popins">
					{{ country.name.official }}
				</p>
				<p class="font-semibold truncate font-popins text-sm">
					{{ illiterateNativeName(country.name.nativeName) }}
				</p>
				<p class="text-sm text-gray-500 mt-4">CCA2: {{ country.cca2 }}</p>
				<p class="text-sm text-gray-500">CCA3: {{ country.cca3 }}</p>

				<div class="space-y-1">
					<p class="font-popins text-sm mt-4">
					<span class="text-gray-600 font-semibold">Capital:</span> {{ country.capital }}
				</p>
				<p class="font-popins text-sm">
					<span class="text-gray-600 font-semibold">Region:</span> {{ country.region }}
				</p>
				<p class="font-popins text-sm">
					<span class="text-gray-600 font-semibold">Sub Region:</span> {{ country.subregion }}
				</p>
				<p class="font-popins text-sm">
					<span class="text-gray-600 font-semibold">Languages:</span> {{ Object.values(country.languages)}}
				</p>
				<p class="font-popins text-sm">
					<span class="text-gray-600 font-semibold">Time Zones:</span> {{ country.timezones }}
				</p>
				<p class="text-sm text-gray-500 font-popins">
					<span class="text-gray-600 font-semibold">Alternative Spellings:</span> <span v-for="(spell, sIndex) in country.altSpellings" :key="sIndex" class="mr-2">{{ spell }},</span>
				</p>
				</div>
			</div>
		</div>
	</Modal>
</template>