/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, Fragment } from 'react'
import { getErrorMessage } from '../utils/utilFunctions'
import host from '@/utils/host'
import EditEvent from './EditEvent'

type Event = {
  id: number;
  name: string;
  description: string;
  date: string;
  time: string;
  location: string
  image: File | null
}

const ListEvent = () => {
  const [events, setEvents] = useState<Event[]>([])

  const getAllEvents = async () => {
    try {
      const response = await fetch(`${host}/admin/admin-events`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      const jsonData = await response.json()
      setEvents(jsonData.allEvents)
    } catch(err) {
      console.error(getErrorMessage, err)
    }
  }

  const deleteEvent = async (id: number) => {
    try{
      const response = await fetch(`${host}/admin/admin-event/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      setEvents(events.filter((event) => event.id !== id))
    } catch(err) {
      console.error(getErrorMessage, err)
    }
  }

  useEffect(
    () => {
      getAllEvents()
    }, []
  )

  return (
    <Fragment>
      <table className="table-auto mt-4 text-center text-black">
        <thead>
          <tr>
            <th className="px-4 py-2">Event Name</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Time</th>
            <th className="px-4 py-2">Location</th>
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Edit</th>
            <th className="px-4 py-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td className="border px-4 py-2">{event.name}</td>
              <td className="border px-4 py-2">{event.description}</td>
              <td className="border px-4 py-2">{event.date}</td>
              <td className="border px-4 py-2">{event.time}</td>
              <td className="border px-4 py-2">{event.location}</td>
              <td className="border px-4 py-2">
                <img src={`${host}/${event.image}`} alt={event.name} />
              </td>
              <td>
                <EditEvent event={event} />
              </td>
              <td>
                <button
                  className="h-10 w-20 bg-red-600 border rounded-md hover:bg-blue-800"
                  onClick={() => deleteEvent(event.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListEvent




