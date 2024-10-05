import { app } from "@/app/app";

export default defineEventHandler((event) => {
  return sendRedirect(event, `/games/${app.gameRepository.freeGameId()}`);
});
