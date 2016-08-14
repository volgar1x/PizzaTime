import React from 'react'
import 'react-native'

import MovieView from '../MovieView'
import { create as render } from 'react-test-renderer'

jest.mock('react-native-parallax-scroll-view', () => 'ParallaxScrollView');

test('Movies renders correctly', () => {
  const movie = require('./movie.json')
  const tree = render(
    <MovieView {...movie}/>
  ).toJSON()

  expect(tree).toMatchSnapshot()
})
