import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useAuth() {
  const [session, setSession] = useState(null)
  const [profiili, setProfiili] = useState(null)
  const [lataa, setLataa] = useState(true)

  useEffect(() => {
    let peruttu = false

    supabase.auth.getSession().then(({ data }) => {
      if (!peruttu) setSession(data.session)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, uusiSessio) => {
      setSession(uusiSessio)
    })

    return () => {
      peruttu = true
      listener.subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    let peruttu = false

    if (!session?.user) {
      setProfiili(null)
      setLataa(false)
      return
    }

    setLataa(true)
    supabase
      .from('profiilit')
      .select('id, email, nimi, rooli')
      .eq('id', session.user.id)
      .maybeSingle()
      .then(({ data, error }) => {
        if (peruttu) return
        if (error) console.error('Profiilin haku epäonnistui:', error.message)
        setProfiili(data ?? null)
        setLataa(false)
      })

    return () => {
      peruttu = true
    }
  }, [session?.user?.id])

  return { session, profiili, lataa, kirjauduUlos: () => supabase.auth.signOut() }
}
