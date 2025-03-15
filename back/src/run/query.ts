import { Minute } from '../utils/validators'
import { Run } from './validators'

export namespace RunQuery {
  export const DEFAULT_RUN = Run(10)
  export const DEFAULT_RUN_PERIOD = Minute(60)
}
