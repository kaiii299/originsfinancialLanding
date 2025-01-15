import * as contentfulClient from 'contentful';
import contentfulManagement from 'contentful-management';

const client = contentfulClient.createClient({
  space: "u67fntqfkhe1",
  accessToken: "fM3WNp1uMELodmz_eCsUtpr9ie-UDoFPhcXZgsd5c0Y"
});
const managementClient = contentfulManagement.createClient(
  {
    accessToken: "CFPAT-rkVRzqpOpu93I5muX1954VQ2Y85nAMBc5q5Hyo2fvlI"
  }
);
const miscData = await client.withoutUnresolvableLinks.getEntry(
  "4EGtKjQZn22kzgtVW3hlpl"
);

export { miscData as a, client as c, managementClient as m };
