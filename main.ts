import { Rummikub } from "@rummikub-ma/application/rummikub";
import { ShellPresenter } from "@rummikub-ma/presenter/shell/ShellPresenter";

const rummikub = new Rummikub({
  presenter: new ShellPresenter(),
});

rummikub.newGame();
