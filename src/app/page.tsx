import Live from '@/components/live'
import Navbar from '@/components/navbar'

export default function Home() {
  return (
    <main className="h-screen overflow-hidden">
      <Navbar />

      <section className="flex h-full flex-row">
        <Live />
      </section>
    </main>
  )
}
