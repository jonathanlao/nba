import { Player, Team } from '../src/types'

const Warriors: Team = {
  "id": 10,
  "conference": "West",
  "division": "Pacific",
  "city": "Golden State",
  "full_name": "Golden State Warriors",
  "name": "Warriors",
  "abbreviation": "GSW"
}

export const Hawks: Team = {
  "id": 1,
  "conference": "East",
  "division": "Southeast",
  "city": "Atlanta",
  "name": "Hawks",
  "full_name": "Atlanta Hawks",
  "abbreviation": "ATL"
}

export const firstRoundDraftPlayer: Player = {
  "id": 19,
  "first_name": "Stephen",
  "last_name": "Curry",
  "position": "G",
  "height": "6-2",
  "weight": "185",
  "jersey_number": "30",
  "college": "Davidson",
  "country": "USA",
  "draft_year": 2009,
  "draft_round": 1,
  "draft_number": 7,
  "team": Warriors
}

export const secondRoundDraftPlayer: Player = {
  "id": 190,
  "first_name": "Daniel",
  "last_name": "Hamilton",
  "position": "G-F",
  "height": "6-7",
  "weight": "195",
  "jersey_number": "25",
  "college": "Connecticut",
  "country": "USA",
  "draft_year": 2016,
  "draft_round": 2,
  "draft_number": 56,
  "team": Hawks
}

export const undraftedPlayer: Player = {
  "id": 2,
  "first_name": "Jaylen",
  "last_name": "Adams",
  "position": "G",
  "height": "6-0",
  "weight": "225",
  "jersey_number": "10",
  "college": "St. Bonaventure",
  "country": "USA",
  "draft_year": null,
  "draft_round": null,
  "draft_number": null,
  "team": Hawks
}
