import { useEffect, useState } from "react";
import IDiscipline from "@/models/IDiscipline.ts";
import RegisterAthleteForm from "@/components/forms/RegisterAthleteForm.tsx";
import IClub from "@/models/IClub.ts";
import DisciplinesEndpoint from "@/services/DisciplinesEndpoint.ts";
import { toast } from "@/components/ui/use-toast";
import ClubsEndpoint from "@/services/ClubsEndpoint.ts";



export default function RegisterPage() {
	const [disciplines, setDisciplines] = useState<IDiscipline[]>([])
	const [clubs, setClubs] = useState<IClub[]>([])

	// Fullname
	// Gender
	// Date of Birth Kalender
	// ClubId
	// IDiscipline Ids (array)

	useEffect(() => {
		DisciplinesEndpoint.getDisciplines()
			.then((disciplines) => {
				setDisciplines(disciplines)
			})
			.catch((e) => {
				toast({
					title: "Åh nej! Noget gik galt!",
					description: e.message(),
					variant: "destructive",
				});
			})
	}, []);

	useEffect(() => {
		ClubsEndpoint.getClubs()
			.then((clubs) => setClubs(clubs))
			.catch((e) => {
				toast({
					title: "Åh nej! Noget gik galt!",
					description: e.message(),
					variant: "destructive",
				});
			})
	}, []);

	return (
		<>
			<h2 className={"text-center my-4"}>Register</h2>
			<RegisterAthleteForm disciplines={disciplines} clubs={clubs}/>
		</>
	)
}