import axios from 'axios';
import React, { createContext, useContext, useState, ReactNode, useMemo, useEffect } from 'react';
import { EventType } from 'types/EventTypes';
import { getCurrentWeek } from 'utils/getCurrentWeek';
import { useAlertContext } from './AlertContext/AlertContext';

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


    useEffect(() => {
        const fetchEvents = async() => {
          await axios.get(`http://localhost:4000/calendar?startDate=${currentWeek[0]}&endDate=${currentWeek[6]}`)
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