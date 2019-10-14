import React, { useState } from 'react';
import { Page } from '../types';
import convert from 'htmr';
import EventListingsQuery from '../../../pages/events/EventsCalender/EventListings.graphql';
import { EventListings } from '../../../pages/events/EventsCalender/EventListings';
import { useQuery } from '@apollo/react-hooks';
import { startOfDay, addMonths } from 'date-fns/esm';
import { Loader } from '../../../components/Loader';

interface IOfficerEventsIndex extends Page<Page[]> {}

interface IOfficerEventsPage extends Page {
  section: IOfficerEventsIndex;
  description: string;
  curator: {
    id: BigInt;
  };
  filter: any;
}

export interface OfficerEventsPageProps {
  page: IOfficerEventsPage;
}

export const OfficerEventsPage: React.FC<OfficerEventsPageProps> = ({
  page,
}) => {
  const [now] = useState(new Date());
  const { data, loading } = useQuery(EventListingsQuery, {
    variables: {
      filter: page.filter || {
        fromTime: startOfDay(now).toISOString(),
        toTime: addMonths(startOfDay(now), 6).toISOString(),
        curatedBy: page.curator.id,
      },
    },
  });

  if (loading) {
    return <Loader dark />;
  }

  return (
    <div>
      <div className="LokiContainer">
        <h1>{page.title}</h1>
        {convert(page.description)}
        <EventListings events={data.allEvents} removePast={true} />
      </div>
    </div>
  );
};