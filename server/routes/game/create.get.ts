import { app } from "~/app/app";

export default defineEventHandler((event) => {
  return sendRedirect(event, `/game/${app.gameRepository.freeGameId()}`);
});
