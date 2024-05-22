import mongoose from 'mongoose'

declare module '@adonisjs/core/types' {
  interface ContainerBindings {
    masterdatabase: typeof mongoose
  }
}


