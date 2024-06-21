import { useEffect, useState } from "react";
import IDiscipline from "@/models/IDiscipline.ts";
import DisciplinesEndpoint from "@/services/DisciplinesEndpoint.ts";
import { toast } from "@/components/ui/use-toast.ts";
import AthletesEndpoint from "@/services/AthletesEndpoint.ts";
import IAthlete from "@/models/IAthlete.ts";
import ResultRowForm from "@/components/forms/ResultRowForm.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { Button } from "@/components/ui/button.tsx";
import { TResultRequest } from "@/components/forms/ResultForm.tsx";
import ResultsEndpoint from "@/services/ResultsEndpoint.ts";
import { useNavigate } from "react-router-dom";

export type TResultBody = {
	date?: Date,
	value: string
	athleteId: string
}

const EMPTY_RESULT: TResultBody = {
	date: undefined,
	value: "",
	athleteId: "",
};

export default function ResultRegisterBulkPage() {
	const [disciplines, setDisciplines] = useState<IDiscipline[]>([]);
	const [athletes, setAthletes] = useState<IAthlete[]>([]);
	const [selectedDiscipline, setSelectedDiscipline] = useState<IDiscipline | undefined>(undefined);
	const [firstResult, setFirstResult] = useState<TResultBody>(EMPTY_RESULT);
	const [secondResult, setSecondResult] = useState<TResultBody>(EMPTY_RESULT);
	const [thirdResult, setThirdResult] = useState<TResultBody>(EMPTY_RESULT);
	const [fourthResult, setFourthResult] = useState<TResultBody>(EMPTY_RESULT);
	const navigate = useNavigate();



	useEffect(() => {
		DisciplinesEndpoint.getDisciplines()
			.then((r) => setDisciplines(r))
			.catch((e) => {
				toast({
					title: "Oh no! Something went wrong.",
					description: e.message,
					variant: "destructive",
				});
			});
	}, []);

	useEffect(() => {
		AthletesEndpoint.getAllAthletes()
			.then((r) => setAthletes(r))
			.catch((e) => {
				toast({
					title: "Oh no! Something went wrong.",
					description: e.message,
					variant: "destructive",
				});
			});

	}, []);

	const handleChangeDiscipline = (newDisciplineId: number) => {
		const dis = disciplines.find(d => d.id == newDisciplineId);
		setSelectedDiscipline(dis);
	};

	const handleSubmit = () => {
		const data = [firstResult, secondResult, thirdResult, fourthResult]
		const payload: TResultRequest[] = [];

		for (const rawEntity of data) {
			if (!rawEntity.date || !rawEntity.athleteId || !rawEntity.value) {
				continue;
			}
			payload.push({
				athleteId: Number(rawEntity.athleteId),
				value: Number(rawEntity.value),
				date: rawEntity.date,
				disciplineId: selectedDiscipline!.id
			})
		}

		ResultsEndpoint.createBulkResult(payload)
			.then(() => {
				toast({
					title: "Results created!",
					description: payload.length + " Results created successfully!",
				});
				navigate("/");
			})
			.catch((e) => {
				toast({
					title: "Oh no! Something went wrong.",
					description: e.message,
					variant: "destructive",
				});
			})
	}

	return (
		<>
			<div className={"flex flex-col gap-3"}>
				<div>
					<Label>Select Discipline</Label>
					<Select required={true} value={String(selectedDiscipline?.id)} onValueChange={value => handleChangeDiscipline(Number(value))}>
						<SelectTrigger className="w-[200px] bg-gray-100">
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
					<ResultRowForm athletes={athletes} result={firstResult} setResult={setFirstResult} selectedDiscipline={selectedDiscipline} />
					<ResultRowForm athletes={athletes} result={secondResult} setResult={setSecondResult} selectedDiscipline={selectedDiscipline} />
					<ResultRowForm athletes={athletes} result={thirdResult} setResult={setThirdResult} selectedDiscipline={selectedDiscipline} />
					<ResultRowForm athletes={athletes} result={fourthResult} setResult={setFourthResult} selectedDiscipline={selectedDiscipline} />
				</div>
			</div>
			<div className={"flex justify-center mt-5"}>
				<Button disabled={!selectedDiscipline} className={"bg-slate-800"} onClick={handleSubmit}>
					Submit
				</Button>
			</div>
		</>
	);
}