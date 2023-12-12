import { Outlet, createBrowserRouter, redirect } from 'react-router-dom'
import { clearItem, isAuthenticated } from '../api'

const router = createBrowserRouter([
  /*----------------------------------------------------------------------------------------------------------------*/
  {
    path: '/',
    lazy: async () => {
      const Layout = await import('../components/Layouts')
      return { Component: Layout.default }
    },
    children: [
      {
        index: true,
        lazy: async () => {
          const { homeLoader, default: Home } = await import('../pages/Home')
          return { loader: homeLoader, Component: Home }
        }
      },
      /*----------------------------------------------------------------------------------------------------------------*/
      {
        path: 'tags/:tag',
        lazy: async () => {
          const Tags = await import('../pages/Tags')
          return { Component: Tags.default }
        }
      },
      /*----------------------------------------------------------------------------------------------------------------*/
      {
        path: 'following',
        lazy: async () => {
          const { homeLoader, default: Home } = await import('../pages/Home')
          return { loader: homeLoader, Component: Home }
        }
      },
      /*----------------------------------------------------------------------------------------------------------------*/
      {
        path: ':author/:slug',
        lazy: async () => {
          const ArticleDetails = await import('../pages/ArticleDetails')
          return { Component: ArticleDetails.default }
        }
      },
      /*----------------------------------------------------------------------------------------------------------------*/
      {
        path: ':username',
        lazy: async () => {
          const UserDetails = await import('../pages/UserDetails')
          return { Component: UserDetails.default }
        }
      },
      {
        path: 'new',
        lazy: async () => {
          const { formArticleLoader, default: FormArticle } = await import('../pages/FormArticle')
          return { loader: formArticleLoader, Component: FormArticle }
        }
      },
      /*----------------------------------------------------------------------------------------------------------------*/
      {
        path: ':slug/edit',
        lazy: async () => {
          const { formArticleLoader, default: FormArticle } = await import('../pages/FormArticle')
          return { loader: formArticleLoader, Component: FormArticle }
        }
      },
      /*----------------------------------------------------------------------------------------------------------------*/
      {
        path: 'me',
        loader: async () => {
          if (!isAuthenticated()) {
            return redirect('/login')
          }
          return null
        },
        element: <Outlet />,
        children: [
          {
            index: true,
            lazy: async () => {
              const UserDetails = await import('../pages/UserDetails')
              return { Component: UserDetails.default }
            }
          },
          {
            path: 'favorites',
            lazy: async () => {
              const UserFavorites = await import('../pages/UserFavorites')
              return { Component: UserFavorites.default }
            }
          },
          {
            path: 'settings',
            lazy: async () => {
              const UserSetting = await import('../pages/UserSettings')
              return { Component: UserSetting.default }
            }
          },
          {
            path: 'signout',
            loader: () => {
              clearItem('token')
              clearItem('currentUser')
              return redirect('-1')
            }
          },
          {
            path: '*',
            lazy: async () => {
              const NotFound = await import('../pages/NotFound')
              return { Component: NotFound.default }
            }
          }
        ]
      },
      /*----------------------------------------------------------------------------------------------------------------*/
      {
        path: '*',
        lazy: async () => {
          const NotFound = await import('../pages/NotFound')
          return { Component: NotFound.default }
        }
      }
    ]
  },

  /*----------------------------------------------------------------------------------------------------------------*/
  //Login
  {
    path: '/login',
    lazy: async () => {
      const { loginLoader, default: Login } = await import('../pages/Login')
      return { loader: loginLoader, Component: Login }
    }
  },
  /*----------------------------------------------------------------------------------------------------------------*/
  //Register
  {
    path: '/register',
    lazy: async () => {
      const { registerLoader, default: Register } = await import('../pages/Register')
      return { loader: registerLoader, Component: Register }
    }
  },
  /*----------------------------------------------------------------------------------------------------------------*/

  /*----------------------------------------------------------------------------------------------------------------*/
  {
    path: '*',
    lazy: async () => {
      const NotFound = await import('../pages/NotFound')
      return { Component: NotFound.default }
    }
  }
])

export default router
