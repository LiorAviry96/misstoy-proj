import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react';
import { Home } from './pages/Home';
import { UserMsg } from './cmps/userMsg';

const ToyIndex = lazy(() => import('./pages/ToyIndex'))
const ToyEdit = lazy(() => import('./pages/ToyEdit'))

function withSuspense(Cmp, fallback = <div >Loading...</div>) {
    return (
        <Suspense fallback={fallback}>
            <Cmp />
        </Suspense>
    )
}

function App() {

    return (
        <Router>
            <section className='main-app'>
                    <main className='container'>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/toy" element={withSuspense(ToyIndex)} >
                                <Route path='/toy/edit/:toyId?' element={withSuspense(ToyEdit)} />
                            </Route>
                        </Routes>
                    </main>
                    <UserMsg />
            </section>
        </Router >

    )
}

export default App


