import { Box, Typography } from "@mui/material"
import { HOURS_ARR } from "config/hoursMap"
import { FC } from "react"

interface CalendarHoursProps {
    day: Date
    openAddEventModal:(date:Date, hour: number) => void
    isToday: boolean
    }


export const CalendarHours:FC<CalendarHoursProps> = ({openAddEventModal, isToday, day})=> {

  return (
    <>
     {HOURS_ARR.map(({ label, value }, index) => (
              <Box
                key={value}
                onClick={() => openAddEventModal(day, value)}
                sx={{
                  position: 'relative',
                  height: `calc(100% / ${HOURS_ARR.length})`,
                  borderBottom: index < HOURS_ARR.length - 1 ? '1px solid #ddd' : 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingLeft: 5,
                  paddingRight: 5,
                  transition: 'background-color 0.3s ease',
                  '&:hover': {
                    backgroundColor: isToday ? 'secondary.dark' : 'primary.main',
                  },
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: '0.75rem',
                    color: isToday ? 'primary.light' : 'text.primary',
                  }}
                >
                  {label}
                </Typography>
              </Box>
            ))}
    </>
  )
}