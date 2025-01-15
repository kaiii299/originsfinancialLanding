import * as contentfulClient from 'contentful'
import contentfulManagement from 'contentful-management'
import type { IMisc } from './interface';

export const prerender = false;

export const client = contentfulClient.createClient({
  space: import.meta.env.PUBLIC_CONTENTFUL_SPACE_ID || '',
  accessToken: import.meta.env.PUBLIC_CONTENTFUL_DELIVERY_TOKEN || '',
});

export const managementClient = contentfulManagement.createClient(
  {
    accessToken: import.meta.env.PUBLIC_CONTENTFUL_CMA_TOKEN || '',
  }
)

