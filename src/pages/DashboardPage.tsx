import { Button } from "@/components/ui/button.tsx";
import { FaPersonRunning } from "react-icons/fa6";
import DashboardButton from "@/components/core/DashboardButton.tsx";

export default function AdminDashboardPage() {
	return (
		<section className="flex flex-col gap-10 justify-center items-center">
			<h2 className=" text-3xl sm:text-5xl font-bold text-center text-pretty">Dashboard</h2>
			<div className="flex gap-10 sm:gap-16 justify-center flex-col sm:flex-row">
				<DashboardButton text="Register" linkTo="register">
					<FaPersonRunning  className="group-hover:text-orange-300 group-hover:scale-105 transition-all" size={130} />
				</DashboardButton>

				<DashboardButton text="Kalender" linkTo="calender">
					<FaPersonRunning className="group-hover:text-orange-300 group-hover:scale-105 transition-all" size={130} />
				</DashboardButton>

				<DashboardButton text="Aktiviteter" linkTo="activities">
					<FaPersonRunning className="group-hover:text-orange-300 group-hover:scale-105 transition-all" size={130} />
				</DashboardButton>
			</div>
		</section>
	);
}