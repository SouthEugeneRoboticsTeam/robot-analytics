import { Scouts } from './scout'

export interface Teams {
    [name: string]: Team
}

export interface Team {
    number: Number,
    scouts: Scouts
}
