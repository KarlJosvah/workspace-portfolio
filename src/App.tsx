import { BrowserRouter, Routes, Route } from "react-router";
import WorkSpacePage from "./pages/WorkSpacePage.tsx";
import { ROUTES } from "./app/router.ts";
import "./App.css";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={ROUTES.HOME} element={<WorkSpacePage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
