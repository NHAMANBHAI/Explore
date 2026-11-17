export interface DeliveryBoy {
  id: string;
  name: string;
  mobile: string;
  avatar: string;
  vehicleType: 'EV Bike' | 'Motorcycle' | 'Bicycle' | 'Van';
  vehicleNumber: string;
  assignedZone: string;
  status: 'available' | 'on_delivery' | 'offline';
  approvalStatus: 'approved' | 'pending' | 'suspended';
  cashInHand: number; // COD collections waiting handover
  cashLimit: number;
  totalDeliveries: number;
  rating: number;
  latitude: number;
  longitude: number;
  lastActive: string;
}
