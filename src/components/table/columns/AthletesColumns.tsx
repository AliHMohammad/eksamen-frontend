import { ColumnDef } from "@tanstack/react-table";
import IAthlete from "@/models/IAthlete.ts";
import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { RiPictureInPictureExitFill } from "react-icons/ri";

export const AthletesColumns: ColumnDef<IAthlete>[] = [
	{
		accessorKey: "id",
		header: "Id",
	},
	{
		accessorKey: "fullName",
		header: "Name",
	},
	{
		accessorKey: "gender",
		header: "Gender",
	},
	{
		accessorKey: "age",
		header: "Age",
	},
	{
		accessorKey: "edit",
		header: "Btns",
		cell: ({ row }) => {
			const athlete = row.original as IAthlete;

			return (
				<div className="flex justify-evenly ">
					<Link className={"hover:text-orange-500 transition-all"} to={"form"} state={athlete}>
						<FaRegEdit size={22} />
					</Link>
					<Link className={"hover:text-orange-500 transition-all"} to={"detailed"} state={athlete}>
						<RiPictureInPictureExitFill size={22} />
					</Link>
				</div>
			);
		},
	},
];