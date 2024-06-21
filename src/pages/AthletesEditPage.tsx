import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DisciplinesEndpoint from "@/services/DisciplinesEndpoint.ts";
import { toast } from "@/components/ui/use-toast.ts";
import ClubsEndpoint from "@/services/ClubsEndpoint.ts";
import IDiscipline from "@/models/IDiscipline.ts";
import IClub from "@/models/IClub.ts";
import AthleteForm, { TAthleteRequest } from "@/components/forms/AthleteForm.tsx";
import AthletesEndpoint from "@/services/AthletesEndpoint.ts";
import IAthlete from "@/models/IAthlete.ts";
import athletesEndpoint from "@/services/AthletesEndpoint.ts";


export default function AthletesEditPage() {
	const [disciplines, setDisciplines] = useState<IDiscipline[]>([]);
	const [clubs, setClubs] = useState<IClub[]>([]);
	const athleteToEdit = useLocation().state as IAthlete;
	const navigate = useNavigate();

	const onSubmit = (payload?: TAthleteRequest) => {
		if (!payload) {
			onDelete()
			return;
		}

		// Edit
		AthletesEndpoint.updateAthlete(athleteToEdit.id, payload)
			.then(() => {
				toast({
					title: "Athlete created!",
					description: "Athlete " + payload.fullName + " created successfully!",
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
		AthletesEndpoint.deleteAthlete(athleteToEdit.id)
			.then(() => {
				toast({
					title: "Athlete deleted!",
					description: "Athlete " + athleteToEdit.fullName + " deleted!",
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
			<h2 className={"text-center my-4"}>Edit Athlete</h2>
			<AthleteForm disciplines={disciplines} clubs={clubs} onSubmit={onSubmit} athleteToEdit={athleteToEdit} />
		</>
	);
}