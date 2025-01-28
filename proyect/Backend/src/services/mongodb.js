function mongodb() {
  return {
    connect: () => {
      console.log('Connecting to MongoDB');
    },
  };
}

export default mongodb;