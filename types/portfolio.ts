// REQ-DIY-03: filter bar domain tags
export type DomainTag =
  | 'RTOS'
  | 'Protocol Driver'
  | 'Wireless'
  | 'DSP/Motor'
  | 'EVSE'
  | 'Tooling'
  | 'Bring-Up'
  | 'Space'

// REQ-DIY-05: firmware vs tooling vs language vs standard chip layers
export type StackLayer = 'firmware' | 'tooling' | 'language' | 'standard'

export interface TechChip {
  label: string
  layer: StackLayer
}

// REQ-VIDEO-01/02: YouTube-hosted, facade pattern
export interface VideoDemo {
  youtubeId: string
  thumbnailUrl?: string // falls back to YouTube default thumbnail if omitted
}

// REQ-DIY-01/02/04: project card data model
export interface Project {
  id: string
  title: string
  hardware: string       // e.g. "STM32F4 + ESP32-C3"
  description: string    // one-sentence "so what"
  tags: DomainTag[]
  stack: TechChip[]
  githubUrl: string
  demoUrl?: string
  video?: VideoDemo
  featured: boolean      // true = 2x wide card, pinned top
}

// REQ-EXP-01/02: timeline role card data model
export interface Role {
  company: string
  title: string
  startDate: string      // ISO month: "2024-08"
  endDate?: string       // undefined = present
  location: string
  bullets: string[]
  stack: TechChip[]
  standards?: string[]   // e.g. ["ISO 26262", "AUTOSAR"]
}

// REQ-SKILL-01/02: grouped skill list, hardware-first ordering
export interface SkillGroup {
  category: string
  skills: string[]
}

// REQ-CONTACT-01–05: contact link for footer/contact section
export interface ContactLink {
  label: string
  href: string
  icon: 'github' | 'linkedin' | 'email'
}
