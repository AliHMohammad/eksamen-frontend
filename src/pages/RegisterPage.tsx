import { useEffect, useState } from "react";
import IDiscipline from "@/models/IDiscipline.ts";
import IClub from "@/models/IClub.ts";
import DisciplinesEndpoint from "@/services/DisciplinesEndpoint.ts";
import { toast } from "@/components/ui/use-toast";
import ClubsEndpoint from "@/services/ClubsEndpoint.ts";
import AthletesEndpoint from "@/services/AthletesEndpoint.ts";
import { useNavigate } from "react-router-dom";
import AthleteForm, { TAthleteRequest } from "@/components/forms/AthleteForm.tsx";


export default function RegisterPage() {
	const [disciplines, setDisciplines] = useState<IDiscipline[]>([]);
	const [clubs, setClubs] = useState<IClub[]>([]);
	const navigate = useNavigate();

	const onSubmit = (payload?: TAthleteRequest) => {
		if (!payload) {
			return;
		}

		AthletesEndpoint.createAthlete(payload)
			.then(() => {
				toast({
					title: "Athlete created!",
					description: "Athlete " + payload.fullName + " created successfully!",
				});
				navigate("/")
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
		ClubsEndpoint.getClubs()
			.then((clubs) => setClubs(clubs))
			.catch((e) => {
				toast({
					title: "Åh nej! Noget gik galt!",
					description: e.message,
				});
			});
	}, []);

	return (
		<>
			<h2 className={"text-center my-4"}>Register</h2>
			<AthleteForm disciplines={disciplines} clubs={clubs} onSubmit={onSubmit} />
		</>
	);
}