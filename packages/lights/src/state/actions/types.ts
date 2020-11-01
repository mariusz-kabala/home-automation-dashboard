import { IFetchAction } from './fetchData'
import { IUpdateDeCONZGroupAction } from './updateGroupState'

export type IAction = IFetchAction | IUpdateDeCONZGroupAction
