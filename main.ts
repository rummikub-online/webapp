import { Rummikub } from "./src/application/rummikub";
import { ShellPresenter } from "./src/presenter/ShellPresenter";

const rummikub = new Rummikub({
  presenter: new ShellPresenter(),
});

rummikub.newGame();
