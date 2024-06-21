import React from "react";
import { TDisciplineRequest } from "@/components/forms/CreateDisciplineForm.tsx";
import IDiscipline from "@/models/IDiscipline.ts";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { Button } from "@/components/ui/button.tsx";

type Props = {
	disciplineId: number | undefined,
	setDisciplineId: React.Dispatch<React.SetStateAction<number | undefined>>
	disciplines: IDiscipline[]
	resultType: string,
	setResultType: React.Dispatch<React.SetStateAction<string>>
	onSubmit: (payload: TDisciplineTypeRequest) => void;
}

export type TDisciplineTypeRequest = {
	resultType: string
}


export default function UpdateDisciplineForm({ setDisciplineId, disciplines, disciplineId, setResultType, resultType, onSubmit }: Props) {

	const handleSubmit = () => {
		onSubmit(
			{
				resultType,
			},
		);
	};

	const handleChangeDiscipline = (newDisciplineId: number) => {
		const dis = disciplines.find(d => d.id == newDisciplineId);
		setResultType(dis!.resultType);
		setDisciplineId(newDisciplineId);
	};


	return (
		<>
			<div className={"w-80 flex justify-center mx-auto py-5 bg-slate-300 border-4"}>
				<form className={"space-y-3"} onSubmit={(e) => {
					e.preventDefault();
					handleSubmit();
				}}>

					<div>
						<Label>Select Discipline</Label>
						<Select required={true} value={String(disciplineId)} onValueChange={value => handleChangeDiscipline(Number(value))}>
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
						<Label>Type</Label>
						<Select required={true} value={resultType} onValueChange={value => setResultType(value)}>
							<SelectTrigger className="w-full">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectItem value={"Points"}>Points</SelectItem>
									<SelectItem value={"Centimeter"}>Centimeter</SelectItem>
									<SelectItem value={"Millimeter"}>Millimeter</SelectItem>
									<SelectItem value={"Milliseconds"}>Milliseconds</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>


					<div className={"flex justify-center space-x-5 py-5"}>
						<Button type={"submit"}>
							Submit
						</Button>
					</div>

				</form>

			</div>
		</>
	);
}