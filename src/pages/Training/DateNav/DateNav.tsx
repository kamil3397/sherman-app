import { Box, Button, Typography } from "@mui/material";
import { FC } from "react";
import { previousMonday, nextMonday, startOfWeek, endOfWeek, format } from "date-fns";

interface DateNavProps {
  startDate: Date;
  setStartDate: (date: Date) => void;
}

export const DateNav: FC<DateNavProps> = ({ startDate, setStartDate }) => {
  const setPreviousWeek = () => {
    const previousWeekStartDate = previousMonday(startOfWeek(startDate));
    setStartDate(previousWeekStartDate);
  };

  const setNextWeek = () => {
    const nextWeekStartDate = nextMonday(endOfWeek(startDate));
    setStartDate(nextWeekStartDate);
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        width: "100%",
        backgroundColor: "#f0f0f0",
        padding: "10px 20px",
        borderRadius: "8px",
        boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
      }}
    >
      <Button
        onClick={setPreviousWeek}
        variant="contained"
        sx={{
          backgroundColor: "#444b51",
          color: "#ffffff",
          "&:hover": { backgroundColor: "#333b41" },
        }}
      >
        Poprzedni tydzień
      </Button>
      <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
        {`Dzisiaj: ${format(new Date(), "dd/MM/yyyy")}`}
      </Typography>
      <Button
        onClick={setNextWeek}
        variant="contained"
        sx={{
          backgroundColor: "#444b51",
          color: "#ffffff",
          "&:hover": { backgroundColor: "#333b41" },
        }}
      >
        Następny tydzień
      </Button>
    </Box>
  );
};
