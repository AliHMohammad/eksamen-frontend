import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import ResultForm from "@/components/forms/ResultForm.tsx";
import CreateDisciplineForm, { TDisciplineRequest } from "@/components/forms/CreateDisciplineForm.tsx";
import DisciplinesEndpoint from "@/services/DisciplinesEndpoint.ts";
import { toast } from "@/components/ui/use-toast.ts";


export default function DisciplinesCreatePage() {
	const [disciplineName, setDisciplineName] = useState("");
	const [resultType, setResultType] = useState("");
	const navigate = useNavigate();

	const onSubmit = (payload: TDisciplineRequest) => {
		DisciplinesEndpoint.createDiscipline(payload)
			.then(() => {
				toast({
					title: "Discipline created!",
					description: "Discipline with name " + payload.name + " with " + payload.resultType + " as type created successfully!",
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

	return (
		<>
			<h2 className={"text-center my-4"}>Register Result</h2>
			<CreateDisciplineForm disciplineName={disciplineName} setDisciplineName={setDisciplineName} resultType={resultType} setResultType={setResultType} onSubmit={onSubmit} />
		</>
	);
}