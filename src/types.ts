type Location = {
    latitude: number;
    longitude: number;
};

export type Users = {
  [key: string]: Location;
};

export type Messages = {
  [timestamp: number]: {
    timestamp: string;
    message: string;
    latitude: number;
    longitude: number;
  };
};
