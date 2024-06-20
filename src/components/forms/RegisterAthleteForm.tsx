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
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"


type Props = {
	disciplines: IDiscipline[],
	clubs: IClub[],
	onSubmit: (request: TAthleteRequest) => void
}

export type TAthleteRequest = {
	fullName: string,
	gender: string,
	dateOfBirth: Date,
	clubId: number,
	disciplineIds: number[]
}

export default function RegisterAthleteForm({ disciplines, clubs, onSubmit }: Props) {
	const [fullName, setFullName] = useState<string>("");
	const [selectedGender, setSelectedGender] = useState<string>("");
	const [dateOfBirth, setDateOfBirth] = useState<Date>();
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

	const handleSubmit = () => {
		const payload: TAthleteRequest = {
			fullName,
			dateOfBirth: dateOfBirth as Date,
			gender: selectedGender,
			clubId: selectedClubId as number,
			disciplineIds: selectedDisciplineIds
		}

		onSubmit(payload);
	}



	return (
		<>
			<div className={"w-80 flex justify-center mx-auto py-5 bg-slate-300 border-4"}>
				<form className={"space-y-3"} onSubmit={(e) => {
					e.preventDefault()
					handleSubmit()
				}}>
					<div>
						<Label>Full Name</Label>
						<Input required={true} value={fullName} onInput={(e) => setFullName((e.target as HTMLInputElement).value)}></Input>
					</div>

					<div>
						<Label>Gender</Label>
						<Select required={true} value={selectedGender} onValueChange={setSelectedGender}>
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


					<div className={"flex flex-col space-y-1"}>
						<Label>Date of Birth</Label>
						<Popover>
							<PopoverTrigger asChild>
								<Button
									variant={"outline"}
									className={cn(
										" justify-start text-left font-normal",
										!dateOfBirth && "text-muted-foreground"
									)}
								>
									<CalendarIcon className="mr-2 h-4 w-4" />
									{dateOfBirth ? format(dateOfBirth, "PPP") : <span>Pick a date</span>}
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-auto p-0">
								<Calendar
									mode="single"
									selected={dateOfBirth}
									onSelect={setDateOfBirth}
									className="rounded-md border bg-white"
									initialFocus
									showOutsideDays
									fixedWeeks
									toDate={new Date(Date.now())}
									defaultMonth={new Date(1990, 8)}
									fromYear={1940}
									toYear={new Date(Date.now()).getFullYear()}
									// captionLayout={"dropdown-buttons"}
								/>
							</PopoverContent>
						</Popover>
					</div>
					<div className={"flex justify-center py-4"}>
						<Button type={"submit"}>
							Submit
						</Button>
					</div>
				</form>


			</div>
		</>
	);
}