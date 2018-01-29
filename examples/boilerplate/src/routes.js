import { redirect } from 'redux-first-router'

export default {
  HOME: '/',

  LIST: {
    path: '/list/:category',
    toPath: param => (param),
    fromPath: param => (param),
    thunk: async ({ action }) => {
      const { params: { category } } = action
      const packages = await fetch(`/api/category/${category}`)

      if (packages.length === 0) {
        return
        return {
          type: 'LIST',
          params: { category: 'redux' }
        }
      }

      return { category, packages }
    }
  }
}

// this is essentially faking/mocking the fetch api
// pretend this actually requested data over the network

const fetch = async path => {
  await new Promise(res => setTimeout(res, 500))
  const category = path.replace('/api/category/', '')

  switch (category) {
    case 'redux':
      return ['reselect', 'recompose', 'redux-first-router']
    case 'react':
      return [
        'react-router',
        'react-transition-group',
        'react-universal-component'
      ]
    default:
      return []
  }
}