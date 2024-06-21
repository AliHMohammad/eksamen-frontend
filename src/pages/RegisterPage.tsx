import DashboardButton from "@/components/core/DashboardButton.tsx";
import { FaClipboardUser } from "react-icons/fa6";
import { BsClipboard2DataFill } from "react-icons/bs";
import { FaPeoplePulling } from "react-icons/fa6";

export default function RegisterPage() {
	return (
		<>
			<section className="flex flex-col gap-10 justify-center items-center">
				<h2 className=" text-3xl sm:text-5xl font-bold text-center text-pretty">Register</h2>
				<div className="flex gap-10 sm:gap-16 justify-center flex-col sm:flex-row">
					<DashboardButton text="Athlete" linkTo="athlete">
						<FaClipboardUser className="group-hover:text-orange-300 group-hover:scale-105 transition-all" size={130} />
					</DashboardButton>

					<DashboardButton text="Result" linkTo="result">
						<BsClipboard2DataFill className="group-hover:text-orange-300 group-hover:scale-105 transition-all" size={130} />
					</DashboardButton>

					<DashboardButton text="Bulk Result" linkTo="result/bulk">
						<FaPeoplePulling className="group-hover:text-orange-300 group-hover:scale-105 transition-all" size={130} />
					</DashboardButton>


				</div>
			</section>
		</>
	);
}