import React from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'

export default function ComponentB({}: {}) {
  useSuspenseQuery({
    queryKey: ['key'],
    queryFn: () => { console.log("fetch"); throw "some error" },
  })

  return (
    <>Component A</>
  )
}
