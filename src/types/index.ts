export interface User {
  name: string
  avatar: string
}

export interface Product {
  id: string
  name: string
  description: string
  alias: string
  category: string[]
  verified: boolean
  openSource: boolean
  isApproved: boolean
  status: string
  approvalStatus: string
  teamMembers: string[]
  website: string
  userCount: string
  launchDate: string
  createdAt: string
  updatedAt: string
  founder?: string
  icon?: string
  gallery?: string[]
  playstore?: string[]
  appstore?: string[]
  explainerVideo?: string
  xAccount?: string
  features?: string[]
  techStack?: string[]
  brand_colors?: string[]
  metadata?: any
}
