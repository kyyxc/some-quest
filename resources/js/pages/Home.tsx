import { SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'
import AppSidebar from './templates/AppSidebar'

function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <div className="flex bg-gray-100  text-black min-h-screen">
                <SidebarProvider>
                    <AppSidebar />
                    <div className="p-6 flex-1">
                        {children}
                    </div>
                </SidebarProvider>
            </div>
        </div>
    )
}

export default HomeLayout
