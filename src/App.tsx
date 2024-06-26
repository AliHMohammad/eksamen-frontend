import PageLayout from "./components/layouts/PageLayout";
import { Toaster } from "./components/ui/toaster";
import { Routes, Route } from "react-router-dom";
import AdminDashboardPage from "@/pages/DashboardPage.tsx";
import AthleteRegisterPage from "@/pages/AthleteRegisterPage.tsx";
import AthletesTablePage from "@/pages/AthletesTablePage.tsx";
import AthletesDisciplinePage from "@/pages/AthletesDisciplinePage.tsx";
import AthletesEditPage from "@/pages/AthletesEditPage.tsx";
import AthletesDetailsPage from "@/pages/AthletesDetailsPage.tsx";
import ResultsDisciplinePage from "@/pages/ResultsDisciplinePage.tsx";
import ResultsTablePage from "@/pages/ResultsTablePage.tsx";
import ResultsEditPage from "@/pages/ResultsEditPage.tsx";
import RegisterPage from "@/pages/RegisterPage.tsx";
import ResultRegisterPage from "@/pages/ResultRegisterPage.tsx";
import ResultRegisterBulkPage from "@/pages/ResultRegisterBulkPage.tsx";
import DisciplineDashboard from "@/pages/DisciplinesDashboardPage.tsx";
import DisciplinesUpdatePage from "@/pages/DisciplinesUpdatePage.tsx";
import DisciplinesCreatePage from "@/pages/DisciplinesCreatePage.tsx";

function App() {
	return (
		<>
			<PageLayout>
				<Routes>
					<Route path="/" element={<AdminDashboardPage />} />
					<Route path="register">
						<Route index element={<RegisterPage />} />
						<Route path="athlete" element={<AthleteRegisterPage />} />
						<Route path="result" element={<ResultRegisterPage />} />
						<Route path="result/bulk" element={<ResultRegisterBulkPage />} />
					</Route>
					<Route path="/athletes/disciplines">
						<Route index element={<AthletesDisciplinePage />} />
						<Route path=":discipline" element={<AthletesTablePage />} />
						<Route path=":discipline/form" element={<AthletesEditPage />} />
						<Route path=":discipline/detailed" element={<AthletesDetailsPage />} />
					</Route>
					<Route path={"/results/disciplines"}>
						<Route index element={<ResultsDisciplinePage />} />
						<Route path=":discipline" element={<ResultsTablePage />} />
						<Route path=":discipline/form" element={<ResultsEditPage />} />
					</Route>
					<Route path={"/disciplines"}>
						<Route index element={<DisciplineDashboard />} />
						<Route path="update" element={<DisciplinesUpdatePage />} />
						<Route path="create" element={<DisciplinesCreatePage />} />
					</Route>

					<Route path="*" element={<h2 className={"text-center text-4xl"}>404 Page not found</h2>} />
				</Routes>
			</PageLayout>
			<Toaster />
		</>
	);
}

export default App;
