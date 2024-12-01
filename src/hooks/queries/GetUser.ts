export default `query GetUser($id: ObjectID!) {
  user(id: $id) {
    id
    type
    username
    display_name
    avatar_url
    biography
    inbox_unread_count
    created_at
    style {
      color
      paint_id
    }
    roles
    emote_sets {
      id
      name
    }
    owned_emotes {
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
