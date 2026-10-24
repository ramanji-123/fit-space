export type GarmentCategory = 'top' | 'outerwear' | 'bottom' | 'dress'

export interface GarmentSizeMeasurement {
  size: 'XS' | 'S' | 'M' | 'L' | 'XL'
  chestCm: number
  waistCm: number
  hipCm?: number
  lengthCm: number
  sleeveCm?: number
}

export interface Garment {
  id: string
  name: string
  category: GarmentCategory
  silhouette: string
  colorName: string
  colorHex: string
  fabric: string
  fabricBehavior: string
  care: string
  description: string
  imageUrl: string
  sampleTag: string
  sizeChart: GarmentSizeMeasurement[]
  referenceFitNote: string
  licenseNote: string
}

export interface UploadedGarment {
  id: string
  fileName: string
  fileSizeFormatted: string
  fileType: string
  previewUrl: string
  uploadedAt: string
  width?: number
  height?: number
  isSimulatedDemo: boolean
}
