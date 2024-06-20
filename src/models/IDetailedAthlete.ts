import IAthlete from "@/models/IAthlete.ts";
import IResult from "@/models/IResult.ts";


export default interface IDetailedAthlete extends IAthlete {
	results: IResult[]
}