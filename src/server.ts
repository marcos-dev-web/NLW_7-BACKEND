import { httpServer } from "./app";

const PORT = process.env.PORT || 8000;

httpServer.listen(PORT, () => {
  console.log(`Server is runnig at ${PORT}`);
});
