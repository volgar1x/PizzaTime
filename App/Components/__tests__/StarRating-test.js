import React from 'react'
import StarRating from '../StarRating'
import { create as render } from 'react-test-renderer'

test('StarRating renders correctly', () => {
  const tree = render(
    <StarRating starSize="large" rating={8.5} maxStars={10}/>
  ).toJSON()

  expect(tree).toMatchSnapshot()
})
