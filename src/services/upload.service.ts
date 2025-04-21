import * as path from "node:path";

const uploadSingleFile = (fileObject) => {
  if (!fileObject || !fileObject.name) {
    return {
      success: false,
      message: "Invalid file object!",
    };
  }

  const uploadPath = path.resolve(__dirname, "../public/images/uploads");
  const extName = path.extname(fileObject.name);
  const baseName = path.basename(fileObject.name, extName);
  const finalName = `${baseName}-${Date.now()}${extName}`;
  const finalPath = `${uploadPath}/${finalName}`;

  try {
    fileObject.mv(finalPath);
    return {
      success: true,
      message: "Upload file success!",
      data: {
        path: finalName,
      },
    };
  } catch (err) {
    return {
      success: false,
      message: JSON.stringify(err),
    };
  }
};

const uploadMultipleFiles = (filesArr) => {
  const uploadPath = path.resolve(__dirname, "../public/images/uploads");
  const resultArr = [];
  let countSuccess = 0;

  try {
    filesArr.forEach((file) => {
      const extName = path.extname(file.name);
      const baseName = path.basename(file.name, extName);
      const finalName = `${baseName}-${Date.now()}${extName}`;
      const finalPath = `${uploadPath}/${finalName}`;

      console.log(finalPath)

      try{
        file.mv(finalPath);
        countSuccess++;
        resultArr.push({
          success: true,
          message: "Upload file success!",
          data: {
            path: finalName,
          },
        });
      }
      catch(err){
        resultArr.push({
          success: false,
          message: JSON.stringify(err),
          data: {
            path: file.name,
          },
        });
      }
    });

    return {
      success: true,
      message: `${countSuccess} files uploaded successfully!`,
      data: resultArr,
    };
  } catch (err) {
    return {
      success: false,
      message: JSON.stringify(err),
    };
  }
};

export { uploadSingleFile, uploadMultipleFiles };
