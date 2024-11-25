import { ourFileRouter } from "@/core/infrastructure/connectors/uploadthing-st";
import { createRouteHandler } from "uploadthing/next";
 

 
// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
 
  // Apply an (optional) custom config:
  // config: { ... },
});