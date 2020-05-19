import { act, renderHook } from "@testing-library/react-hooks";
import { useContracts } from "./Contracts";

describe("Contracts state container", () => {
  test("initial conditions", () => {
    const { result } = renderHook(() => useContracts());

    expect(result.current.contracts).toStrictEqual([]);
    expect(result.current.selectedIdx).toBe(null);
  });

  test("add and remove contract", () => {
    const { result } = renderHook(() => useContracts());

    const testContract = { abi: [], name: "MyContract" };

    expect(result.current.contracts).toStrictEqual([]);
    act(() => result.current.addContract(testContract));
    expect(result.current.contracts).toStrictEqual([testContract]);
    act(() => result.current.removeContract(0));
    expect(result.current.contracts).toStrictEqual([]);
  });

  test("add contract by ABI", () => {
    const { result } = renderHook(() => useContracts());

    const testAbi = [{ type: "function", name: "increment" }];

    act(() => result.current.addByAbi(testAbi, "Counter.sol"));
    expect(result.current.contracts).toStrictEqual([
      {
        abi: testAbi,
        name: "Counter.sol",
      },
    ]);
  });

  test("add contract by artifact", () => {
    const { result } = renderHook(() => useContracts());

    const testArtifact = {
      contractName: "Counter",
      abi: [{ type: "function", name: "increment" }],
    };

    act(() =>
      result.current.addByArtifact(testArtifact, "Counter.sol", "./test/path"),
    );
    expect(result.current.contracts).toStrictEqual([
      {
        abi: testArtifact.abi,
        artifact: testArtifact,
        name: "Counter.sol",
        path: "./test/path",
      },
    ]);
  });
});
