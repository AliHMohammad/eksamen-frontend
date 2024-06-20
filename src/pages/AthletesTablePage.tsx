
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import DataTable, { PaginationSize } from "@/components/table/DataTable.tsx";
import { Button } from "@/components/ui/button";
import { IPagination } from "@/models/IPagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import IAthlete from "@/models/IAthlete.ts";
import { AthletesColumns } from "@/components/table/columns/AthletesColumns.tsx";
import AthletesEndpoint from "@/services/AthletesEndpoint.ts";

export default function AthletesTablePage() {
	const [athletes, setAthletes] = useState<IPagination<IAthlete> | null>(null);
	const [pagination, setPagination] = useState<PaginationSize>({
		pageIndex: 0, //initial page index
		pageSize: 5, //default page size
	});
	const [sort, setSort] = useState({
		sortBy: "id",
		sortDir: "ASC",
	});
	const [filter, setFilter] = useState("");
	const [search, setSearch] = useState("");
	const {discipline} = useParams();
	console.log(discipline);

	useEffect(() => {
		const queryParams = new URLSearchParams({
			pageIndex: String(pagination.pageIndex),
			pageSize: String(pagination.pageSize),
			...sort,
		});

		if (filter != "none") queryParams.append("filterBy", filter);
		if (search) queryParams.append("searchBy", search);
		if (discipline) queryParams.append("discipline", discipline)

		console.log(queryParams);

		AthletesEndpoint.getAthletes(queryParams)
			.then((res) => {
				console.log(res);
				setAthletes(res)

			})
			.catch((e) => {
				toast({
					title: "Oh no! Something went wrong.",
					description: e.message(),
					variant: "destructive",
				});
			})

	}, [pagination, sort, filter, search]);


	return (
		<>
			<div className="flex flex-col gap-4">
				<h2 className="text-3xl sm:text-5xl font-bold text-center text-pretty mb-5">Send objektet afsted</h2>
				{athletes && (
					<>
						<div className="flex justify-between">
							<div className="flex gap-4 flex-wrap">
								<Input
									className="w-[200px] bg-gray-100"
									placeholder="Søg efter produkt"
									onChange={(e) => {
										setPagination((prevState) => ({ ...prevState, pageIndex: 0 }));
										setSearch(e.target.value);
									}}
								/>
								<div className="flex gap-1">
									<Select
										onValueChange={(value) => {
											setPagination((prevState) => ({ ...prevState, pageIndex: 0 }));
											setSort((prevState) => ({ ...prevState, sortBy: value }));
										}}
									>
										<SelectTrigger className="w-[140px] bg-gray-100">
											<SelectValue placeholder="Sorter efter" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="id">ID</SelectItem>
											<SelectItem value="name">Navn</SelectItem>
											<SelectItem value="price">Pris</SelectItem>
											<SelectItem value="stock">Antal</SelectItem>
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
											<SelectItem value="ASC">Stigende</SelectItem>
											<SelectItem value="DESC">Faldende</SelectItem>
										</SelectContent>
									</Select>
								</div>

								<Select
									onValueChange={(value) => {
										setPagination((prevState) => ({ ...prevState, pageIndex: 0 }));
										setFilter(value);
									}}
								>
									<SelectTrigger className="w-[160px] bg-gray-100">
										<SelectValue placeholder="Filtrer efter" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="none">Ingen</SelectItem>
										<SelectItem value="Snacks">Snacks</SelectItem>
										<SelectItem value="Alkohol">Alkohol</SelectItem>
										<SelectItem value="Drikkevarer">Drikkevarer</SelectItem>
										<SelectItem value="Andet">Andet</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>
						<div>
							<DataTable columns={AthletesColumns} data={athletes.content} pagination={pagination} />
						</div>
						<div className="flex justify-evenly">
							<Button className="hover:bg-slate-500"
									onClick={() => setPagination((prevState) => ({
										...prevState,
										pageIndex: prevState.pageIndex - 1,
									}))}
									disabled={athletes.first}
							>
								{"Forrige"}
							</Button>
							{athletes.totalPages ? (
								<p className="text-white">
									{" "}
									Side {pagination.pageIndex + 1} / {athletes.totalPages}{" "}
								</p>
							) : null}
							<Button className="hover:bg-slate-500"
									onClick={() => setPagination((prevState) => ({
										...prevState,
										pageIndex: prevState.pageIndex + 1,
									}))}
									disabled={athletes.last}
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