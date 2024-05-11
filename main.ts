import { Rummikub } from "./src/application/rummikub";
import { ShellPresenter } from "./src/presenter/shell/ShellPresenter";

const rummikub = new Rummikub({
  presenter: new ShellPresenter(),
});

rummikub.newGame();
