import { useEffect, useState } from "react";
import { IPagination } from "@/models/IPagination.ts";
import DataTable, { PaginationSize } from "@/components/table/DataTable.tsx";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "@/components/ui/use-toast.ts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { Button } from "@/components/ui/button.tsx";
import IDetailedResult from "@/models/IDetailedResult.ts";
import ResultsEndpoint from "@/services/ResultsEndpoint.ts";
import { ResultsColumns } from "@/components/table/columns/ResultsColumns.tsx";
import IDiscipline from "@/models/IDiscipline.ts";


export default function ResultsTablePage() {
	const [results, setResults] = useState<IPagination<IDetailedResult> | null>(null);
	const [pagination, setPagination] = useState<PaginationSize>({
		pageIndex: 0, //initial page index
		pageSize: 5, //default page size
	});
	const [sort, setSort] = useState({
		sortBy: "id",
		sortDir: "ASC",
	});
	const [gender, setGender] = useState("");
	const discipline = useLocation().state as IDiscipline;



	useEffect(() => {
		const queryParams = new URLSearchParams({
			pageIndex: String(pagination.pageIndex),
			pageSize: String(pagination.pageSize),
			discipline: String(discipline.id),
			...sort,
		});

		if (gender != "none" && gender) queryParams.append("gender", gender);

		ResultsEndpoint.getResults(queryParams)
			.then((res) => {
				setResults(res)
			})
			.catch((e: Error) => {
				toast({
					title: "Oh no! Something went wrong.",
					description: e.message,
					variant: "destructive",
				});
			})

	}, [pagination, sort, gender, discipline]);


	return (
		<>
			<div className="flex flex-col gap-4">
				<h2 className="text-3xl sm:text-5xl font-bold text-center text-pretty mb-5">Results - {discipline.name}</h2>
				{results && (
					<>
						<div className="flex justify-between">
							<div className="flex gap-4 flex-wrap">
								<div className="flex gap-1">
									<Select
										onValueChange={(value) => {
											setPagination((prevState) => ({ ...prevState, pageIndex: 0 }));
											setSort((prevState) => ({ ...prevState, sortBy: value }));
										}}
									>
										<SelectTrigger className="w-[140px] bg-gray-100">
											<SelectValue placeholder="Sort by" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="id">ID</SelectItem>
											<SelectItem value="value">Value</SelectItem>
										</SelectContent>
									</Select>

									<Select
										defaultValue="ASC"
										onValueChange={(value) => {
											setPagination((prevState) => ({ ...prevState, pageIndex: 0 }));
											setSort((prevState) => ({ ...prevState, sortDir: value }));
										}}
									>
										<SelectTrigger className="w-[120px] bg-gray-100">
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="ASC">Ascending</SelectItem>
											<SelectItem value="DESC">Descending</SelectItem>
										</SelectContent>
									</Select>
								</div>

								<Select
									onValueChange={(value) => {
										setPagination((prevState) => ({ ...prevState, pageIndex: 0 }));
										setGender(value);
									}}
								>
									<SelectTrigger className="w-[160px] bg-gray-100">
										<SelectValue placeholder="Gender" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="none">All Genders</SelectItem>
										<SelectItem value="MALE">Male</SelectItem>
										<SelectItem value="FEMALE">Female</SelectItem>
										<SelectItem value="OTHER">Other</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>
						<div>
							<DataTable columns={ResultsColumns} data={results.content} pagination={pagination} />
						</div>
						<div className="flex justify-evenly">
							<Button className="hover:bg-slate-500"
									onClick={() => setPagination((prevState) => ({
										...prevState,
										pageIndex: prevState.pageIndex - 1,
									}))}
									disabled={results.first}
							>
								{"Forrige"}
							</Button>
							{results.totalPages ? (
								<p className="text-white">
									{" "}
									Side {pagination.pageIndex + 1} / {results.totalPages}{" "}
								</p>
							) : null}
							<Button className="hover:bg-slate-500"
									onClick={() => setPagination((prevState) => ({
										...prevState,
										pageIndex: prevState.pageIndex + 1,
									}))}
									disabled={results.last}
							>
								{"Næste"}
							</Button>
						</div>
					</>
				)}
			</div>
		</>
	)
}