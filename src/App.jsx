import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import DashboardLayout from './components/layout/DashboardLayout'
import ScrollToTop from './components/common/ScrollToTop'
import { DashboardProvider } from './context/DashboardContext'
import Home from './pages/Home'
import Invitaciones from './pages/Invitaciones'
import InvitacionesDisenos from './pages/InvitacionesDisenos'
import InvitacionesCrear from './pages/InvitacionesCrear'
import Services from './pages/Services'
import Templates from './pages/Templates'
import Pricing from './pages/Pricing'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import DashboardHome from './pages/dashboard/DashboardHome'
import Clients from './pages/dashboard/Clients'
import Websites from './pages/dashboard/Websites'
import Projects from './pages/dashboard/Projects'
import Requests from './pages/dashboard/Requests'
import DashboardTemplates from './pages/dashboard/DashboardTemplates'
import Billing from './pages/dashboard/Billing'
import Settings from './pages/dashboard/Settings'
import FinderLead from './pages/dashboard/FinderLead'
import Campaigns from './pages/dashboard/Campaigns'

export default function App() {
  return (
    <>
      <ScrollToTop />
      <DashboardProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/servicios" element={<Services />} />
            <Route path="/plantillas" element={<Templates />} />
            <Route path="/precios" element={<Pricing />} />
            <Route path="/sobre-nosotros" element={<About />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route path="/invitaciones" element={<Invitaciones />} />
          <Route path="/invitaciones/disenos" element={<InvitacionesDisenos />} />
          <Route path="/invitaciones/crear" element={<InvitacionesCrear />} />
          <Route path="/panel" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="clientes" element={<Clients />} />
            <Route path="webs" element={<Websites />} />
            <Route path="proyectos" element={<Projects />} />
            <Route path="solicitudes" element={<Requests />} />
            <Route path="plantillas" element={<DashboardTemplates />} />
            <Route path="facturacion" element={<Billing />} />
            <Route path="configuracion" element={<Settings />} />
            <Route path="finderlead" element={<FinderLead />} />
            <Route path="campaigns" element={<Campaigns />} />
          </Route>
        </Routes>
      </DashboardProvider>
    </>
  )
}
