const contentfulExport = require('contentful-export');

const token = process.env.CONTENTFUL_ACCESS_TOKEN;
const spaceId = process.env.CONTENTFUL_SPACE_ID;


module.exports.contentfulExporter = () => {
  const options = {
    spaceId: spaceId,
    managementToken: token,
    contentOnly: true,
    downloadAssets: false
  };

  contentfulExport(options)
  .then((result) => {
    console.log('Your space data:', result)
  })
  .catch((err) => {
    console.log('Oh no! Some errors occurred!', err)
  });
};