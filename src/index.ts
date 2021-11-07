import express, { Request, Response, Application } from "express";

const app: Application = express();

const port: number = 3000;

app.get("/ping", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Alive",
  });
});
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
