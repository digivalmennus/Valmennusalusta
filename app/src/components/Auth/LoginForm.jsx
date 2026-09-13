import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function LoginForm() {
  const [tila, setTila] = useState('kirjaudu') // 'kirjaudu' | 'rekisteroidy'
  const [email, setEmail] = useState('')
  const [salasana, setSalasana] = useState('')
  const [nimi, setNimi] = useState('')
  const [rooli, setRooli] = useState('asiakas')
  const [virhe, setVirhe] = useState(null)
  const [viesti, setViesti] = useState(null)
  const [lahetetaan, setLahetetaan] = useState(false)

  async function submit(e) {
    e.preventDefault()
    setVirhe(null)
    setViesti(null)
    setLahetetaan(true)

    if (tila === 'kirjaudu') {
      const { error } = await supabase.auth.signInWithPassword({ email, password: salasana })
      if (error) setVirhe(error.message)
    } else {
      const { data, error } = await supabase.auth.signUp({
        email,
        password: salasana,
        options: { data: { rooli, nimi } },
      })
      if (error) {
        setVirhe(error.message)
      } else if (!data.session) {
        setViesti('Tarkista sähköpostisi ja vahvista tunnus ennen kirjautumista.')
      }
    }

    setLahetetaan(false)
  }

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <h1 className="auth-title">Digivalmennusalusta</h1>
        <div className="auth-tabs">
          <button
            type="button"
            className={'auth-tab' + (tila === 'kirjaudu' ? ' active' : '')}
            onClick={() => setTila('kirjaudu')}
          >
            Kirjaudu
          </button>
          <button
            type="button"
            className={'auth-tab' + (tila === 'rekisteroidy' ? ' active' : '')}
            onClick={() => setTila('rekisteroidy')}
          >
            Luo tunnus
          </button>
        </div>

        <form onSubmit={submit} className="auth-form">
          {tila === 'rekisteroidy' && (
            <label className="auth-field">
              Nimi
              <input
                type="text"
                value={nimi}
                onChange={(e) => setNimi(e.target.value)}
                autoComplete="name"
              />
            </label>
          )}

          <label className="auth-field">
            Sähköposti
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </label>

          <label className="auth-field">
            Salasana
            <input
              type="password"
              required
              minLength={6}
              value={salasana}
              onChange={(e) => setSalasana(e.target.value)}
              autoComplete={tila === 'kirjaudu' ? 'current-password' : 'new-password'}
            />
          </label>

          {tila === 'rekisteroidy' && (
            <fieldset className="auth-rooli">
              <legend>Olen</legend>
              <label>
                <input
                  type="radio"
                  name="rooli"
                  value="asiakas"
                  checked={rooli === 'asiakas'}
                  onChange={() => setRooli('asiakas')}
                />
                Asiakas
              </label>
              <label>
                <input
                  type="radio"
                  name="rooli"
                  value="valmentaja"
                  checked={rooli === 'valmentaja'}
                  onChange={() => setRooli('valmentaja')}
                />
                Valmentaja
              </label>
            </fieldset>
          )}

          {virhe && <p className="auth-virhe">{virhe}</p>}
          {viesti && <p className="auth-viesti">{viesti}</p>}

          <button type="submit" className="auth-submit" disabled={lahetetaan}>
            {tila === 'kirjaudu' ? 'Kirjaudu sisään' : 'Luo tunnus'}
          </button>
        </form>
      </div>
    </div>
  )
}
