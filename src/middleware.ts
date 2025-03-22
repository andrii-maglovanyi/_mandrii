import { stackMiddlewares } from "@/middlewares/stackHandler";
import { withAdmin } from "@/middlewares/withAdmin";
import { withRef } from "@/middlewares/withRef";

import { withLanguage } from "./middlewares/withLanguage";
import { withRefAdmin } from "./middlewares/withRefAdmin";

const middlewares = [withAdmin, withRef, withRefAdmin, withLanguage];
export default stackMiddlewares(middlewares);
