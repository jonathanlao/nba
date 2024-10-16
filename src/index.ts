import { createAPIClient } from "./client";
import { getDraftPickTotals, outputDraftPickTotals } from "./draftPicks";
import { Team, Client } from "./types";

const run = async () => {
  const client: Client = createAPIClient();
  const teams: Team[] = await client.getTeams();
  const draftPickTotals = await getDraftPickTotals(client, teams);
  outputDraftPickTotals(draftPickTotals);
}

run();
