import { serve } from "https://deno.land/std@0.222.1/http/server.ts";
import { configure, renderFile } from "https://deno.land/x/eta@v2.2.0/mod.ts";

configure({
  views: `${Deno.cwd()}/views/`,
});

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

let visitCount = 0;

const handleRequest = async (request) => {
  const url = new URL(request.url);

  if (url.pathname === "/visits") {
    visitCount++;
    const data = { count: visitCount };
    return new Response(await renderFile("index.eta", data), responseDetails);
  } else if (url.pathname === "/meaning") {
    return new Response("Seeking truths beyond meaning of life, you will find 43.");
  } else {
    return new Response("Nothing here yet.");
  }
};

serve(handleRequest, { port: 7777 });
