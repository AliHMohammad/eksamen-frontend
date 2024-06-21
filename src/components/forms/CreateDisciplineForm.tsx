import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { Button } from "@/components/ui/button.tsx";
import React from "react";

export type TDisciplineRequest = {
	name: string,
	resultType: string
}

type Props = {
	disciplineName: string,
	setDisciplineName: React.Dispatch<React.SetStateAction<string>>
	resultType: string,
	setResultType: React.Dispatch<React.SetStateAction<string>>
	onSubmit: (payload: TDisciplineRequest) => void;
}

export default function CreateDisciplineForm({ disciplineName, setDisciplineName, setResultType, resultType, onSubmit }: Props) {

	const handleSubmit = () => {
		onSubmit(
			{
				resultType,
				name: disciplineName,
			},
		);
	};


	return (
		<>
			<div className={"w-80 flex justify-center mx-auto py-5 bg-slate-300 border-4"}>
				<form className={"space-y-3"} onSubmit={(e) => {
					e.preventDefault();
					handleSubmit();
				}}>

					<div>
						<Label>Discipline Name</Label>
						<Input required={true} value={disciplineName} onChange={(v) => setDisciplineName(v.target.value)}></Input>
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