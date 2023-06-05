import fs from "fs";
import util from "util";

const updateCounter = async (): Promise<void> => {
  const readFile = util.promisify(fs.readFile);

  try {
    const jsonString = await readFile("./src/utils/temp.json", "utf-8");

    const writeFile = util.promisify(fs.writeFile);

    try {
      const json = JSON.parse(jsonString);

      json.counter += 1;

      await writeFile("./src/utils/temp.json", JSON.stringify(json));

      console.log(
        "Completed overwrite the file, \nnew counter:",
        json.counter.toString(),
        "\nDate:",
        new Date()
      );
    } catch (error) {
      console.error("Error writing file:", error);
    }
  } catch (error) {
    console.error("Error reading file:", error);

    return;
  }
};

export default updateCounter;
