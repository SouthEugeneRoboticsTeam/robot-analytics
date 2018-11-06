import { Scouts } from './scout'

export interface Teams {
    [number: number]: Team
}

export interface Team {
    name: string,
    scouts: Scouts
}