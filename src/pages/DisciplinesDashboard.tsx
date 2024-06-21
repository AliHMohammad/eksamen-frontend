import DashboardButton from "@/components/core/DashboardButton.tsx";
import { IoIosCheckmarkCircle, IoMdTrophy } from "react-icons/io";
import { FaPersonRunning } from "react-icons/fa6";
import { SiGitbook } from "react-icons/si";
import { LuBookPlus } from "react-icons/lu";
import { LuBookUp } from "react-icons/lu";


export default function DisciplineDashboard() {

	return (
		<section className="flex flex-col gap-10 justify-center items-center">
			<h2 className=" text-3xl sm:text-5xl font-bold text-center text-pretty">Disciplines</h2>
			<div className="flex gap-10 sm:gap-16 justify-center flex-col sm:flex-row">
				<DashboardButton text="Create" linkTo="create">
					<LuBookPlus  className="group-hover:text-orange-300 group-hover:scale-105 transition-all" size={130} />
				</DashboardButton>

				<DashboardButton text="Update" linkTo="update">
					<LuBookUp  className="group-hover:text-orange-300 group-hover:scale-105 transition-all" size={130} />
				</DashboardButton>
			</div>
		</section>
	);
}