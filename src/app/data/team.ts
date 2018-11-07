import { Scouts } from '@robot-analytics/data/scout'

export interface Teams {
    [number: number]: Team
}

export interface Team {
    name: string,
    scouts: Scouts
}