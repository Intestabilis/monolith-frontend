import { Routes, Route } from "react-router";
import App from "./App";
import ProtectedAuthRoute from "./features/auth/ProtectedAuthRoute";
import GuestRoute from "./features/auth/GuestRoute";
import Temp_LoginPage from "./pages/Temp_LoginPage";
import Temp_RegisterPage from "./pages/Temp_RegisterPage";
import Temp_LogoutPage from "./pages/Temp_LogoutPage";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route element={<GuestRoute />}>
        <Route path="/login" element={<Temp_LoginPage />} />
        <Route path="/register" element={<Temp_RegisterPage />} />
      </Route>
      <Route element={<ProtectedAuthRoute />}>
        <Route path="/logout" element={<Temp_LogoutPage />} />
        {/* <Route element={<ProtectedCampaignRoute />}> */}
        {/* <Route path="/campaign/:campaignId" element={<CampaignLayout />}>
        <Route index element={<CampaignPage />} />
        <Route path="questboard" element={<QuestboardPage />} />
        <Route path="info" element={<CampaignPage />} />
        <Route path="codex" element={<CodexPage />} />
        <Route path="dmscreen" element={<DmScreenPage />} />
        <Route path="characters" element={<CharactersPage />} />
      </Route> */}
        {/* </Route> */}
      </Route>
    </Routes>
  );
}

export default Router;
