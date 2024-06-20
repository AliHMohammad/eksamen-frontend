import { Label } from "@/components/ui/label.tsx";

type TAthleteRequest = {
	fullName: string,
	gender: string,
	dateOfBirth: Date,
	clubId: string,
	disciplineIds: number[]
}

export default function RegisterPage() {
	// Fullname
	// Gender
	// Date of Birth Kalender
	// ClubId
	// IDiscipline Ids (array)
	return (
		<>
			<h2>Register</h2>

			<form>
				<Label>Full Name</Label>
			</form>
		</>
	)
}