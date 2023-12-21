import { watch, type Ref, ref } from "vue"

interface SliceIndex {
	start: number,
	end: number
}

interface Pagination {
	data: Ref,
	startIndex: Ref,
	endIndex: Ref
}

export enum OrderByEnum {
	ASC = "ASC",
	DESC = "DESC",
}

export const orderBy = (array: any, orderBy: OrderByEnum) => {
	if (orderBy === OrderByEnum.ASC) {
		return [...array].sort(
			(a, b) => a.name.official.toLowerCase().localeCompare(b.name.official.toLowerCase())
		)
	}

	return [...array].sort(
		(a, b) => b.name.official.toLowerCase().localeCompare(a.name.official.toLowerCase())
	)
}

export const sliceArray = (array: any, sliceIndex: SliceIndex, callback: Function) => {
	return callback(array.slice(sliceIndex.start, sliceIndex.end))
}

export const useOffsetPagination = (props: Pagination) => {

	const { data, startIndex, endIndex, } = props

	const pageSize = ref(25)

	const next = () => {
		if(endIndex.value < data.value.length) {
			startIndex.value = startIndex.value + pageSize.value
			endIndex.value = startIndex.value + pageSize.value
		}
	}

	const prev = () => {
		if (endIndex.value > pageSize.value) {
			startIndex.value = startIndex.value - pageSize.value
			endIndex.value = endIndex.value - pageSize.value
		}
	}

	return { next, prev }
}


export const fuzzyNameSearch = (resources: Array<any>, searchCriteria: string) => resources.filter(
	(country) =>
		country.name.official.toLowerCase().includes(searchCriteria.toLowerCase())
);
