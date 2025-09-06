const delay = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));

const Homepage = async () => {
  await delay(2000);
  return <>برگه نخست</>;
};

export default Homepage;
