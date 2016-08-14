import React from 'react'
import TraktButton from '../TraktButton'
import { create as render } from 'react-test-renderer'

test('TraktButton renders correctly', () => {
  const tree = render(
    <TraktButton label="Login with Trakt.tv"/>
  ).toJSON()

  expect(tree).toMatchSnapshot()
})
