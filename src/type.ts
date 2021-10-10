export interface IBuild {
  status: 'ok' | 'pending' | 'fail'
  buildNum: number
  description: string
  branch: string
  commit: string
  user: string
  date: Date
  durationSeconds: number
}

export type BuildState = {
  builds: IBuild[]
}

export type BuildAction = {
  type: string
  payload: string
}

export type DispatchType = (args: BuildAction) => BuildAction
