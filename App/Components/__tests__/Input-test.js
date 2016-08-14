import React from 'react'
import Input from '../Input'
import { create as render } from 'react-test-renderer'

jest.mock('TextInput', () => 'TextInput')

test('Input renders correctly', () => {
  const tree = render(
    <Input value="test"/>
  ).toJSON()

  expect(tree).toMatchSnapshot()
})
