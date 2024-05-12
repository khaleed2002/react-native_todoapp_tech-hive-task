import { Request } from 'express'
export interface RequestWithUserInfo extends Request {
  user: {
    id: string
  }
}
