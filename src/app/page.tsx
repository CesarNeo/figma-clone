import LeftSidebar from '@/components/left-sidebar'
import Live from '@/components/live'
import Navbar from '@/components/navbar'
import RightSidebar from '@/components/right-sidebar'

function Home() {
  return (
    <main className="h-screen overflow-hidden">
      <Navbar />

      <section className="grid h-full grid-cols-[auto,1fr,auto]">
        <LeftSidebar />
        <Live />
        <RightSidebar />
      </section>
    </main>
  )
}

export default Home
