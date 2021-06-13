import React, { useEffect, useState } from 'react'
import JobBoard from './components/JobBoard'
import data from './assets/data.json'
import { css } from '@emotion/react'
import BeatLoader from 'react-spinners/BeatLoader'

const App = () => {
  const [jobs, setJobs] = useState([])
  const [filters, setFilters] = useState([])

  useEffect(() => {
    setInterval(() => {
      setJobs(data)
    }, 1500)
  }, [])

  const filterFunc = ({ role, level, tools, languages }) => {
    if (filters.length === 0) {
      return true
    }

    const tags = [role, level]

    if (tools) {
      tags.push(...tools)
    }
    if (languages) {
      tags.push(...languages)
    }

    return tags.some((tag) => filters.includes(tag))
  }

  const handleTagClick = (tag) => {
    if (filters.includes(tag)) return
    setFilters([...filters, tag])
  }

  const handleFilterClick = (passedFilter) => {
    setFilters(filters.filter((f) => f !== passedFilter))
  }

  const clearFilters = () => {
    setFilters([])
  }

  const filteredJobs = jobs.filter(filterFunc)

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `

  return (
    <>
      <header className='bg-gray-500 mb-10'>
        <img
          src='/images/bg-header-desktop.svg'
          alt=' background img'
          className='m-auto w-full'
        />
      </header>
      <div className='container m-auto'>
        {filters.length > 0 && (
          <div className={`flex bg-white shadow-md my-16 mx-10 p-5 rounded`}>
            {filters.map((filter) => (
              <span
                className=' cursor-pointer font-bold mr-1 mb-4 py-1 px-2 rounded-full sm:mb-0'
                onClick={() => handleFilterClick(filter)}
              >
                <span className='text-gray-500 bg-gray-100 p-2'>
                  {filter} ✖
                </span>
              </span>
            ))}
            <button
              onClick={clearFilters}
              className='font-bold text-gray-700 ml-auto'
            >
              Clear
            </button>
          </div>
        )}
        {jobs.length === 0 ? (
          <div className='m-auto flex items-center mt-10'>
            <BeatLoader css={override} size={50} />
          </div>
        ) : (
          filteredJobs.map((job) => (
            <JobBoard job={job} key={job.id} handleTagClick={handleTagClick} />
          ))
        )}
      </div>
    </>
  )
}

export default App
