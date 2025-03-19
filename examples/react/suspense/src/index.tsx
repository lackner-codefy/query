import 'font-awesome/css/font-awesome.min.css'
import React, { lazy } from 'react'
import ReactDOM from 'react-dom/client'
import {
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
  useQueryClient,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ErrorBoundary } from 'react-error-boundary'

import Button from './components/Button'
import ComponentA from './components/ComponentA'
import ComponentB from './components/ComponentB'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  )
}

function Example() {
  const queryClient = useQueryClient()
  const [status, setStatus] = React.useState<number>(0);

  return (
    <>
      Which component should be mounted?
      <Button onClick={() => setStatus(0)}>None</Button>
      <Button onClick={() => setStatus(1)}>Query</Button>
      <Button onClick={() => setStatus(2)}>SuspenseQuery</Button>

      <hr />

      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            fallbackRender={({ error, resetErrorBoundary }) => (
              <div>
                There was an error!{' '}
                <Button onClick={() => resetErrorBoundary()}>Try again</Button>
                <pre style={{ whiteSpace: 'normal' }}>{error.message}</pre>
              </div>
            )}
            onReset={reset}
          >
            {status === 1 ? <ComponentA /> : null}
            {status === 2 ? <ComponentB /> : null}
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
      <ReactQueryDevtools initialIsOpen />
    </>
  )
}

const rootElement = document.getElementById('root') as HTMLElement
ReactDOM.createRoot(rootElement).render(<App />)
