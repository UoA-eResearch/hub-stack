const contentfulExport = require('contentful-export');

const token = process.env.CONTENTFUL_ACCESS_TOKEN;
const spaceId = process.env.CONTENTFUL_SPACE_ID;

async function contentfulExporter() {
  const options = {
    spaceId: spaceId,
    managementToken: token,
    contentOnly: true,
    downloadAssets: false,
    saveFile: false
  };

  return contentfulExport(options);
};

export { contentfulExporter };

