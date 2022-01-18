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

const Artwork = require("./models/Artwork");
import ArtworkInterface from "../shared/Artwork";

router.get("/artworks", (req, res) => {
  Artwork.find({}).then((artworks: ArtworkInterface[] | null | undefined) => res.send(artworks));
});

router.get("/artworks/:id", (req, res) => {
  Artwork.find({ creator_id: req.params.id }).then(
    (artworks: ArtworkInterface[] | null | undefined) => res.send(artworks)
  );
});

router.post("/artwork", auth.ensureLoggedIn, (req, res) => {
  if (req.user) {
    const newArtwork = new Artwork({
      creator_id: req.user._id,
      cellDeltas: req.body.cellDeltas,
      endDelta: req.body.endDelta,
      numIterations: req.body.numIterations,
    });
    newArtwork.save().then((artwork: ArtworkInterface) => res.send(artwork));
  }
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  const msg = `Api route not found: ${req.method} ${req.url}`;
  res.status(404).send({ msg });
});

export default router;
