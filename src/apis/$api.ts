/* eslint-disable */
import { AspidaClient } from 'aspida'
import { Methods as Methods0 } from './example/login'
import { Methods as Methods1 } from './example/user'
import { Methods as Methods2 } from './example/user/_userId@number'

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '')
  const PATH0 = '/example/login'
  const PATH1 = '/example/user'
  const GET = 'GET'
  const POST = 'POST'
  const PUT = 'PUT'

  return {
    example: {
      login: {
        post: (option: { body: Methods0['post']['reqBody'], config?: T }) =>
          fetch<Methods0['post']['resBody']>(prefix, PATH0, POST, option).json(),
        $post: (option: { body: Methods0['post']['reqBody'], config?: T }) =>
          fetch<Methods0['post']['resBody']>(prefix, PATH0, POST, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH0}`
      },
      user: {
        _userId: (val0: number) => {
          const prefix0 = `${PATH1}/${val0}`

          return {
            get: (option?: { config?: T }) =>
              fetch<Methods2['get']['resBody']>(prefix, prefix0, GET, option).json(),
            $get: (option?: { config?: T }) =>
              fetch<Methods2['get']['resBody']>(prefix, prefix0, GET, option).json().then(r => r.body),
            put: (option: { body: Methods2['put']['reqBody'], config?: T }) =>
              fetch<Methods2['put']['resBody']>(prefix, prefix0, PUT, option).json(),
            $put: (option: { body: Methods2['put']['reqBody'], config?: T }) =>
              fetch<Methods2['put']['resBody']>(prefix, prefix0, PUT, option).json().then(r => r.body),
            $path: () => `${prefix}${prefix0}`
          }
        },
        get: (option?: { config?: T }) =>
          fetch<Methods1['get']['resBody']>(prefix, PATH1, GET, option).json(),
        $get: (option?: { config?: T }) =>
          fetch<Methods1['get']['resBody']>(prefix, PATH1, GET, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH1}`
      }
    }
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
