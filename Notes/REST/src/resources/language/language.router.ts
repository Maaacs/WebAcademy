import { Router } from "express"
import changeLanguage from "./language.controller"
import validateBody from "../../middlewares/validateBody";
import languageController from "./language.controller"
import languageScheme from "./language.schemas"

const router = Router()

router.post("/", validateBody(languageScheme), changeLanguage);

export default router;