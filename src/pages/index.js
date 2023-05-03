import { Inter } from 'next/font/google';
import AllQuestion from './components/all_question';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={`min-h-screen ${inter.className}`}>
      <div>
      <AllQuestion/>
      </div>
    </main>
  )
}
