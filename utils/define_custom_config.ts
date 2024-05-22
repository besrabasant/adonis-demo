function defineCustomConfig<T>(config: Partial<T>, defaultConfig?: T) {
  return { ...defaultConfig, ...config }
}

export default defineCustomConfig
