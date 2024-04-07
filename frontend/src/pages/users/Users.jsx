import React from 'react'

import DataTable from '../../components/dataTable/DataTable'

const Users = () => {
  return (
    <div className="users">
      <div className="info">
      <h1 style={{ fontSize: '2.5rem' }}>Users</h1>
      </div>
      <DataTable/>
    </div>
  )
}

export default Users