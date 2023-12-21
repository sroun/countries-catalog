<script setup lang="ts">

const emit = defineEmits(['update:modelValue'])

const handlerInput = (event:any) => {
	const value = event.target.value
	emit('update:modelValue', value)
}
</script>

<template>
	<div class="relative mt-4">
		<div class="absolute left-0 flex items-center inset-y-0 pl-3 pointer-events-none">
			<svg aria-hidden="true" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
					d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
			</svg>
		</div>
		<input 
			type="search" class="border rounded-md py-2 pl-10 pr-3 border-gray-300 w-full outline-none"
			placeholder="Search by name"
			@input="handlerInput"
		>
	</div>
</template>