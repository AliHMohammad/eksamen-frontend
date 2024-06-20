import IResult from "@/models/IResult.ts";
import IAthlete from "@/models/IAthlete.ts";


export default interface IDetailedResult extends IResult {
	athlete: IAthlete
}