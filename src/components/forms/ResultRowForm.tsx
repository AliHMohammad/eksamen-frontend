import { TResultBody } from "@/pages/ResultRegisterBulkPage.tsx";
import React from "react";
import IAthlete from "@/models/IAthlete.ts";
import IDiscipline from "@/models/IDiscipline.ts";
import { Label } from "@/components/ui/label.tsx";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover.tsx";
import { Button } from "@/components/ui/button.tsx";
import { cn } from "@/lib/utils.ts";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar.tsx";


type Props = {
	result: TResultBody
	setResult: React.Dispatch<React.SetStateAction<TResultBody>>
	athletes: IAthlete[],
	selectedDiscipline?: IDiscipline
}

export default function ResultRowForm({ result, setResult, athletes, selectedDiscipline }: Props) {

	return (
		<>
			<>
				<div className={"grid grid-cols-3 bg-slate-300 border-4 items-center py-5"}>

						<div className={"flex gap-3 items-center"}>
							<Label>Select Athlete</Label>
							<Select
								required={true}
								value={String(result.athleteId)}
								onValueChange={(value) => {
									setResult(prev => ({
										...prev,
										athleteId: value
									}));
								}}
							>
								<SelectTrigger className="w-[15rem]">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										{athletes.map(a => (
											<SelectItem key={`athlete-${a.id}`} value={String(a.id)}>{a.fullName}</SelectItem>
										))}
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>

						<div className={"flex gap-3 items-center"}>
							<div className={"flex gap-3 items-center"}>
								<Label>Value</Label>
								<Input required={true} type={"number"} value={result.value} onInput={(e) => {
									const value = (e.target as HTMLInputElement).value
									setResult(prev => ({
										...prev,
										value: value
									}));
								}}></Input>
							</div>
							<div className={"flex gap-3 items-center"}>
								<Label>Type</Label>
								<Input required={true} value={selectedDiscipline?.resultType} disabled={true}></Input>
							</div>
						</div>


						<div className={"flex items-center justify-center space-x-10"}>
							<Label>Date for result</Label>
							<Popover>
								<PopoverTrigger asChild>
									<Button
										variant={"outline"}
										className={cn(
											" justify-start text-left font-normal",
											!result.date && "text-muted-foreground",
										)}
									>
										<CalendarIcon className="mr-2 h-4 w-4" />
										{result.date ? format(result.date, "PPP") : <span>Pick a date</span>}
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0">
									<Calendar
										mode="single"
										selected={result.date}
										onSelect={(newDate) => {
											setResult(prev => ({
												...prev,
												date: newDate
											}));
										}}
										className="rounded-md border bg-white"
										initialFocus
										showOutsideDays
										fixedWeeks
										toDate={new Date(Date.now())}
										fromYear={1940}
										// captionLayout={"dropdown-buttons"}
									/>
								</PopoverContent>
							</Popover>
						</div>
				</div>
			</>
		</>
	);
}