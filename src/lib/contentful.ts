import * as contentful from 'contentful'

export const client = contentful.createClient({
  space: import.meta.env.PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.PUBLIC_CONTENTFUL_DELIVERY_TOKEN ,
});