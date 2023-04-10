import { Virtuoso } from 'react-virtuoso'
import { generateUsers } from './data'
import { useState, useMemo, useCallback, useEffect, useRef } from 'react'

export default function App() {
  const [users, setUsers] = useState(() => [])

  const loadMore = useCallback(() => {
    return setTimeout(() => {
      setUsers((users) => [...users, ...generateUsers(100, users.length)])
    }, 200)
  }, [setUsers])

  useEffect(() => {
    const timeout = loadMore()
    return () => clearTimeout(timeout)
  }, [])

  return (
    <Virtuoso
      style={{ height: 300 }}
      data={users}
      endReached={loadMore}
      overscan={200}
      itemContent={(index, user) => {
        return <div style={{ backgroundColor: user.bgColor }}>{user.name}</div>
      }}
      components={{ Footer }}
    />
  )
}


const Footer = () => {
  return (
    <div
      style={{
        padding: '2rem',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      Loading...
    </div>
  )
}

