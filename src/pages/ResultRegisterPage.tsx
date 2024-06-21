import { useEffect, useState } from "react";
import IDiscipline from "@/models/IDiscipline.ts";
import IAthlete from "@/models/IAthlete.ts";
import { useNavigate } from "react-router-dom";
import DisciplinesEndpoint from "@/services/DisciplinesEndpoint.ts";
import { toast } from "@/components/ui/use-toast.ts";
import AthletesEndpoint from "@/services/AthletesEndpoint.ts";
import ResultForm, { TResultRequest } from "@/components/forms/ResultForm.tsx";
import ResultsEndpoint from "@/services/ResultsEndpoint.ts";


export default function ResultRegisterPage() {
	const [disciplines, setDisciplines] = useState<IDiscipline[] | null>(null);
	const [athletes, setAthletes] = useState<IAthlete[] | null>(null);
	const navigate = useNavigate();

	const onSubmit = (payload?: TResultRequest) => {
		if (!payload) {
			return;
		}

		// Post
		ResultsEndpoint.createResult(payload)
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
			<h2 className={"text-center my-4"}>Register Result</h2>
			{disciplines && athletes && <ResultForm disciplines={disciplines} athletes={athletes} onSubmit={onSubmit} />}
		</>
	)
}