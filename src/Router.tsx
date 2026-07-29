import { Routes, Route } from "react-router";
import App from "./App";
import ProtectedAuthRoute from "./features/auth/ProtectedAuthRoute";
import GuestRoute from "./features/auth/GuestRoute";
import ProfilePage from "./pages/ProfilePage";
import AuthPage from "./pages/AuthPage";
import GlobalLayout from "./layouts/GlobalLayout";
import ProtectedCampaignRoute from "./features/auth/ProtectedCampaignRoute";
import CampaignLayout from "./layouts/CampaignLayout";
// import DashboardPage from "./pages/DashboardPage";
import CampaignPage from "./pages/CampaignPage";
import JoinCampaignPage from "./pages/JoinCampaignPage";
import QuestboardPage from "./pages/QuestboardPage";
import DMScreenPage from "./pages/DMScreenPage";
import CampaignPagesContainer from "./pages/CampaignPagesContainer";

function Router() {
  return (
    <Routes>
      <Route element={<GlobalLayout />}>
        <Route path="/" element={<App />} />
        {/* <Route path="/about" element={<div />} /> */}
        {/* CHANGE add hero page here etc. */}
        <Route element={<GuestRoute />}>
          <Route path="/auth" element={<AuthPage />} />
        </Route>
        <Route element={<ProtectedAuthRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
          {/* <Route path="/welcome" element={<DashboardPage />} /> */}
          <Route path="/join/:token" element={<JoinCampaignPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedAuthRoute />}>
        <Route element={<ProtectedCampaignRoute />}>
          <Route path="/campaigns/:campaignId" element={<CampaignLayout />}>
            {/* REVIEW maybe move CampaignPagesContainer into pages and not use there */}
            <Route
              index
              element={
                <CampaignPagesContainer>
                  <CampaignPage />
                </CampaignPagesContainer>
              }
            />
            <Route
              path="questboard"
              element={
                <CampaignPagesContainer>
                  <QuestboardPage />
                </CampaignPagesContainer>
              }
            />
            <Route
              path="codex"
              element={
                <CampaignPagesContainer>
                  <div>Кодекс (Заглушка)</div>
                </CampaignPagesContainer>
              }
            />
            <Route path="dmscreen" element={<DMScreenPage />} />
            <Route
              path="party"
              element={
                <CampaignPagesContainer>
                  <div>Партія (Заглушка)</div>
                </CampaignPagesContainer>
              }
            />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default Router;
