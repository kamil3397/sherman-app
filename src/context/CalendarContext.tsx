import React, { createContext, useContext, useState, ReactNode } from 'react';
import { EventType } from 'types/EventTypes';

interface CalendarContextType {
    startDate: Date
    setStartDate: (date: Date) => void;
    events: EventType[];
    setEvents: (events: EventType[]) => void;
    selectedEvent: EventType | null;
    setSelectedEvent: (event: EventType | null)=>void;
    infoModalOpen: boolean
    setInfoModalOpen: (open: boolean)=> void
    openModal: boolean;
    setOpenModal: (open: boolean)=>void

}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

export const CalendarProvider = ({ children }: {children: ReactNode}) => {
    const [startDate, setStartDate] = useState(new Date());
    const [events, setEvents] = useState<EventType[]>([])
    const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
    const [infoModalOpen, setInfoModalOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    
    return (
        <CalendarContext.Provider value={{ startDate, setStartDate, events, setEvents, selectedEvent, setSelectedEvent, infoModalOpen, setInfoModalOpen, openModal, setOpenModal }}>
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