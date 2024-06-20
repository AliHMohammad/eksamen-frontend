import IDiscipline from "@/models/IDiscipline.ts";


export default interface IResult {
	id: number,
	date: Date,
	value: number,
	discipline: IDiscipline
}