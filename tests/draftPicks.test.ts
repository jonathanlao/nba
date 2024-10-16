import { collectDraftRounds, getDraftPickTotalsPerTeam } from '../src/draftPicks';
import { firstRoundDraftPlayer, secondRoundDraftPlayer, undraftedPlayer, Hawks } from './fixtures';
import { Client, DraftRounds, DraftPickTotal } from '../src/types';

describe('collectDraftRounds', () => {
  it('should increment the count for draft round 1', () => {
    const initialDraftRounds: DraftRounds = { "1": 0, "2": 0, "null": 0 };
    const result = collectDraftRounds(initialDraftRounds, firstRoundDraftPlayer);
    expect(result["1"]).toBe(1);
    expect(result["2"]).toBe(0);
    expect(result["null"]).toBe(0);
  });

  it('should increment the count for draft round 2', () => {
    const initialDraftRounds: DraftRounds = { "1": 2, "2": 2, "null": 2 };
    const result = collectDraftRounds(initialDraftRounds, secondRoundDraftPlayer);
    expect(result["1"]).toBe(2);
    expect(result["2"]).toBe(3);
    expect(result["null"]).toBe(2);
  });

  it('should increment the count for draft round null', () => {
    const initialDraftRounds: DraftRounds = { "1": 4, "2": 0, "null": 2 };
    const result = collectDraftRounds(initialDraftRounds, undraftedPlayer);
    expect(result["1"]).toBe(4);
    expect(result["2"]).toBe(0);
    expect(result["null"]).toBe(3);
  });
});

describe('getDraftPickTotalsPerTeam', () => {
  it('should return correct draft pick totals for a team', async () => {
    const mockClient: Client = {
      getTeams: function() { return Promise.resolve([]) },
      getPlayersForTeam: jest.fn().mockResolvedValueOnce([[secondRoundDraftPlayer, undraftedPlayer], null])
    };

    const result: DraftPickTotal = await getDraftPickTotalsPerTeam(mockClient, Hawks);

    expect(result.team_name).toBe('Atlanta Hawks');
    expect(result.draft_rounds["1"]).toBe(0);
    expect(result.draft_rounds["2"]).toBe(1);
    expect(result.draft_rounds["null"]).toBe(1);
  });

  it('should handle multiple pages of players', async () => {
    const mockClient: Client = {
      getTeams: function() { return Promise.resolve([]) },
      getPlayersForTeam: jest.fn()
        .mockResolvedValueOnce([[secondRoundDraftPlayer], 1])
        .mockResolvedValueOnce([[undraftedPlayer], null])
    };

    const result: DraftPickTotal = await getDraftPickTotalsPerTeam(mockClient, Hawks);

    expect(result.team_name).toBe("Atlanta Hawks");
    expect(result.draft_rounds["1"]).toBe(0);
    expect(result.draft_rounds["2"]).toBe(1);
    expect(result.draft_rounds["null"]).toBe(1);
  });
});


