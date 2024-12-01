export default `query SearchEmotes($query: String!, $page: Int, $limit: Int, $filter: EmoteSearchFilter) {
  emotes(query: $query, page: $page, limit: $limit, filter: $filter) {
    count
    max_page
    items {
      id
      name
      state
      trending
      owner {
        id
        username
        display_name
        style {
          color
          paint_id
        }
      }
      flags
      host {
        url
        files {
          name
          format
          width
          height
        }
      }
    }
  }
}`
