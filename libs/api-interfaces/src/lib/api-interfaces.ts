export interface Message {
  message: string;
}
export interface ActivityType {
  id: string;
  title: string;
  color: string;
  points: number;
  maxDistancePerDayInKm: number;
}
export interface User {
  id: string;
  username: string;
}
export interface Activity {
  id: string;
  userId: string;
  type: ActivityType;
  distanceInKm: number;
  timeInMinutes: number;
  calculatedPoints: number;
  editedAt: Date;
  createdAt: Date;
}
