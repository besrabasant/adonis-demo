import router from '@adonisjs/core/services/router'
const HomeController = () => import('#controllers/api/home_controller')

router
  .group(() => {
    router.get('/', [HomeController, 'index'])
  })
  .prefix('api')
