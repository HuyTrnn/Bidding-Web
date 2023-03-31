import React from 'react'

const TimeStart = ({product, socket}) => {
    const getTime = new Date().getTime();

      return (
          <span>:{product.start}</span>
          )
}
export default TimeStart
