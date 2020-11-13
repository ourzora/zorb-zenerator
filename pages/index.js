import styles from '../styles/Home.module.css'
import {useRouter} from "next/router";
import {useCallback, useEffect, useState} from "react";

export default function Home() {

  const [ gradient, setGradient] = useState('')
  const router = useRouter()

  const rgbToCss = useCallback((rgbArray) => {
    return `rgba(${rgbArray.join(',')})`
  }, [])

  useEffect(() => {

    if(!router.query.image){
      return
    }

    async function fetchGradient(){
      const resp = await fetch(`/api/sampler?image=${router.query.image}`)
      const { palette } = await resp.json()

      console.log("R: ", resp)

      const cssGradient = `radial-gradient(75.29% 75.29% at 64.96% 24.36%, ${rgbToCss(palette.LightVibrant.rgb)} 14.06%, ${rgbToCss(palette.Vibrant.rgb)} 57.81%, ${rgbToCss(palette.DarkVibrant.rgb)} 99.48%)`

      setGradient(cssGradient)
    }

    fetchGradient().then()
  }, [router])


  return (
    <div className={styles.container}>
      {router.query.image && <img className={styles.mainImage} src={router.query.image} /> }
      <div className={styles.logoContainer}>
        <div className={styles.zoraOrb} style={{
          background: gradient
        }} />
        <img className={styles.zoraInner} src={'/zora_text.svg'} />
      </div>
    </div>
  )
}

