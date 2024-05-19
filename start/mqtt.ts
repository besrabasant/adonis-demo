import mqtt from 'mqtt'
import { cliui } from '@poppinss/cliui'
import colors from 'colors'
import logger from '@adonisjs/core/services/logger'
import _ from 'lodash'

const ui = cliui()
let connectionError = false
let attemptingReconnection = false

let brokerUrl = 'mqtt://localhost:1883'

let client = mqtt.connect(brokerUrl, {
  username: 'probing',
  password: 'password123',
})

const ShowAttemptingReconnection = _.debounce(() => {
  logger.info(
    `\n\n Attempting reconnection to ${colors.bold('Probing MQTT Broker')} on ${colors.cyan(brokerUrl)}\n`
  )
}, 1000)

client.on('connect', () => {
  if (attemptingReconnection) {
    logger.info(
      `${colors.bold('Probing MQTT Broker')} is ${colors.bgGreen(' online ')} ${colors.cyan(brokerUrl)}`
    )
  }

  connectionError = false
  attemptingReconnection = false

  logger.info(
    `\n\n ${colors.bold(colors.green('Connected'))} to ${colors.bold('Probing MQTT Broker')} on ${colors.cyan(brokerUrl)}\n`
  )
})

client.on('error', (error) => {
  if (!connectionError) {
    let message = `\n\n Cannot connect to ${colors.bold('Probing MQTT Broker')} on ${colors.cyan(brokerUrl)}\n`

    if (error.message) {
      message = `${message}\n ${error.message}\n`
    }

    if (attemptingReconnection) {
      ShowAttemptingReconnection()
    }

    logger.error(message)
  }
  connectionError = true
})

client.on('end', () => {
  logger.info(
    `\n\n ${colors.bold(colors.red('Disconnected'))} from ${colors.bold('Probing MQTT Broker')} on ${ui.colors.cyan(brokerUrl)}\n`
  )
})

client.on('offline', () => {
  logger.info(
    `${colors.bold('Probing MQTT Broker')} is ${ui.colors.bgRed(' offline ')} ${colors.cyan(brokerUrl)}`
  )
})

client.on('reconnect', () => {
  if (!attemptingReconnection) {
    ShowAttemptingReconnection()
  }
  attemptingReconnection = true
})
