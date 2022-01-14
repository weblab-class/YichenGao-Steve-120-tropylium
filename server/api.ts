import express from "express";
import auth from "./auth";
import socketManager from "./server-socket";
const router = express.Router();

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // Not logged in.
    return res.send({});
  }
  res.send(req.user);
});
router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user) {
    const socket = socketManager.getSocketFromSocketID(req.body.socketid);
    if (socket !== undefined) socketManager.addUser(req.user, socket);
  }
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

router.post("/create", (req, res) => {
  // creating fractal page
});

router.get("/myartworks", (req, res) => {
  // checking saved artworks
});

router.post("/saveArtwork", auth.ensureLoggedIn, (req, res) => {
  const newStory = new artwork({
    creator_id: req.user._id,
    creator_name: req.user.name,
    artwork_name: req.artwork.name,
    artwork_content: req.artwork.content,
  });

router.get("/gallery", (req, res) => {
  // checking other people's artworks
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  const msg = `Api route not found: ${req.method} ${req.url}`;
  res.status(404).send({ msg });
});

export default router;
