import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Topbar from "./global/Topbar";
import Sidebar from "./global/Sidebar";
import Dashboard from "./dashboard/index";
import Team from "./membres/index";
import MembresWaitingListe from "./membres/MembresWaitingListe";
import Partenaires from "./partenaires/index";
import Benevoles from "./benevoles/index";
import Form from "./ajouterMembre/index";
import FAQ from "./faq/Contact";
import Addtasks from "./Tasks/Addtasks";
import Tasks from "./Tasks/index"; 
import Calendar from "./evenements/calendar";
import AddEvent from "./evenements/AddEvent";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./../../theme";
import AddFaq from "./faq/AddFaq";
import StockHandling from "./StockHandling/index";
import Donations from "./StockHandling/Donations";
import PartenairesHandling from "./partenaires/PartenairesHandling";
import BenevolesWaitingListe from "./benevoles/BenevolesWaitingListe";
import Contact from "./faq/Contact";

export default function DashboardAdmin({ handleLogout, userName, token }) {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  // pour affichage dashboard
  const [numAdherents, setNumAdherents] = useState(1);
  const [numBenevoles, setNumBenevoles] = useState(0);
  const [numPartenaires, setNumPartenaires] = useState(0);

  return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}> 
          <CssBaseline />
          <div className="pageDashboard">
            <Sidebar userName=  {userName} isSidebar={isSidebar} />
            <main className="content">
              <Topbar handleLogout = {handleLogout} token={token}  setIsSidebar={setIsSidebar} />
              <Routes path='/connexion'>
                <Route path="/" 
                  element={<Dashboard  
                            token = {token} />} 
                            numAdherents={numAdherents}
                            numBenevoles={numBenevoles}
                            numPartenaires={numPartenaires}
                          />
                <Route path="/team" element={<Team setNumAdherents={setNumAdherents} token = {token} />} />
                <Route path="/membreswaiting" element={<MembresWaitingListe token = {token}/>} />
                <Route path="/benevoles" element={<Benevoles setNumBenevoles={setNumBenevoles} token = {token}/>} />
                <Route path="/benevoleswaiting" element={<BenevolesWaitingListe token = {token}/>} />
                <Route path="/partenaires" element={<Partenaires setNumPartenaires={setNumPartenaires}  token = {token}/>} />
                <Route path="/partenaireswaiting" element={<PartenairesHandling />} token = {token} />
                <Route path="/form" element={<Form token = {token}/>} />
                <Route path="/contact" element={<Contact token = {token}/>} /> 
                <Route path="/faq" element={<FAQ token = {token}/>} /> 
                <Route path="/addtasks" element={<Addtasks token = {token}/>} />
                <Route path="/tasks" element={<Tasks token = {token}/>} />
                <Route path="/calendar" element={<Calendar token = {token}/>} />
                <Route path="/addevent" element={<AddEvent token = {token}/>} />
                <Route path="/addfaq" element={<AddFaq token = {token}/>} />
                <Route path="/stockhandling" element={<StockHandling token = {token}/>} />
                <Route path="/donations" element={<Donations token = {token}/>} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
  )
}