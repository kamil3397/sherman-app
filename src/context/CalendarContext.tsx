import axios from 'axios';
import React, { createContext, useContext, useState, ReactNode, useMemo, useEffect } from 'react';
import { EventType } from 'types/EventTypes';
import { getCurrentWeek } from 'utils/getCurrentWeek';
import { useAlertContext } from './AlertContext/AlertContext';
import { endOfDay } from 'date-fns';

interface CalendarContextType {
    startDate: Date
    setStartDate: (date: Date) => void;
    events: EventType[];
    currentWeek: [Date, Date, Date, Date,Date, Date, Date]
}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

export const CalendarProvider = ({ children }: {children: ReactNode}) => {
    const [startDate, setStartDate] = useState(new Date());
    const [events, setEvents] = useState<EventType[]>([])
    const { showErrorAlert } = useAlertContext();
    
    const currentWeek = useMemo(() => getCurrentWeek(startDate), [startDate]);
    const startWeek = currentWeek[0].toISOString();
    const endWeek = endOfDay(currentWeek[6].toISOString());

    useEffect(() => {
        const fetchEvents = async() => {
          await axios.get(`http://localhost:4000/calendar?startDate=${startWeek}&endDate=${endWeek}`)
            .then((res) => {
              setEvents(res.data);
            })
            .catch(() => {
              showErrorAlert('Wystąpił błąd podczas pobierania wydarzeń');
            });
        };
        fetchEvents();
      }, [currentWeek, showErrorAlert]);

    return (
        <CalendarContext.Provider value={{ startDate, setStartDate, events, currentWeek }}>
            {children}
        </CalendarContext.Provider>
    );
};

export const useCalendarContext = (): CalendarContextType => {
    const context = useContext(CalendarContext);
    if (!context) {
        throw new Error('useCalendarContext must be used within a CalendarProvider');
    }
    return context;
};