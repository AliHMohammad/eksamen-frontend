import PageLayout from "./components/layouts/PageLayout";
import { Button } from "./components/ui/button";
import { Toaster } from "./components/ui/toaster";
import { Routes, Route } from "react-router-dom";
import HomePage from "@/pages/HomePage.tsx";
import AdminDashboardPage from "@/pages/DashboardPage.tsx";
import RegisterPage from "@/pages/RegisterPage.tsx";
import AthletesTablePage from "@/pages/AthletesTablePage.tsx";
import AthletesDisciplinePage from "@/pages/AthletesDisciplinePage.tsx";
import AthletesEditPage from "@/pages/AthletesEditPage.tsx";
import AthletesDetailsPage from "@/pages/AthletesDetailsPage.tsx";

function App() {
	return (
		<>
			<PageLayout>
				<Routes>
					<Route path="/" element={<AdminDashboardPage/>} />
					<Route path="/register" element={<RegisterPage/>} />
					<Route path="/athletes" element={<AthletesTablePage/>}/>
					<Route path="/athletes/disciplines">
						<Route index element={<AthletesDisciplinePage/>} />
						<Route path=":discipline" element={<AthletesTablePage/>}/>
						<Route path=":discipline/form" element={<AthletesEditPage/>}/>
						<Route path=":discipline/detailed" element={<AthletesDetailsPage/>}/>
					</Route>


					{/*<Route path="/products" >
					 <Route index element={<ProductListPage/>}/>
					 <Route path=":id" element={<DetailedProductPage/>}/>
					 </Route>*/}

					<Route path="*" element={<h2>404 Page not found</h2>} />
				</Routes>
			</PageLayout>
			<Toaster />
		</>
	);
}

export default App;
