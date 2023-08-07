import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import axios from "axios";
import fs from "fs";

const thirdwebPublisher = {
  publisherIcon:
    "https://ipfs-public.thirdwebcdn.com/ipfs/QmeNn6emc8Z3VMTFBKSSozSHiG3qt36bFi7EuPCiGGpo17/0.png",
  publisherName: "ThirdWeb",
};

const generateIndex = async () => {
  const contracts = await new ThirdwebSDK("polygon")
    .getPublisher()
    .getAll("deployer.thirdweb.eth");
  console.log(contracts);
  const indexFile = [];

  fs.readdir("./contracts/thirdweb", async (err, files) => {
    console.log(files);
    for (let index = 0; index < files.length; index++) {
      const slug = files[index].replace(".json", "");
      const contract = contracts.find(
        (c) => c.id?.toLowerCase() === slug?.toLowerCase()
      );
      if (contract) {
        const uri = contract.metadataUri.replace(
          "ipfs://",
          "https://cloudflare-ipfs.com/ipfs/"
        );
        console.log(uri);
        const result = await (await axios.get(uri)).data;
        indexFile.push({
          publisherIcon: thirdwebPublisher.publisherIcon,
          publisherName: thirdwebPublisher.publisherName,
          name: result.displayName,
          description: result.description,
          slug: slug,
        });
      }
    }
    fs.writeFile(
      "./contracts/thirdweb/index.json",
      JSON.stringify(indexFile, null, 2),
      () => console.log("file write")
    );
    console.log(indexFile);
  });
};

generateIndex();
