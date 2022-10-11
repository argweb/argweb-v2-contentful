import * as Types from '../../../lib/__generated/graphql.types';

import { AssetFieldsFragment } from '../../ctf-asset/__generated/ctf-asset.generated';
import { AssetFieldsFragmentDoc } from '../../ctf-asset/__generated/ctf-asset.generated';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

function fetcher<TData, TVariables>(query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch("https://graphql.contentful.com/content/v1/spaces/vw5be3ki3sdd", {
    method: "POST",
    ...({"headers":{"Content-Type":"application/json","Authorization":"Bearer GM7NHP-8LZDbI758jw1ze9OYJV9rVpKcJfyjRP30ang"}}),
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  }
}
export type PersonFieldsFragment = { __typename: 'TopicPerson', internalName?: string | null, name?: string | null, website?: string | null, location?: string | null, cardStyle?: boolean | null, sys: { __typename?: 'Sys', id: string }, bio?: { __typename?: 'TopicPersonBio', json: any } | null, avatar?: (
    { __typename?: 'Asset' }
    & AssetFieldsFragment
  ) | null };

export type CtfPersonQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
  locale?: Types.InputMaybe<Types.Scalars['String']>;
  preview?: Types.InputMaybe<Types.Scalars['Boolean']>;
}>;


export type CtfPersonQuery = { __typename?: 'Query', topicPerson?: (
    { __typename?: 'TopicPerson' }
    & PersonFieldsFragment
  ) | null };

export const PersonFieldsFragmentDoc = `
    fragment PersonFields on TopicPerson {
  __typename
  sys {
    id
  }
  internalName
  name
  bio {
    json
  }
  avatar {
    ...AssetFields
  }
  website
  location
  cardStyle
}
    `;
export const CtfPersonDocument = `
    query CtfPerson($id: String!, $locale: String, $preview: Boolean) {
  topicPerson(id: $id, preview: $preview, locale: $locale) {
    ...PersonFields
  }
}
    ${PersonFieldsFragmentDoc}
${AssetFieldsFragmentDoc}`;
export const useCtfPersonQuery = <
      TData = CtfPersonQuery,
      TError = unknown
    >(
      variables: CtfPersonQueryVariables,
      options?: UseQueryOptions<CtfPersonQuery, TError, TData>
    ) =>
    useQuery<CtfPersonQuery, TError, TData>(
      ['CtfPerson', variables],
      fetcher<CtfPersonQuery, CtfPersonQueryVariables>(CtfPersonDocument, variables),
      options
    );