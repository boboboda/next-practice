import styles from "./page.module.css";
import { connectDB } from "@/util/database";



// -> 60초 지날 때 캐싱되게하는 법
// export const revalidate = 60;



export default async function Home() {
  


  await fetch('/URL', {cache : 'force-cache'})

  await fetch('/URL', {cache : 'no-store'})

  return(
    <div>
      안녕
    </div>
  )
}
