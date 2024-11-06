import {createFileRoute, Link, Outlet, useNavigate} from '@tanstack/react-router'

export const Route = createFileRoute('/_protected')({
    component: LayoutRoute,
})

const applicationRoutes = {
    "/home": {
        label: 'Home'
    },
    "/dashboard": {
        label: 'Dashboard'
    },
    "/fetch-data/from-state": {
        label: 'From State'
    },
    "/fetch-data/refetch": {
        label: 'Refetch'
    },
    "/fetch-data/with-form": {
        label: 'With Form'
    },
    "/fetch-data/with-loader": {
        label: 'With Loader'
    },
    "/fetch-data/with-error-handling": {
        label: 'With Error Handling'
    },
    "/fetch-data/with-custom-hook": {
        label: 'With Custom Hook'
    },
    "/fetch-data/with-abort": {
        label: 'With Abort'
    },
    "/fetch-data/with-react-query": {
        label: 'With React Query'
    },
}

function LayoutRoute() {
    const navigate = useNavigate();

    const logout = () => {
        navigate({
            to: '/login'
        })
    }

    return (
        <div className="portal-layout">
            <header className={'portal-header'}>
                <h3>React Hooks</h3>
            </header>

            <aside className="portal-sidebar">
                <h4>Menu</h4>
                <nav>
                    <ul style={{marginLeft: 0}}>
                        {
                            Object.entries(applicationRoutes).map(([routeURL, routeMeta]) => (
                                <li key={routeURL}>
                                    <Link style={{color: 'white'}} to={routeURL}>
                                        {routeMeta.label}
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>

                    <button onClick={logout}>Log out</button>
                </nav>
            </aside>

            <main className="portal-main">
                <Outlet/>
            </main>
        </div>
    )
}