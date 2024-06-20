import { useState } from "react";
import IDiscipline from "@/models/IDiscipline.ts";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import IClub from "@/models/IClub.ts";
import { Checkbox } from "@/components/ui/checkbox.tsx";


type Props = {
	disciplines: IDiscipline[],
	clubs: IClub[]
}

type TAthleteRequest = {
	fullName: string,
	gender: string,
	dateOfBirth: Date,
	clubId: string,
	disciplineIds: number[]
}

export default function RegisterAthleteForm({ disciplines, clubs }: Props) {
	const [fullname, setFullName] = useState<string>("");
	const [selectedGender, setSelectedGender] = useState<string>("");
	const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
	const [selectedDisciplineIds, setSelectedDisciplineIds] = useState<number[]>([]);
	const [selectedClubId, setSelectedClubId] = useState<number | null>(null);

	const handleCheckboxChange = (selectedId: number) => {
		console.log("HELLO");
		if (selectedDisciplineIds.includes(selectedId)) {
			setSelectedDisciplineIds((prev) => prev.filter(p => p !== selectedId))
		} else {
			setSelectedDisciplineIds((prev) => [...prev, selectedId])
		}
	}



	return (
		<>
			<div className={"w-60 flex justify-center mx-auto py-5 bg-slate-300 border-4"}>
				<form className={"space-y-3"}>
					<div>
						<Label>Full Name</Label>
						<Input required={true} value={fullname} onInput={(e) => setFullName((e.target as HTMLInputElement).value)}></Input>
					</div>

					<div>
						<Label>Gender</Label>
						<Select required={true} onValueChange={setSelectedGender}>
							<SelectTrigger className="w-full">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectItem value="MALE">Male</SelectItem>
									<SelectItem value="FEMALE">Female</SelectItem>
									<SelectItem value="OTHER">Other</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>

					<div>
						<Label>Club</Label>
						<Select required={true} onValueChange={value => setSelectedClubId((Number(value)))}>
							<SelectTrigger className="w-full">
								<SelectValue placeholder={"Select your team"} />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									{clubs.map(c => (
										<SelectItem key={`club-${c.id}`} value={String(c.id)}>{c.name}</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>

					<div>
						<Label>Disciplines</Label>
						{disciplines.map((d) => (
							<div key={`discipline-${d.id}`} className="flex items-center justify-between">

								<label htmlFor={`discipline-${d.id}`}>{d.name}</label>
								<Checkbox id={`discipline-${d.id}`} value={d.id} onClick={(e) => handleCheckboxChange(Number((e.target as HTMLButtonElement).value))} />
							</div>
						))}
					</div>


					<div>
						<Label>Date of Birth</Label>
						<Input value={fullname} onInput={(e) => setFullName((e.target as HTMLInputElement).value)}></Input>
					</div>
				</form>
			</div>
		</>
	);
}