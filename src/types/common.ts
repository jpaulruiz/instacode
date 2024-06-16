export interface Comment {
  comment: string
  by: string
  date: string
}

export interface Topic {
  name: string
  guid: string
  comments?: Comment[]
}

export interface Pages {
  total: number
  current: number
  previous?: number
}