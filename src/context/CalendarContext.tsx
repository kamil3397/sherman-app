import axios from 'axios';
import React, { createContext, useContext, useState, ReactNode, FC } from 'react';

interface CalendarContextProps {
    date: Date;
    setDate: (date: Date) => void;
    fetchEvents: (startDate: Date, endDate: Date) => void;
}

const CalendarContext = createContext<CalendarContextProps | undefined>(undefined);

export const CalendarProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [date, setDate] = useState<Date>(new Date());

  const fetchEvents = async (startDate: Date, endDate: Date) => {
    await axios.get('http://localhost:4000/calendar')
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  return (
    <CalendarContext.Provider value={{ date, setDate, fetchEvents }}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendarContext = (): CalendarContextProps => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }
  return context;
};
