import * as ProfileController from "../controllers/login"
import express from "express";

const router = express.Router();

router.get('/', ProfileController.getProfiles);
router.get('/:id', ProfileController.getProfile);
router.post('/signup', ProfileController.createProfile);
router.patch('/:id', ProfileController.updateProfile);
router.delete('/:id', ProfileController.deleteProfile);

export default router;