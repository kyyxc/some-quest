import { SidebarProvider } from '@/components/ui/sidebar';
import React from 'react';
import AppSidebar from './templates/AppSidebar';
import { Toaster } from '@/components/ui/sonner';

function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <div className="flex min-h-screen bg-gray-100 text-black">
                <SidebarProvider>
                    <AppSidebar />
                    <div className="flex-1 p-6">{children}</div>
                </SidebarProvider>
            </div>
            <Toaster />
        </div>
    );
}

export default AdminLayout;
