import { Inter } from 'next/font/google';
import Question from '../components/Question';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={`min-h-screen ${inter.className}`}>
      <div>
      <Question/>
      </div>
    </main>
  )
}
