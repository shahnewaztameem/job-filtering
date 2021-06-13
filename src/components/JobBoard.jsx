import React from 'react'

const JobBoard = ({ job, handleTagClick }) => {
  const {
    id,
    company,
    logo,
    featured,
    position,
    role,
    level,
    postedAt,
    contract,
    location,
    languages,
    tools,
  } = job

  const tags = [role, level]

  if (tools) {
    tags.push(...tools)
  }
  if (languages) {
    tags.push(...languages)
  }

  return (
    <div
      className={`flex flex-col bg-white shadow-md my-16 mx-10 p-5 rounded ${
        featured && 'border-l-4 border-black border-solid'
      } sm:flex-row sm:my-8`}
    >
      <div>
        <img
          className='-mt-16 mb-4 w-20 h-20 sm:h-24 sm:w-24 sm:my-0'
          src={logo}
          alt={company}
        />
      </div>
      <div className='flex flex-col justify-between ml-4'>
        <h3 className='font-bold text-xl text-gray-500'>
          {company}
          {job.new && (
            <span className='text-gray-100 text-white m-2 bg-gray-500 font-bold  py-1 px-2 rounded-full text-sm'>
              NEW
            </span>
          )}
          {featured && (
            <span className='text-gray-100 bg-gray-800  font-bold  py-1 px-2 rounded-full text-sm'>
              FEATURED
            </span>
          )}
        </h3>
        <h2 className='font-bold text-xl my-2 '>{position}</h2>
        <p className='text-gray-500'>
          {postedAt} · {contract} · {location}
        </p>
      </div>
      <div className='flex flex-wrap items-center mt-4 mx-4 pt-4 border-t border-gray-500 border-solid sm:ml-auto sm:border-0 sm:pt-0 sm:mt-0'>
        {tags?.map((tag) => (
          <span
            className='text-gray-500 cursor-pointer bg-gray-100 font-bold mr-4 mb-4 py-2 px-4 rounded-full sm:mb-0'
            onClick={() => handleTagClick(tag)}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

export default JobBoard
