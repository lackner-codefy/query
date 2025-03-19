import React from 'react'
import { useQuery } from '@tanstack/react-query'

export default function ComponentA({}: {}) {
  useQuery({
    queryKey: ['key'],
    queryFn: () => { console.log("fetch"); throw "some error" },
    throwOnError: false,
  })

  return (
    <>Component A</>
  )
}
