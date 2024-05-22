import type { ApplicationService } from '@adonisjs/core/types'
import mongoose from 'mongoose';

export default class MultitenancyProvider {
  constructor(protected app: ApplicationService) {}

  /**
   * Register bindings to the container
   */
  register() {
    this.app.container.singleton('masterdatabase', async (resolver) => {
      return await mongoose.connect('')
    })
  }

  /**
   * The container bindings have booted
   */
  async boot() {}

  /**
   * The application has been booted
   */
  async start() {}

  /**
   * The process has been started
   */
  async ready() {}

  /**
   * Preparing to shutdown the app
   */
  async shutdown() {}
}
