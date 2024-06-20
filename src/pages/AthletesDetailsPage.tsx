import { useLocation } from "react-router-dom";
import IAthlete from "@/models/IAthlete.ts";


export default function AthletesDetailsPage() {
	const athlete = useLocation().state as IAthlete;

	return (
		<>
			<div>


				<div className="bg-slate-400 m-10 p-10 rounded-lg shadow-lg">
					<p className="font-bold text-2xl text-center mb-10">{athlete.fullName}</p>
					<div className="grid grid-cols-2 gap-4">
						<p><span className="font-semibold">First Name:</span> {athlete.firstName}</p>
						<p><span className="font-semibold">Middle Name:</span> {athlete.middleName}</p>
						<p><span className="font-semibold">Last Name:</span> {athlete.lastName}</p>
						<p><span className="font-semibold">Gender:</span> {athlete.gender}</p>
						<p><span className="font-semibold">Date of Birth:</span> {String(athlete.dateOfBirth)}</p>
						<p><span className="font-semibold">Age:</span> {athlete.age}</p>
						<p><span className="font-semibold">Club:</span> {athlete.club.name}</p>
					</div>
					<div className="mt-4">
						<p className="font-semibold mb-2">Disciplines:</p>
						<ul className="list-disc pl-5">
							{athlete.disciplines.map(d => (
								<li key={d.id} className="mb-1 text-gray-800 text-base">{d.name}</li>
							))}
						</ul>
					</div>
				</div>

			</div>
		</>
	)
}