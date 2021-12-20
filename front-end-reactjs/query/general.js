import { gql } from "@apollo/client";

export const GET_HEADER = gql`
  query {
    allPages {
      name
      url
    }
  }
`;

export const GET_NEWS = gql`
  query getNews($slug: String!) {
    news: allPages(where: { slug_contains: $slug }) {
      name
      slug
      url
      layouts {
        name
        property {
          name
          key
          value
          image {
            original: publicUrl
            thumbnail: publicUrlTransformed(transformation: { width: "64" })
          }
          content {
            name
            key
            value
          }
        }
      }
    }
    video: allVideos(where: { name_contains: $slug }) {
      name
      title
      subTitle
      video
    }
  }
`;
export const GET_INSTRUCTIONS = gql`
  query getStructons($slug: String!) {
    pages: allPages(where: { slug_contains: $slug }) {
      name
      slug
      url
      layouts {
        name
        property {
          name
          key
          value
          image {
            original: publicUrl
            thumbnail: publicUrlTransformed(transformation: { width: "64" })
          }
          content {
            name
            key
            value
          }
        }
      }
    }
    video: allVideos(where: { name_contains: $slug }) {
      name
      title
      subTitle
      video
    }
  }
`;
export const GET_NEWS_URL = gql`
  query getNewsPageData {
    page: allPages(where: { name_contains: "News" }) {
      name
      url
      childrenPage {
        url
        slug
        childrenPage {
          slug
        }
      }
    }
  }
`;

export const GET_INSTRUCTIONS_URL = gql`
  query getNewsPageData {
    page: allPages(where: { name_contains: "Instructions" }) {
      name
      url
      childrenPage {
        url
        slug
        childrenPage {
          slug
        }
      }
    }
  }
`;
