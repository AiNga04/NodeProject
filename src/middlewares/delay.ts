export default function delay(req, res, next) {
  const delayTime = 2000;
  setTimeout(() => {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      console.log("Token:", token);
    }
    next();
  }, delayTime);
}
