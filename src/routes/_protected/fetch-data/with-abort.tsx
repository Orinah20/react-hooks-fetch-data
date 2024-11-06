import { createFileRoute } from '@tanstack/react-router'
import React, { useState } from 'react'
import { useQuery } from '../../../hooks/useAbortQuery'
import axios from 'axios'

type Story = {
  objectID: string
  title: string
  url: string
}

const API = 'https://hn.algolia.com/api/v1/search'

export const Route = createFileRoute('/_protected/fetch-data/with-abort')({
  component: RouteComponent,
})

// const useQuery = (activeSearch: string) => {
//     const [data, setData] = useState<T>(initialData);
//     const [isLoading, setIsLoading] = useState(false);
//     const [isError, setIsError] = useState(false);
//
//     useEffect(() => {
//         const fetchData = async () => {
//             setIsError(false);
//             setIsLoading(true);
//
//             try {
//                 const result = await axios(`${API}?query=${activeSearch}`);
//
//                 setData(result.data.hits);
//             } catch (error) {
//                 setIsError(true);
//             }
//
//             setIsLoading(false);
//         };
//
//         fetchData();
//     }, [activeSearch]);
//
//     return {data, isLoading, isError};
// };

function RouteComponent() {
  const [search, setSearch] = useState('')
  const [activeSearch, setActiveSearch] = useState('react')

  const { data, isLoading, isError } = useQuery<Story[]>({
    queryKey: [activeSearch],
    queryFn: async () => {
      const result = await axios(`${API}?query=${activeSearch}`)

      return result.data.hits
    },
    initialData: [],
  })

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setActiveSearch(search)
    setSearch('')

    event.preventDefault()
  }

  return (
    <>
      <form onSubmit={handleSearchSubmit}>
        <input type="text" value={search} onChange={handleSearchChange} />
        <button type="submit">Search</button>
      </form>

      {isError && <div>Something went wrong ...</div>}

      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        data.map((item) => (
          <li key={item.objectID}>
            <a href={item.url}>{item.title}</a>
          </li>
        ))
      )}
    </>
  )
}
