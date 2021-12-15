const HomeIndex = () => import('../page/homeIndex')
const Home = () => import('@/page/home/home')
const Jobs = () => import('../page/jobs/jobs')
const Questions = () => import('../page/questions/questions')
const Tags = () => import('../page/Tags/tags')
const Users = () => import('../page/Users/users')
const Search = () => import('../page/search/search')
const Login = () => import('../page/login/login')
const askQuestion = () => import('../page/questions/askQuestion')
const question = () => import('../page/questions/questionDetail')
const tag = () => import('../page/tags/tagDetail')
// const childBanner = [
//   {
//     path: '/',
//     name: 'Home',
//     components: {
//       childBanner: require('../page/home/home.vue')
//     }
//   }
// ]

// const main = [
// {
//   path: '/users',
//   name: 'Users',
//   component: {
//     main: require('../page/users/users.vue')
//   }
// },
// {
//   path: '/tags',
//   name: 'Tags',
//   component: {
//     main: require('../page/tags/tags.vue')
//   }
// },
// {
//   path: '/questions',
//   name: 'Questions',
//   component: {
//     main: require('../page/questions/questions.vue')
//   }
// },
// {
//   path: '/jobs',
//   name: 'Jobs',
//   component: {
//     main: require('../page/jobs/jobs.vue')
//   }
// }
// ]
const Register = () => import('../page/login/register.vue')

const index = [
  {
    path: '*',
    redirect: '/'

  },
  {
    path: '/register',
    component: Register
  },

  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    component: HomeIndex,
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home
      },
      {
        path: '/users',
        name: 'Users',
        component: Users
      },
      {
        path: '/tags',
        name: 'Tags',
        component: Tags
      },
      {
        path: '/askQuestion',
        name: 'askQuestion',
        component: askQuestion
      },
      {
        path: '/tag',
        name: 'tag',
        component: tag
      },
      {
        path: '/question',
        name: 'question',
        component: question
      },
      {
        path: '/questions',
        name: 'Questions',
        component: Questions,
        children: []
      },
      {
        path: '/jobs',
        name: 'Jobs',
        component: Jobs
      },
      {
        path: '/search',
        name: 'Search',
        component: Search
      }

    ]
  }

]
export default index
