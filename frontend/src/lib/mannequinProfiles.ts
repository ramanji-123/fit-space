import type { MannequinProfile } from '../types/avatar'

export const MANNEQUIN_PROFILES: MannequinProfile[] = [
  {
    id: 'standard',
    label: 'Standard Atelier Mannequin',
    subtitle: 'Classic balanced proportion',
    proportionsDescription: 'Balanced shoulder-to-hip ratio, neutral torso height, standard runway grade.',
    defaultMeasurementsCm: {
      height: 178,
      chest: 92,
      waist: 76,
      hip: 96,
    },
  },
  {
    id: 'athletic',
    label: 'Athletic V-Taper Frame',
    subtitle: 'Broader shoulders & chest',
    proportionsDescription: 'Wider clavicle breadth (+6cm chest spread), tapered waist, muscular quadricep balance.',
    defaultMeasurementsCm: {
      height: 182,
      chest: 104,
      waist: 82,
      hip: 100,
    },
  },
  {
    id: 'petite',
    label: 'Petite Compact Silhouette',
    subtitle: 'Scaled vertical proportions',
    proportionsDescription: 'Shortened torso rise, refined shoulder span (-4cm), calibrated hem drop.',
    defaultMeasurementsCm: {
      height: 162,
      chest: 84,
      waist: 66,
      hip: 90,
    },
  },
  {
    id: 'relaxed',
    label: 'Relaxed Full Contour Frame',
    subtitle: 'Soft curves & generous ease',
    proportionsDescription: 'Generous chest and hip volume with comfortable torso contouring.',
    defaultMeasurementsCm: {
      height: 172,
      chest: 108,
      waist: 92,
      hip: 116,
    },
  },
]
