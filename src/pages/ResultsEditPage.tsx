import { useEffect, useState } from "react";
import DisciplinesEndpoint from "@/services/DisciplinesEndpoint.ts";
import { toast } from "@/components/ui/use-toast.ts";
import IDiscipline from "@/models/IDiscipline.ts";
import ResultForm, { TResultRequest } from "@/components/forms/ResultForm.tsx";
import { useLocation, useNavigate } from "react-router-dom";
import IDetailedResult from "@/models/IDetailedResult.ts";
import AthletesEndpoint from "@/services/AthletesEndpoint.ts";
import IAthlete from "@/models/IAthlete.ts";
import ResultsEndpoint from "@/services/ResultsEndpoint.ts";


export default function ResultsEditPage() {
	const resultToEdit = useLocation().state as IDetailedResult;
	const [disciplines, setDisciplines] = useState<IDiscipline[] | null>(null);
	const [athletes, setAthletes] = useState<IAthlete[] | null>(null);
	const navigate = useNavigate();

	const onSubmit = (payload?: TResultRequest) => {
		if (!payload) {
			onDelete()
			return;
		}
		console.log("PAYLOAD PAYLOAD");
		console.log(payload);
		// Edit
		ResultsEndpoint.updateResult(resultToEdit.id, payload)
			.then(() => {
				toast({
					title: "Athlete created!",
					description: "Result with value " + payload.value + " at " + payload.date + " created successfully!",
				});
				navigate("/");
			}).catch((e) => {
				toast({
					title: "Oh no! Something went wrong.",
					description: e.message,
					variant: "destructive",
				});
			},
		);
	};

	const onDelete = () => {
		ResultsEndpoint.deleteResult(resultToEdit.id)
			.then(() => {
				toast({
					title: "Athlete deleted!",
					description: "Result with id " + resultToEdit.id + " deleted!",
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

	useEffect(() => {
		AthletesEndpoint.getAllAthletes()
			.then((r) => setAthletes(r))
			.catch((e) => {
				toast({
					title: "Oh no! Something went wrong.",
					description: e.message,
					variant: "destructive",
				});
			})


	}, []);

	return (
		<>
			<h2 className={"text-center my-4"}>Edit Result</h2>
			{disciplines && athletes && <ResultForm disciplines={disciplines} athletes={athletes} onSubmit={onSubmit} resultToEdit={resultToEdit} />}
		</>
	)
}