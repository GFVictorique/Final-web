import { Application, send } from "https://deno.land/x/oak/mod.ts";
import { resolve } from "https://deno.land/std/path/mod.ts";

const app = new Application();
const port = 8000;

const staticPath = resolve(Deno.cwd(), "static");

app.use(async (ctx) => {
  await send(ctx, ctx.request.url.pathname, {
    root: staticPath,
    index: "index.html",
  });
});

console.log(`Server is running on http://localhost:${port}`);

await app.listen({ port });
