import React from 'react'

import StarRating from 'react-native-star-rating'

export default (props) => {
  const starSize =
    props.size == 'medium' ? 11 :
    props.size == 'large'  ? 27 :
      11;

  return (
    <StarRating selectedStar={(rating) => false} disabled
                {...props}
                starSize={starSize}
                starColor="#F9D53B"/>
  )
}