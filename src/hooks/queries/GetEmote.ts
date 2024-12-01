export default `query GetEmote($id: ObjectID!) {
  emote(id: $id) {
    id
    name
    flags
    owner {
      id
      username
      display_name
    }
    host {
      url
      files {
        name
        static_name
        width
        height
      }
    }
  }
}`
