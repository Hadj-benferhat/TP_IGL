import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Topbar from "../DashboardAdmin/global/Topbar";
import Sidebar from "./Sidebar";
import DashboardTasksAll from "./DashboardTasksAll";
import DashboardTasksSelected from "./DashboardTasksSelected";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../theme";

export default function DashboardAdmin({ handleLogout, userName, token }) {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}> 
          <CssBaseline />
          <div className="pageDashboard">
            <Sidebar userName=  {userName} isSidebar={isSidebar} />
            <main className="content">
              <Topbar handleLogout = {handleLogout} token={token}  setIsSidebar={setIsSidebar} />
              <Routes path='/connexion'>
                <Route path="/" element={<DashboardTasksAll  token = {token} />} />
                <Route path="/tasksselected" element={<DashboardTasksSelected token = {token}/>} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
  )
}