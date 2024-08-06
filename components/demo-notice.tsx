// components/DemoNotice.tsx
import React from 'react'

const DemoNotice = () => {
  return (
    <div className="fixed bottom-0 inset-x-0 bg-yellow-100 text-center py-2 text-yellow-800">
      <p>
        This is a non-functional demo site. No real transactions or documents
        are processed.
      </p>
    </div>
  )
}

export default DemoNotice
