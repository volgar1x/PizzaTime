import React from 'react'
import Brand from '../Brand'
import { create as render } from 'react-test-renderer'

test('Brand renders correctly', () => {
  const tree = render(
    <Brand/>
  ).toJSON()

  expect(tree).toMatchSnapshot()
})
