import { NavLink } from "react-router-dom";

export default function NavBar() {
	return (
		<>
			<nav className={"flex flex-wrap gap-7 bg-slate-500 p-2 text-sm sm:text-lg"}>
				<NavLink to={"/"}>
					<h3 className={"hover:text-orange-300 transition-all"}>Home</h3>
				</NavLink>
			</nav>
		</>
	);
}
