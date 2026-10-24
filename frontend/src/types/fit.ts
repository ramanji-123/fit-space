export type FitTolerance = 'loose' | 'relaxed' | 'tailored' | 'snug' | 'undetermined'

export interface FitGuidanceInsight {
  attribute: string
  observation: string
  intent: string
  confidenceNote: string
}

export interface FitAssessment {
  mode: 'sample-garment' | 'uploaded-image'
  selectedSize: string
  tolerance: FitTolerance
  silhouetteStyle: string
  fabricDrapeDescription: string
  chestEaseEstimateCm?: number
  waistEaseEstimateCm?: number
  insights: FitGuidanceInsight[]
  disclaimer: string
  limitations: string[]
}
