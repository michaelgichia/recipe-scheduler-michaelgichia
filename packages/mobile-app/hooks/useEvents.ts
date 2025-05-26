import {useState, useEffect} from 'react'
import axios from 'axios'
import {Event} from '@microservice/shared'

const API_URL = 'http://localhost:3000/api'
const USER_ID = '69911546-638e-4c25-915c-c9135b3df17c'

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchEvents = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await axios.get<Event[]>(`${API_URL}/events`, {
        params: {userId: USER_ID},
      })
      setEvents(response.data)
    } catch (err) {
      setError('Failed to fetch events')
      console.error('Error fetching events:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  const addEvent = async (eventData: {title: string; eventTime: Date}) => {
    try {
      setError(null)
      const response = await axios.post<Event>(`${API_URL}/events`, {
        title: eventData.title,
        eventTime: eventData.eventTime.toISOString(),
        userId: USER_ID,
      })

      setEvents((prev) =>
        [...prev, response.data].sort(
          (a, b) => (new Date(a.eventTime)).getTime() - (new Date(b.eventTime)).getTime(),
        ),
      )
    } catch (err) {
      setError('Failed to create event')
      console.error('Error creating event:', err)
    }
  }

  const updateEvent = async (
    id: string,
    updates: {title?: string; eventTime?: Date},
  ) => {
    try {
      setError(null)
      const response = await axios.patch<Event>(`${API_URL}/events/${id}`, {
        ...updates,
        eventTime:
          updates.eventTime instanceof Date
            ? updates.eventTime?.toISOString()
            : updates.eventTime,
      })
      setEvents((prev) =>
        prev.map((event) => (event.id === id ? response.data : event)),
      )
    } catch (err) {
      setError('Failed to update event')
      console.error('Error updating event:', err)
    }
  }

  const deleteEvent = async (id: string) => {
    try {
      setError(null)
      await axios.delete(`${API_URL}/events/${id}`)
      setEvents((prev) => prev.filter((event) => event.id !== id))
    } catch (err) {
      setError('Failed to delete event')
      console.error('Error deleting event:', err)
    }
  }

  return {
    events,
    loading,
    error,
    addEvent,
    updateEvent,
    deleteEvent,
    refetch: fetchEvents,
  }
}
