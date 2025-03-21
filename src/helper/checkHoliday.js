export const checkHoliday = (date, month) => {
  // Danh sách các ngày lễ của Việt Nam (định dạng: [tháng, ngày])
  const vietnameseHolidays = [
    [1, 1], // Tết Dương lịch
    [4, 30], // Ngày giải phóng miền Nam
    [5, 1], // Ngày Quốc tế Lao động
    [9, 2], // Quốc khánh
  ];

  return vietnameseHolidays.some(
    ([holidayMonth, holidayDay]) =>
      holidayMonth === month && holidayDay === date
  );
};
