export const addRideToRides = (rides, rideToAdd) => {
  const existingRide = rides.find((ride) => ride._id === rideToAdd._id);

  if (existingRide) {
    return rides.map((ride) =>
      ride.id === rideToAdd.id ? { ...ride, count: ride.count + 1 } : ride
    );
  }

  return [...rides, { ...rideToAdd, count: 1 }];
};
