import { useState } from "react";
import IDetailedResult from "@/models/IDetailedResult.ts";
import IDiscipline from "@/models/IDiscipline.ts";
import IAthlete from "@/models/IAthlete.ts";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover.tsx";
import { Button } from "@/components/ui/button.tsx";
import { cn } from "@/lib/utils.ts";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar.tsx";

export type TResultRequest = {
	date: Date,
	value: number
	disciplineId: number,
	athleteId: number
}

type Props = {
	disciplines: IDiscipline[],
	athletes: IAthlete[],
	onSubmit: (request?: TResultRequest) => void
	resultToEdit?: IDetailedResult
}

export default function ResultForm({ resultToEdit, disciplines, athletes, onSubmit }: Props) {
	const [date, setDate] = useState<Date | undefined>(resultToEdit?.date);
	const [value, setValue] = useState(resultToEdit?.value);
	const [valueType, setValueType] = useState(resultToEdit?.discipline.resultType);
	const [selectedDisciplineId, setSelectedDisciplineId] = useState(resultToEdit?.discipline.id);
	const [selectedAthleteId, setSelectedAthleteId] = useState(resultToEdit?.athlete.id);

	const handleSubmit = () => {
		const payload: TResultRequest = {
			date: date!,
			value: value!,
			disciplineId: selectedDisciplineId!,
			athleteId: selectedAthleteId!,
		};

		onSubmit(payload);
	};

	const handleChangeDiscipline = (newDisciplineId: number) => {
		const dis = disciplines.find(d => d.id == newDisciplineId);
		setValueType(dis?.resultType);
		setSelectedDisciplineId(newDisciplineId);
	};

	console.log(valueType);

	return (
		<>
			<div className={"w-80 flex justify-center mx-auto py-5 bg-slate-300 border-4"}>
				<form className={"space-y-3"} onSubmit={(e) => {
					e.preventDefault();
					handleSubmit();
				}}>
					<div>
						<Label>Select Discipline</Label>
						<Select required={true} value={String(selectedDisciplineId)} onValueChange={value => handleChangeDiscipline(Number(value))}>
							<SelectTrigger className="w-full">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									{disciplines.map(d => (
										<SelectItem key={`discipline-${d.id}`} value={String(d.id)}>{d.name}</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>

					<div>
						<Label>Select Athlete</Label>
						<Select required={true} value={String(selectedAthleteId)} onValueChange={value => setSelectedAthleteId((Number(value)))}>
							<SelectTrigger className="w-full">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									{athletes.map(a => (
										<SelectItem key={`discipline-${a.id}`} value={String(a.id)}>{a.fullName}</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>

					<div className={"flex flex-col gap-3"}>
						<div>
							<Label>Value</Label>
							<Input required={true} type={"number"} value={value} onInput={(e) => setValue(Number((e.target as HTMLInputElement).value))}></Input>
						</div>
						<div>
							<Label>Type</Label>
							<Input required={true} value={valueType} disabled={true}></Input>
						</div>
					</div>


					<div className={"flex flex-col space-y-1"}>
						<Label>Date for result</Label>
						<Popover>
							<PopoverTrigger asChild>
								<Button
									variant={"outline"}
									className={cn(
										" justify-start text-left font-normal",
										!date && "text-muted-foreground",
									)}
								>
									<CalendarIcon className="mr-2 h-4 w-4" />
									{date ? format(date, "PPP") : <span>Pick a date</span>}
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-auto p-0">
								<Calendar
									mode="single"
									selected={date}
									onSelect={setDate}
									className="rounded-md border bg-white"
									initialFocus
									showOutsideDays
									fixedWeeks
									toDate={new Date(Date.now())}
									defaultMonth={resultToEdit?.date}
									fromYear={1940}
									// captionLayout={"dropdown-buttons"}
								/>
							</PopoverContent>
						</Popover>
					</div>
					<div className={"flex justify-center space-x-5 py-5"}>
						{resultToEdit && (
							<Button className={"bg-red-600 hover:bg-red-800 transition-all"} type={"button"} onClick={() => onSubmit(undefined)}>
								Delete
							</Button>
						)}
						<Button type={"submit"}>
							Submit
						</Button>
					</div>
				</form>


			</div>
		</>
	);
}