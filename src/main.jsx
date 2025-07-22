import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import Routes from './routes/Routes.jsx'
import AuthProvider from './provider/AuthProvider.jsx'
import {
  QueryClient,
  QueryClientProvider,

} from '@tanstack/react-query'

import toast, { Toaster } from 'react-hot-toast'
import { SocketProvider } from './provider/SocketProvider.jsx'
import { HMSRoomProvider } from '@100mslive/react-sdk'
import CheckAndEmail from './hooks/email/CheckAndEmail.jsx'
const notify = () => {
  toast('notify')
}

const queryClient = new QueryClient();
console.log(queryClient);

createRoot(document.getElementById('root')).render(
  <>
    <AuthProvider>
      <SocketProvider>
        <HMSRoomProvider>
          <QueryClientProvider client={queryClient}>
            <CheckAndEmail />
            <RouterProvider router={Routes} />
            <Toaster />
          </QueryClientProvider>
        </HMSRoomProvider>
      </SocketProvider>

    </AuthProvider>
  </>,
)
