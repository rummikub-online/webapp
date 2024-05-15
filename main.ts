import { Rummikub } from "@rumi/application/rummikub";
import { ShellPresenter } from "@rumi/presenter/shell/ShellPresenter";

const rummikub = new Rummikub({
  presenter: new ShellPresenter(),
});

rummikub.newGame();
