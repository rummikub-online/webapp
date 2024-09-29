import { ConnectedPlayerGateway } from "@/app/WebSocket/infrastructure/ConnectedPlayerGateway";
import { describe, expect, test } from "vitest";

describe("ConnectedPlayerGateway", () => {
  test("can connect player", () => {
    const connectedPlayerGateway = new ConnectedPlayerGateway();

    connectedPlayerGateway.connect({
      gameId: "test",
      username: "Alice",
    });

    expect(
      connectedPlayerGateway.isConnected({
        gameId: "test",
        username: "Alice",
      }),
    ).toBeTruthy();
  });

  test("can't connect player if disconnected", () => {
    const connectedPlayerGateway = new ConnectedPlayerGateway();

    connectedPlayerGateway.connect({
      gameId: "test",
      username: "Alice",
    });

    connectedPlayerGateway.disconnect({
      gameId: "test",
      username: "Alice",
    });

    connectedPlayerGateway.connect({
      gameId: "test",
      username: "Alice",
    });

    expect(
      connectedPlayerGateway.isConnected({
        gameId: "test",
        username: "Alice",
      }),
    ).toBeTruthy();
  });

  test("can't connect player twice", () => {
    const connectedPlayerGateway = new ConnectedPlayerGateway();

    connectedPlayerGateway.connect({
      gameId: "test",
      username: "Alice",
    });

    expect(() =>
      connectedPlayerGateway.connect({
        gameId: "test",
        username: "Alice",
      }),
    ).toThrow(Error);
  });
});
