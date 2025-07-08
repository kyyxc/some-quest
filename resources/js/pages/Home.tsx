import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'
import AppSidebar from './templates/AppSidebar'

function Home() {
    return (
        <div>
            <div className="flex bg-gray-100  text-black min-h-screen">
                <SidebarProvider>
                    <AppSidebar />
                    <div className="p-6 flex-1">
                        <SidebarTrigger />
                        <p className="text-gray-600">This is the main content area.</p>
                    </div>
                </SidebarProvider>
            </div>
        </div>
    )
}

export default Home
