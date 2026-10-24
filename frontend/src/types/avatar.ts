export type AvatarBodyType = 'standard' | 'athletic' | 'petite' | 'relaxed'

export type MeasurementUnit = 'cm' | 'in'

export interface BodyMeasurements {
  height: number
  chest: number
  waist: number
  hip: number
  unit: MeasurementUnit
}

export type StudioLighting = 'daylight' | 'warm-editorial' | 'monochrome'

export type StudioViewMode = 'avatar' | 'flat-lay' | '3d-preview'

export type ViewAngle = 'front' | 'three-quarter' | 'detail'

export interface MannequinProfile {
  id: AvatarBodyType
  label: string
  subtitle: string
  proportionsDescription: string
  defaultMeasurementsCm: {
    height: number
    chest: number
    waist: number
    hip: number
  }
}
