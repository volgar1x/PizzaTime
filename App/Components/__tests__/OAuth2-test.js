import React from 'react'
import * as OAuth2 from '../OAuth2'
import { create as render } from 'react-test-renderer'

jest.mock('WebView', () => 'WebView')

test('OAuth2.Login renders correctly', () => {
  const api = {
    authorizeUri: 'mock',
    isAppLoginRedirection() {},
    appLogin() {},
  }

  const tree = render(
    <OAuth2.Login style={{marginTop: 64}}
                  api={api}
                  onStartLogin={() => false}
                  onLoginSuccess={() => false}
                  onLoginError={() => false}
    />
  ).toJSON()

  expect(tree).toMatchSnapshot()
})
