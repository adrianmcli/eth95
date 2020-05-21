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
    act(() => result.current.removeContractByIdx(0));
    expect(result.current.contracts).toStrictEqual([]);
  });

  test("sort contracts alphabetically", () => {
    const { result } = renderHook(() => useContracts());

    const testContract1 = { abi: [], name: "Alice" };
    const testContract2 = { abi: [], name: "Bob" };
    const testContract3 = { abi: [], name: "Charlie" };

    expect(result.current.contracts).toStrictEqual([]);
    act(() => result.current.addContract(testContract3));
    act(() => result.current.addContract(testContract1));
    act(() => result.current.addContract(testContract2));
    expect(result.current.contracts).toStrictEqual([
      testContract1,
      testContract2,
      testContract3,
    ]);
  });

  test("add contract by ABI", () => {
    const { result } = renderHook(() => useContracts());

    const testAbi = [{ type: "function", name: "increment" }];

    act(() => result.current.addByAbi(testAbi, "Counter"));
    expect(result.current.contracts).toStrictEqual([
      {
        abi: testAbi,
        name: "Counter",
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
      result.current.addByArtifact(testArtifact, "Counter", "./test/path"),
    );
    expect(result.current.contracts).toStrictEqual([
      {
        abi: testArtifact.abi,
        artifact: testArtifact,
        name: "Counter",
        path: "./test/path",
      },
    ]);
  });

  test("upsert contract artifact by path", () => {
    const { result } = renderHook(() => useContracts());

    const foo = {
      contractName: "Foo",
      abi: [{ type: "function", name: "foo" }],
      name: "Foo",
      path: "./test/path",
    };
    const bar = {
      contractName: "Bar",
      abi: [{ type: "function", name: "bar" }],
      name: "Foo",
      path: "./test/path",
    };

    act(() => result.current.addByArtifact(foo, foo.name, foo.path));
    expect(result.current.contracts).toStrictEqual([
      {
        abi: foo.abi,
        artifact: foo,
        name: foo.name,
        path: foo.path,
      },
    ]);
    act(() => result.current.upsertByPath(bar, bar.name, bar.path));
    expect(result.current.contracts).toStrictEqual([
      {
        abi: bar.abi,
        artifact: bar,
        name: bar.name,
        path: bar.path,
      },
    ]);
  });

  test("upsert contract artifact by path; but DNE so add it", () => {
    const { result } = renderHook(() => useContracts());

    const foo = {
      contractName: "Counter",
      abi: [{ type: "function", name: "decrement" }],
      name: "Counter",
      path: "./test/path",
    };

    expect(result.current.contracts).toStrictEqual([]);
    act(() => result.current.upsertByPath(foo, foo.name, foo.path));
    expect(result.current.contracts).toStrictEqual([
      {
        abi: foo.abi,
        artifact: foo,
        name: foo.name,
        path: foo.path,
      },
    ]);
  });

  test("remove contract by path", () => {
    const { result } = renderHook(() => useContracts());

    const foo = {
      contractName: "Counter",
      abi: [{ type: "function", name: "increment" }],
      name: "Counter",
      path: "./test/path",
    };

    act(() => result.current.addByArtifact(foo, foo.name, foo.path));
    expect(result.current.contracts).toStrictEqual([
      {
        abi: foo.abi,
        artifact: foo,
        name: foo.name,
        path: foo.path,
      },
    ]);
    act(() => result.current.removeByPath(foo.path));
    expect(result.current.contracts).toStrictEqual([]);
  });

  test("when upserting, if contract exists (by path), just update", () => {
    const { result } = renderHook(() => useContracts());

    const foo = {
      contractName: "Foo",
      abi: [{ type: "function", name: "flip" }],
      name: "Foo",
      path: "./test/path",
    };
    const bar = {
      contractName: "Bar",
      abi: [{ type: "function", name: "flop" }],
      name: "Bar",
      path: "./test/path",
    };

    act(() => result.current.upsertByPath(foo, foo.name, foo.path));
    expect(result.current.contracts).toStrictEqual([
      {
        abi: foo.abi,
        artifact: foo,
        name: foo.name,
        path: foo.path,
      },
    ]);
    act(() => result.current.upsertByPath(bar, bar.name, bar.path));
    expect(result.current.contracts).toStrictEqual([
      {
        abi: bar.abi,
        artifact: bar,
        name: bar.name,
        path: bar.path,
      },
    ]);
  });
});
