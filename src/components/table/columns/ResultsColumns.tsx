import { ColumnDef } from "@tanstack/react-table";
import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import IDetailedResult from "@/models/IDetailedResult.ts";
import { convertCentimeters, convertMillimeters, convertMilliSeconds } from "@/utils/resultTypeConverter.ts";


export const ResultsColumns: ColumnDef<IDetailedResult>[] = [
	{
		accessorKey: "id",
		header: "Id",
	},
	{
		accessorKey: "value",
		header: "Value",
		cell: ({ row }) => {
			const result = row.original as IDetailedResult;
			let convertedValue = "";

			if (result.discipline.resultType == "Milliseconds") {
				convertedValue = convertMilliSeconds(result.value) + " (HH:MM:ss:SSS)";
			} else if (result.discipline.resultType == "Points") {
				convertedValue = result.value + " pt.";
			} else if (result.discipline.resultType == "Millimeter") {
				convertedValue = convertMillimeters(result.value);
			} else if (result.discipline.resultType == "Centimeter") {
				convertedValue = convertCentimeters(result.value);
			}

			return (
				<p>{convertedValue}</p>
			);
		},
	},
	{
		accessorKey: "date",
		header: "Date",
	},
	{
		header: "Athlete",
		cell: ({ row }) => {
			const result = row.original as IDetailedResult;

			return (
				<p>{result.athlete?.fullName}</p>
			);
		},
	},
	{
		header: "Gender",
		cell: ({ row }) => {
			const result = row.original as IDetailedResult;

			return (
				<p>{result.athlete.gender}</p>
			);
		},
	},
	{
		accessorKey: "edit",
		header: "Manage",
		cell: ({ row }) => {
			const result = row.original as IDetailedResult;

			return (
				<div className="flex justify-evenly ">
					<Link className={"hover:text-orange-500 transition-all"} to={"form"} state={result}>
						<FaRegEdit size={22} />
					</Link>
				</div>
			);
		},
	},
];