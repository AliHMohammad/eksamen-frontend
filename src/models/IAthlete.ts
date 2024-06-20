import IClub from "@/models/IClub.ts";
import IDiscipline from "@/models/IDiscipline.ts";


export default interface IAthlete {
	id: number,
	firstName: string,
	middleName: string,
	lastName: string,
	fullName: string,
	gender: string,
	dateOfBirth: Date,
	age: number,
	club: IClub
	disciplines: IDiscipline[]
}