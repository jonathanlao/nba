import { Player, Team, DraftPickTotal, Client, DraftRounds } from "./types";
import { createAPIClient } from "./client";
import * as fs from 'fs';

const collectDraftRounds = (acc: DraftRounds, player: Player): DraftRounds =>
  {
    if (player.draft_round === 1) {
        acc["1"]++;
    }
    else if (player.draft_round === 2) {
        acc["2"]++;
    }
    else {
        acc["null"]++;
    }
    return acc;
  }

const getDraftPickTotalsPerTeam = async (client: Client, team: Team): Promise<DraftPickTotal> => {
  let [players, cursor] = await client.getPlayersForTeam(team.id);
  const draftRounds: DraftRounds = players.reduce(collectDraftRounds, {"1": 0, "2": 0, "null": 0});

  while (cursor) {
      const [players, nextCursor] = await client.getPlayersForTeam(team.id, cursor);
      players.reduce(collectDraftRounds, draftRounds);
      cursor = nextCursor
  }

  return {
      team_name: team.full_name,
      draft_rounds: draftRounds
  };
}

const getDraftPickTotals = async (client: Client, teams: Team[]): Promise<DraftPickTotal[]> => {
  try {
      const draftPickTotalPromises = teams.map(team => getDraftPickTotalsPerTeam(client, team));
      const draftPickTotals = await Promise.all(draftPickTotalPromises);

      return draftPickTotals;
  } catch (error) {
      console.error('Error fetching players:', error);
      throw error;
  }
}

const outputDraftPickTotals = (draftPickTotals: DraftPickTotal[]) => {
  const outputFilePath = './output.txt';
  const writeStream = fs.createWriteStream(outputFilePath);

  draftPickTotals.forEach((team) => {
    const output = "Team Name: " + team.team_name + "\n" + "Draft Rounds: " + JSON.stringify(team.draft_rounds, null, 2) + "\n\n";
    console.log(output);
    writeStream.write(output + '\n');
  });
  writeStream.end();
}

const run = async () => {
  const client: Client = createAPIClient();
  const teams: Team[] = await client.getTeams();
  const draftPickTotals = await getDraftPickTotals(client, teams);
  outputDraftPickTotals(draftPickTotals);
}

run();
