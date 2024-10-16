import { Player, Team, Client } from './types';
import * as dotenv from 'dotenv';
import axios, { AxiosInstance } from 'axios';

export const createAPIClient = (): Client => {
  const ENDPOINT: string = 'https://api.balldontlie.io/v1';

  dotenv.config();
  const API_KEY: string | undefined = process.env.BALL_DONT_LIE_API_KEY;
  if (!API_KEY) {
    throw new Error("API key not found. Please check your environment variables.");
  }
  const customAxios: AxiosInstance = axios.create({
    baseURL: ENDPOINT,
    headers: {'Authorization': API_KEY, 'Content-Type': 'application/json'}
  });

  const getTeams = async (): Promise<Team[]> => {
    try {
      const response = await customAxios.get("/teams");
      return response.data.data;
    } catch (error) {
      console.error('Error fetching teams:', error);
      throw new Error('Failed to fetch teams');
    }
  }

  const getPlayersForTeam = async (teamId: number, cursor?: number): Promise<[Player[], number]> => {
    const maxRetries = 5;
    let retries = 0;

    // Free tier has a rate limit of 60 requests per minute
    while (retries < maxRetries) {
      try {
        const response = await customAxios.get("/players", {
          params: {
            per_page: 100,
            "team_ids[]": teamId,
            cursor: cursor
          }
        });

        return [response.data.data, response.data.meta.next_cursor];
      } catch (error: any) {
        if (error.response && error.response.status === 429) {
            retries++;
            await new Promise(resolve => setTimeout(resolve, 60000)); // Wait 1 minute
        } else {
            console.error('Error fetching players:', error);
            throw new Error('Failed to fetch players');
        }
      }
    }
    throw new Error('Max retries reached. Failed to fetch players');
  }

  return {
    getTeams,
    getPlayersForTeam
  }
}
