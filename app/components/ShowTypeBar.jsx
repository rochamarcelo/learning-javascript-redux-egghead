import React from 'react'
import FilterLink from '../containers/FilterLink.jsx'

const ShowTypeBar = () => (
  <p>
    Show:
    {" "}
    <FilterLink filter="all">
      All
    </FilterLink>
    {", "}
    <FilterLink filter="liked">
      Liked
    </FilterLink>
    {", "}
    <FilterLink filter="unliked">
      Unliked
    </FilterLink>
  </p>
)

export default ShowTypeBar