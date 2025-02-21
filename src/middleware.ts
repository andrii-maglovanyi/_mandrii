import { stackMiddlewares } from "@/middlewares/stackHandler";
import { withRef } from "@/middlewares/withRef";
import { withRefAdmin } from "./middlewares/withRefAdmin";
import { withLanguage } from "./middlewares/withLanguage";

const middlewares = [withRef, withRefAdmin, withLanguage];
export default stackMiddlewares(middlewares);
