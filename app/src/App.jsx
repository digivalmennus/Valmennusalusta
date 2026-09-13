import { useAuth } from './hooks/useAuth'
import LoginForm from './components/Auth/LoginForm'
import AsiakasNakyma from './views/AsiakasNakyma'
import ValmentajaNakyma from './views/ValmentajaNakyma'
import './styles.css'

export default function App() {
  const { session, profiili, lataa, kirjauduUlos } = useAuth()

  if (lataa) {
    return (
      <div className="wrap">
        <p>Ladataan...</p>
      </div>
    )
  }

  if (!session) {
    return <LoginForm />
  }

  if (!profiili) {
    return (
      <div className="wrap">
        <p>Profiilia luodaan, hetki...</p>
      </div>
    )
  }

  if (profiili.rooli === 'valmentaja') {
    return <ValmentajaNakyma email={profiili.email} onKirjauduUlos={kirjauduUlos} />
  }

  return (
    <AsiakasNakyma userId={session.user.id} email={profiili.email} onKirjauduUlos={kirjauduUlos} />
  )
}
