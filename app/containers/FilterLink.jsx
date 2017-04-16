import React from 'react'
import {NavLink} from 'react-router-dom';

const FilterLink = ({filter, children}) => (
  <NavLink
    to={'/' + (filter === 'all' ? '' : filter)}
    activeStyle={{
      textDecoration: 'none',
      color: 'black',
    }}
    exact={true}
  >
    {children}
  </NavLink>
);

export default FilterLink