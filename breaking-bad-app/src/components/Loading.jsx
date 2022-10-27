import React from 'react'

import { AtomSpinner } from 'react-epic-spinners'

function Loading({size = 150}) {
  return (<div className="flex justify-center p-4">
    <AtomSpinner color="red" size={size} />
  </div>
  )
}

export default Loading