import axios from 'axios';
import { matchSorter } from 'match-sorter';
import sortBy from 'sort-by';

export const API_URL = 'http://localhost:3000'; 

export async function getEvents(query) {
  const response = await axios.get(`${API_URL}/events`);
  const events = response.data;

  if (!query) {
    return events.sort(sortBy('date', 'time'));
  } else {
    return matchSorter(events, query, {
      keys: ['createdBy', 'title', 'description', 'image', 'categoryIds', 'location', 'startTime', 'endTime'],
    }).sort(sortBy('date', 'StartTime'));
  }
}

export async function createEvent(event) {
  const response = await axios.post(`${API_URL}/events`, event);
  return response.data;
}

export async function updateEvent(id, updates) {
  try {
    const response = await axios.put(`${API_URL}/events/${id}`, updates);
    return response.data;
  } catch (error) {
    throw new Error("Failed to update event.");
  }
}

export async function deleteEvent(id) {
  const response = await axios.delete(`${API_URL}/events/${id}`);
  return response.status === 200;
}
