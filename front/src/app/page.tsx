import {} from '@/components/atoms/avatar'
import { SidebarInset, SidebarProvider } from '@/components/atoms/sidebar'

export default function Dashboard() {
  return (
    <SidebarProvider>
      <SidebarInset>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="flex items-start justify-between space-y-2 my-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Price it!</h2>
            </div>
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min">Hello Jo!</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
