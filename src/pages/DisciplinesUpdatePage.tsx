import { useEffect, useState } from "react";
import UpdateDisciplineForm, { TDisciplineTypeRequest } from "@/components/forms/UpdateDisciplineForm.tsx";
import DisciplinesEndpoint from "@/services/DisciplinesEndpoint.ts";
import { toast } from "@/components/ui/use-toast.ts";
import IDiscipline from "@/models/IDiscipline.ts";
import { useNavigate } from "react-router-dom";


export default function DisciplinesUpdatePage() {
	const [disciplines, setDisciplines] = useState<IDiscipline[]>([]);
	const [selectedDisciplineId, setSelectedDisciplineId] = useState<number | undefined>();
	const [resultType, setResultType] = useState("");
	const navigate = useNavigate();


	const onSubmit = (payload: TDisciplineTypeRequest) => {
		DisciplinesEndpoint.patchDisciplineResultType(payload, selectedDisciplineId!).then(() => {
			toast({
				title: "Discipline Updated!",
				description: "Discipline with id " + selectedDisciplineId + " with " + payload.resultType + " as type updated successfully!",
			});
			navigate("/");
		}).catch((e) => {
			toast({
				title: "Oh no! Something went wrong.",
				description: e.message,
				variant: "destructive",
			});
		});
	};

	useEffect(() => {
		DisciplinesEndpoint.getDisciplines()
			.then((disciplines) => {
				setDisciplines(disciplines);
			})
			.catch((e) => {
				toast({
					title: "Oh no! Something went wrong.",
					description: e.message,
					variant: "destructive",
				});
			});
	}, []);

	return (
		<>
			<h2 className={"text-center my-4"}>Update Discipline</h2>
			<UpdateDisciplineForm
				disciplines={disciplines}
				disciplineId={selectedDisciplineId}
				setDisciplineId={setSelectedDisciplineId}
				onSubmit={onSubmit}
				setResultType={setResultType}
				resultType={resultType}
			/>
		</>
	);
}