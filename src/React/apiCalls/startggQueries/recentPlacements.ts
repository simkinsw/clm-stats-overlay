const query = `query Sets($playerID: ID!) {
    player(id: $playerID) {
      recentStandings(videogameId: 1, limit: 5) {
        container {
          ...on Event {
            numEntrants
            isOnline
            type
            tournament {
              name
              slug
            }
          }
        }
        placement
      }
    }
}`

export default query;