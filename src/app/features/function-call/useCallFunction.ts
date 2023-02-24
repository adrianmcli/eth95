import { ethers } from "ethers";
import abiDecoder from "abi-decoder";

import OutputLog from "../../containers/OutputLog";
import ContractAddress from "../../containers/ContractAddress";
import Contracts from "../../containers/Contracts";
import Signers from "../../containers/Signers";

const useCallFunction = (args, types, fn, opts) => {
  const { addLogItem, addJSONLogItem } = OutputLog.useContainer();
  const { selectedContract } = Contracts.useContainer();
  const { address } = ContractAddress.useContainer();
  const { signer } = Signers.useContainer();

  const logEvents = async (tx) => {
    const receipt = await signer.provider.getTransactionReceipt(tx.hash);
    abiDecoder.addABI(selectedContract.abi);
    const decoded = abiDecoder.decodeLogs(receipt.logs);
    decoded.forEach((evt) => {
      const values = evt.events.map((x) => {
        if (x.type === "bytes32") {
          ethers.BigNumber.from(x.value).toString();
        }
        return x.value;
      });
      addLogItem(`Event: ${evt.name}(${values})`);
    });
  };

  const callFunction = async () => {
    // handle array and int types
    const processedArgs = args.map((arg, idx) => {
      const type = types[idx];
      if (type.slice(-2) === "[]") return JSON.parse(arg);
      if (type.substring(0, 4) === "uint") return ethers.BigNumber.from(arg);
      return arg;
    });

    const instance = new ethers.Contract(address, selectedContract.abi, signer);

    if (fn.stateMutability !== "view" && fn.constant !== true) {
      // mutating fn; just return hash
      const tx = await instance[fn.name](...processedArgs, opts);
      addLogItem(`tx.hash: ${tx.hash}`);
      await tx.wait();
      addLogItem(`tx mined: ${tx.hash}`);
      await logEvents(tx);
    } else {
      // view fn
      const result = await instance[fn.name](...processedArgs);

      // simple return type
      if (!Array.isArray(result)) {
        addLogItem(result.toString());
        return;
      }

      // complex return type
      const processArray = (arr) => {
        let newArr = [];
        for (let i = 0; i < arr.length; i++) {
          const val = Array.isArray(arr[i])
            ? processArray(arr[i])
            : arr[i].toString();
          newArr.push(val);
        }
        return newArr;
      };

      let processed = processArray([...result]);

      addJSONLogItem(JSON.stringify(processed, null, 2));
    }
  };

  return { callFunction };
};

export default useCallFunction;
