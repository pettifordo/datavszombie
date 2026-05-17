export interface DataAsset {
  id: string;
  name: string;
  type: 'database' | 'pipeline' | 'dataset' | 'model';
  healthScore: number; // 0-100
  freshness: number; // 0-100
  lineageQuality: number; // 0-100
  anomalyCount: number;
  lastUpdated: string;
}

export interface DataSteward {
  id: string;
  name: string;
  email: string;
  department: string;
  assets: DataAsset[];
  overallHealth: number; // 0-100
}

export type PlantStage = 'seed' | 'sprout' | 'growing' | 'blooming' | 'flowering' | 'wilting' | 'dead';
