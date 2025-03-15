import { stackMiddlewares } from "@/middlewares/stackHandler";
import { withRef } from "@/middlewares/withRef";

import { withLanguage } from "./middlewares/withLanguage";
import { withRefAdmin } from "./middlewares/withRefAdmin";

const middlewares = [withRef, withRefAdmin, withLanguage];
export default stackMiddlewares(middlewares);
