import { FaPersonRunning } from "react-icons/fa6";
import DashboardButton from "@/components/core/DashboardButton.tsx";
import { IoMdTrophy } from "react-icons/io";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { SiGitbook } from "react-icons/si";

export default function AdminDashboardPage() {
	return (
		<section className="flex flex-col gap-10 justify-center items-center">
			<h2 className=" text-3xl sm:text-5xl font-bold text-center text-pretty">Dashboard</h2>
			<div className="flex gap-10 sm:gap-16 justify-center flex-col sm:flex-row">
				<DashboardButton text="Register" linkTo="register">
					<IoIosCheckmarkCircle className="group-hover:text-orange-300 group-hover:scale-105 transition-all" size={130} />
				</DashboardButton>

				<DashboardButton text="Athletes" linkTo="athletes/disciplines">
					<FaPersonRunning className="group-hover:text-orange-300 group-hover:scale-105 transition-all" size={130} />
				</DashboardButton>

				<DashboardButton text="Results" linkTo="results/disciplines">
					<IoMdTrophy className="group-hover:text-orange-300 group-hover:scale-105 transition-all" size={130} />
				</DashboardButton>

				<DashboardButton text="Disciplines" linkTo="disciplines">
					<SiGitbook  className="group-hover:text-orange-300 group-hover:scale-105 transition-all" size={130} />
				</DashboardButton>
			</div>
		</section>
	);
}