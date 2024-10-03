"use client"

import Link from 'next/link'
import React from 'react'

const ErrorPage = () => {
  return (
    <div className='pt-7 text-center'>
      <div className='text-3xl text-red-600 font-semibold'>
        Something Went Wrong
      </div>
      <Link href="/" className='text-xl underline text-blue-700 block mt-6'>
        Go To Home Page
      </Link>
    </div>
  )
}

export default ErrorPage
