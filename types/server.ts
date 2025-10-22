export type ServerInfo = {
  ID: number
  SortIndex?: number
  Name: string
  HostName: string
  Port: number
  UserCount?: number
  MaxUsers?: number
  State?: boolean
  Chat?: boolean
  Language?: string
  IP?: string
  LocalIP?: string
  LastUpdated?: string
  AccessLevel?: number
  Connections?: number
  GEMQueueLength?: number
  AlertLevel?: number
  Status?: number
  Region?: 'NA' | 'EU' | 'AS' | string
}

export type ServerWithMetrics = ServerInfo & {
  occupancy: number // 0..1
  isOnline: boolean
  updatedAt?: Date
}


