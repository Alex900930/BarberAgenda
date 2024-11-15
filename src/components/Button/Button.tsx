import Link from 'next/link'
import React from 'react'

type Title = {
    title: string;
  };

export default function Button({title}: Title ){
  return (
    <Link 
    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg"
    href="#">{title}</Link>
  )
}
