export const parseDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const monthIndex = date.getMonth() + 1;
    const month = months[monthIndex];
    const year = date.getFullYear();
    return `${day}. ${month} ${year}`;
};

const months: Record<number, string> = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
};
