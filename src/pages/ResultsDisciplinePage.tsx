import { useEffect, useState } from "react";
import DisciplinesEndpoint from "@/services/DisciplinesEndpoint.ts";
import { toast } from "@/components/ui/use-toast.ts";
import IDiscipline from "@/models/IDiscipline.ts";
import DashboardButton from "@/components/core/DashboardButton.tsx";
import { FaPersonRunning } from "react-icons/fa6";
import { GiTorch } from "react-icons/gi";

export default function ResultsDisciplinePage() {
	const [disciplines, setDisciplines] = useState<IDiscipline[]>([])


	useEffect(() => {
		DisciplinesEndpoint.getDisciplines()
			.then((r) => setDisciplines(r))
			.catch((e) => {
				toast({
					title: "Oh no! Something went wrong.",
					description: e.message(),
					variant: "destructive",
				});
			})
	}, []);

	return (
		<>
			<div className="flex flex-col gap-10 justify-center items-center">
				<h2 className=" text-3xl sm:text-5xl font-bold text-center text-pretty">Results for a specific Discipline</h2>
				<div className="flex gap-10 sm:gap-16 justify-center flex-col sm:flex-row">
					{disciplines.map((d) => (
						<>
							<DashboardButton key={`${d.name}-${d.id}`} text={d.name} linkTo={String(d.id)} state={d}>
								<GiTorch className="group-hover:text-orange-300 group-hover:scale-105 transition-all" size={130} />
							</DashboardButton>
						</>
					))}
				</div>
			</div>

		</>
	)
}