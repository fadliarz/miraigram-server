import { writeFile, readFile } from "fs";

const updateCounter = (): void => {
  // read the file
  readFile("./src/utils/temp.json", "utf-8", (err, jsonString) => {
    if (err) {
      console.log("Error reading file:", err);

      return;
    }

    try {
      const tempJson = JSON.parse(jsonString);
      tempJson.counter += 1;

      // overwrite the file
      writeFile("./src/utils/temp.json", JSON.stringify(tempJson), (err) => {
        if (err) {
          console.log("Error reading file:", err);

          return;
        } else {
          console.log(
            "Completed overwrite the file, \nnew counter:",
            tempJson.counter.toString(),
            "\nDate:",
            new Date()
          );
        }
      });
    } catch (err) {
      console.log("Error parsing json:", err);
    }
  });
};

export default updateCounter;
