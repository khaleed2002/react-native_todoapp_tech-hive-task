export interface RequestWithUserInfo extends Request {
  user: {
    id: string
  }
}
