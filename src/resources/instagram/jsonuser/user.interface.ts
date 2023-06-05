export default interface InstagramUser {
  id: string;
  userId: number;
  username: string;
  password: string;
  createdAt: Date;
  lastActivity: Date;
  deviceSetting: string;
  isActive: boolean;
}
