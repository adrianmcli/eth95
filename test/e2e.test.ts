import path from "path";
import fs from "fs";
import puppeteer, { Browser, Page } from "puppeteer";
import { spawn, ChildProcess } from "child_process";
import getPort from "get-port";
import portUsed from "tcp-port-used"
import validateRawArtifact from "../src/common/validateRawArtifact";

jest.setTimeout(20000);

const TEST_DIR = path.resolve("./__test_artifact_dir__");

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe("End-to-end test", () => {
  let serverProcess: ChildProcess;
  let port: number;
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    // ensure test folder exists
    if (!fs.existsSync(TEST_DIR)) {
      fs.mkdirSync(TEST_DIR);
    }

    // seed folder with one contract
    const foo = {
      contractName: "Foo",
      abi: [{ name: "foo", type: "function" }],
    };
    fs.writeFileSync(path.resolve(TEST_DIR, "Foo.json"), JSON.stringify(foo));

    // run server, point to test directory, use random available port
    port = await getPort();
    serverProcess = spawn("ts-node", [
      "./src/index.ts",
      TEST_DIR,
      "-p",
      port.toString(),
    ]);
    if (serverProcess.stdout !== null) {
      serverProcess.stdout.on("data", (data) => {
        // for debugging:
        // console.log(data.slice(0, data.length - 1).toString("utf8"));
      });
    }

    await portUsed.waitUntilUsed(port, 200, 5000)
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto(`http://localhost:${port}`, { waitUntil: "networkidle2" });
  });

  afterAll(async () => {
    await browser.close();
    fs.rmdirSync(TEST_DIR, { recursive: true });
    serverProcess.kill("SIGINT");
  });

  test("check seeded dummy test file", () => {
    const dummyFilePath = path.join(TEST_DIR, "Foo.json");
    const dummyFileExists = fs.existsSync(dummyFilePath);
    const rawJson = fs.readFileSync(dummyFilePath);
    const isValidJson = validateRawArtifact(rawJson);

    expect(dummyFileExists).toBe(true);
    expect(isValidJson).toBe(true);
  });

  test("seeded dummy file shows in contract list", async () => {
    const contractItems = await page.$$(`.contract-list-item`);
    const contractLabel = await contractItems[0].evaluate((el) => el.innerHTML);

    expect(contractItems.length).toBe(1);
    expect(contractLabel).toBe("Foo");
  });

  test("read contract function labels", async () => {
    const contractItems = await page.$$(`.contract-list-item`);
    await contractItems[0].click();

    const functionLabels = await page.$$(`.function-list-item`);
    const fnLabel = await functionLabels[0].evaluate((el) => el.innerHTML);
    expect(functionLabels.length).toBe(1);
    expect(fnLabel).toBe("foo()");
  });

  test("update contract function name", async () => {
    const foo = {
      contractName: "Foo",
      abi: [{ name: "baz", type: "function" }],
    };
    fs.writeFileSync(path.resolve(TEST_DIR, "Foo.json"), JSON.stringify(foo));

    await sleep(200);
    const functionLabels = await page.$$(`.function-list-item`);
    const fnLabel = await functionLabels[0].evaluate((el) => el.innerHTML);
    expect(functionLabels.length).toBe(1);
    expect(fnLabel).toBe("baz()");
  });

  test("added contract file shows in contract list", async () => {
    // add file to test directory
    const bar = {
      contractName: "Bar",
      abi: [{ name: "bar", type: "function" }],
    };
    fs.writeFileSync(path.resolve(TEST_DIR, "Bar.json"), JSON.stringify(bar));

    await sleep(200);
    const contractItems = await page.$$(`.contract-list-item`);

    // note that order is reversed because the list is always sorted alphabetically
    const barLabel = await contractItems[0].evaluate((el) => el.innerHTML);
    const fooLabel = await contractItems[1].evaluate((el) => el.innerHTML);

    expect(contractItems.length).toBe(2);
    expect(fooLabel).toBe("Foo");
    expect(barLabel).toBe("Bar");
  });

  test("deleting contract updates in the UI", async () => {
    fs.unlinkSync(path.resolve(TEST_DIR, "Foo.json"));

    await sleep(200);
    const contractItems = await page.$$(`.contract-list-item`);
    const contractLabel = await contractItems[0].evaluate((el) => el.innerHTML);

    expect(contractItems.length).toBe(1);
    expect(contractLabel).toBe("Bar");
  });
});
