import React, { Fragment, useEffect, useState } from 'react';
import { getErrorMessage } from '@/utils/utilFunctions';
import CustomHeader from '@/components/CustomHeader';
import CustomContainer from '@/components/ui/customContainer';
import EventList from '../components/EventList';
import host from '@/utils/host';

type Event = {
  id: number;
  name: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: File | null;
};

function Event() {
  const [events, setEvents] = useState<Event[]>([]);
  // merches.forEach((merch) => alert(merch));
  const getAllEvent = async () => {
    try {
      const response = await fetch(`${host}/admin/admin-events`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const jsonData = await response.json();

      setEvents(jsonData.allEvents);
    } catch (err) {
      console.error(getErrorMessage(err));
    }
  };

  useEffect(
    () => {
      getAllEvent();
    },
    [] /* bracket ensures useEffect does not repeatedly request multiple times */
  );

  return (
    <Fragment>
      <CustomHeader />
      <CustomContainer>
        <div className="space-y-10 pb-10">
          <div>
            <h1 className="text-center text-xl font-bold">GDSC Event</h1>
          </div>
          <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
            <EventList items={events} />
          </div>
        </div>
      </CustomContainer>
    </Fragment>
  );
}

export default Event;
